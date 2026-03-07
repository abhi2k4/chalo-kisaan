"""
Route: POST /api/reports       — create a report (auto-save)
Route: GET  /api/reports/{id}  — retrieve a report
Route: PATCH /api/reports/{id} — update a report
Route: POST /api/reports/{id}/visualizations — save AI visualization

Legacy routes kept for backwards compat:
Route: POST /api/save-plan
Route: GET  /api/plans/{id}
"""

import asyncio
import base64
import json
import logging
import secrets
import uuid
from datetime import datetime
from typing import Any, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import get_settings
from app.utils.s3 import _s3, get_presigned_url
from app.utils.dynamo import log_event

router = APIRouter()
settings = get_settings()
logger = logging.getLogger(__name__)


# ── Request / Response models ──────────────────────────────────

class CreateReportRequest(BaseModel):
    farmData: dict[str, Any]
    planData: dict[str, Any]
    language: str = "hindi"
    farmImageBase64: Optional[str] = None  # data URL or raw base64


class UpdateReportRequest(BaseModel):
    farmData: Optional[dict[str, Any]] = None
    planData: Optional[dict[str, Any]] = None
    language: Optional[str] = None


class SaveVisualizationRequest(BaseModel):
    imageBase64: str
    services: list[str] = []
    mode: str = "transform"


# Legacy
class SavePlanRequest(BaseModel):
    farmData: dict[str, Any]
    planData: dict[str, Any]
    language: str = "hindi"


# ── Helpers ────────────────────────────────────────────────────

def _generate_report_id() -> str:
    """Generate a short report ID like 'ckA7x2m'."""
    return "ck" + secrets.token_urlsafe(5)[:5]


def _strip_data_url(data_url: str) -> tuple[bytes, str]:
    """Strip data URL prefix and return (bytes, content_type)."""
    if "," in data_url:
        header, b64 = data_url.split(",", 1)
        # e.g. data:image/jpeg;base64
        ct = header.split(":")[1].split(";")[0] if ":" in header else "image/jpeg"
    else:
        b64 = data_url
        ct = "image/jpeg"
    return base64.b64decode(b64), ct


# ── POST /api/reports ──────────────────────────────────────────

@router.post("/reports")
async def create_report(req: CreateReportRequest):
    """Create a new report with a short shareable ID."""
    report_id = _generate_report_id()

    farm_image_key = None
    if req.farmImageBase64:
        try:
            img_bytes, ct = _strip_data_url(req.farmImageBase64)
            ext = "jpg" if "jpeg" in ct else ct.split("/")[-1]
            farm_image_key = f"report-images/{report_id}/original.{ext}"

            def _upload_image():
                _s3().put_object(
                    Bucket=settings.S3_ASSETS_BUCKET,
                    Key=farm_image_key,
                    Body=img_bytes,
                    ContentType=ct,
                )

            await asyncio.to_thread(_upload_image)
            logger.info("Farm image uploaded to s3://%s/%s", settings.S3_ASSETS_BUCKET, farm_image_key)
        except Exception as e:
            logger.warning("Failed to upload farm image: %s", e)
            farm_image_key = None

    payload = {
        "id": report_id,
        "farmData": req.farmData,
        "planData": req.planData,
        "language": req.language,
        "farmImageKey": farm_image_key,
        "aiImages": [],
        "createdAt": datetime.utcnow().isoformat(),
        "updatedAt": datetime.utcnow().isoformat(),
    }

    key = f"reports/{report_id}.json"

    def _upload_json():
        _s3().put_object(
            Bucket=settings.S3_DATA_BUCKET,
            Key=key,
            Body=json.dumps(payload, ensure_ascii=False),
            ContentType="application/json",
        )

    await asyncio.to_thread(_upload_json)
    logger.info("Report saved to s3://%s/%s", settings.S3_DATA_BUCKET, key)
    log_event("report_created", {"reportId": report_id, "language": req.language})

    return {"success": True, "reportId": report_id}


# ── GET /api/reports/{report_id} ───────────────────────────────

@router.get("/reports/{report_id}")
async def get_report(report_id: str):
    """Retrieve a report and generate presigned URLs for images."""
    key = f"reports/{report_id}.json"

    def _download():
        try:
            resp = _s3().get_object(Bucket=settings.S3_DATA_BUCKET, Key=key)
            return json.loads(resp["Body"].read().decode("utf-8"))
        except Exception as e:
            if "NoSuchKey" in str(e) or "404" in str(e):
                return None
            raise

    data = await asyncio.to_thread(_download)
    if data is None:
        raise HTTPException(status_code=404, detail="Report not found")

    # Generate presigned URLs for images
    farm_image_url = None
    if data.get("farmImageKey"):
        try:
            farm_image_url = get_presigned_url(settings.S3_ASSETS_BUCKET, data["farmImageKey"], expires=3600)
        except Exception as e:
            logger.warning("Failed to generate presigned URL for farm image: %s", e)

    ai_images = []
    for img in data.get("aiImages", []):
        try:
            url = get_presigned_url(settings.S3_ASSETS_BUCKET, img["key"], expires=3600)
            ai_images.append({**img, "url": url})
        except Exception as e:
            logger.warning("Failed to generate presigned URL for AI image: %s", e)

    return {
        "success": True,
        **data,
        "farmImageUrl": farm_image_url,
        "aiImages": ai_images,
    }


# ── PATCH /api/reports/{report_id} ─────────────────────────────

@router.patch("/reports/{report_id}")
async def update_report(report_id: str, req: UpdateReportRequest):
    """Partially update a report."""
    key = f"reports/{report_id}.json"

    def _download():
        try:
            resp = _s3().get_object(Bucket=settings.S3_DATA_BUCKET, Key=key)
            return json.loads(resp["Body"].read().decode("utf-8"))
        except Exception as e:
            if "NoSuchKey" in str(e) or "404" in str(e):
                return None
            raise

    data = await asyncio.to_thread(_download)
    if data is None:
        raise HTTPException(status_code=404, detail="Report not found")

    if req.farmData is not None:
        data["farmData"] = req.farmData
    if req.planData is not None:
        data["planData"] = req.planData
    if req.language is not None:
        data["language"] = req.language
    data["updatedAt"] = datetime.utcnow().isoformat()

    def _upload():
        _s3().put_object(
            Bucket=settings.S3_DATA_BUCKET,
            Key=key,
            Body=json.dumps(data, ensure_ascii=False),
            ContentType="application/json",
        )

    await asyncio.to_thread(_upload)
    return {"success": True, "reportId": report_id}


# ── POST /api/reports/{report_id}/visualizations ───────────────

@router.post("/reports/{report_id}/visualizations")
async def save_visualization(report_id: str, req: SaveVisualizationRequest):
    """Save an AI-generated visualization image to S3 and update the report."""
    report_key = f"reports/{report_id}.json"

    def _download():
        try:
            resp = _s3().get_object(Bucket=settings.S3_DATA_BUCKET, Key=report_key)
            return json.loads(resp["Body"].read().decode("utf-8"))
        except Exception as e:
            if "NoSuchKey" in str(e) or "404" in str(e):
                return None
            raise

    data = await asyncio.to_thread(_download)
    if data is None:
        raise HTTPException(status_code=404, detail="Report not found")

    # Upload image
    img_bytes, ct = _strip_data_url(req.imageBase64)
    n = len(data.get("aiImages", []))
    img_key = f"report-images/{report_id}/viz-{n}.png"

    def _upload_image():
        _s3().put_object(
            Bucket=settings.S3_ASSETS_BUCKET,
            Key=img_key,
            Body=img_bytes,
            ContentType="image/png",
        )

    await asyncio.to_thread(_upload_image)

    # Update report JSON
    if "aiImages" not in data:
        data["aiImages"] = []
    data["aiImages"].append({
        "key": img_key,
        "services": req.services,
        "mode": req.mode,
    })
    data["updatedAt"] = datetime.utcnow().isoformat()

    def _upload_json():
        _s3().put_object(
            Bucket=settings.S3_DATA_BUCKET,
            Key=report_key,
            Body=json.dumps(data, ensure_ascii=False),
            ContentType="application/json",
        )

    await asyncio.to_thread(_upload_json)

    url = get_presigned_url(settings.S3_ASSETS_BUCKET, img_key, expires=3600)
    return {"success": True, "imageUrl": url, "imageKey": img_key}


# ── Legacy endpoints (backwards compat) ───────────────────────

@router.post("/save-plan")
async def save_plan(req: SavePlanRequest):
    """Legacy: Save a plan to S3."""
    plan_id = uuid.uuid4().hex
    key = f"plans/{plan_id}.json"

    payload = {
        "id": plan_id,
        "farmData": req.farmData,
        "planData": req.planData,
        "language": req.language,
        "savedAt": datetime.utcnow().isoformat(),
    }

    def _upload():
        _s3().put_object(
            Bucket=settings.S3_DATA_BUCKET,
            Key=key,
            Body=json.dumps(payload, ensure_ascii=False),
            ContentType="application/json",
        )

    await asyncio.to_thread(_upload)
    log_event("plan_saved", {"planId": plan_id, "language": req.language})
    return {"success": True, "planId": plan_id}


@router.get("/plans/{plan_id}")
async def get_plan(plan_id: str):
    """Legacy: Retrieve a saved plan from S3."""
    key = f"plans/{plan_id}.json"

    def _download():
        try:
            resp = _s3().get_object(Bucket=settings.S3_DATA_BUCKET, Key=key)
            return json.loads(resp["Body"].read().decode("utf-8"))
        except Exception as e:
            if "NoSuchKey" in str(e) or "404" in str(e):
                return None
            raise

    data = await asyncio.to_thread(_download)
    if data is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    return {"success": True, **data}
