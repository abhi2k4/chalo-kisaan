"""
Route: POST /api/save-plan  — persist a plan to S3
Route: GET  /api/plans/{id}  — retrieve a saved plan from S3
"""

import asyncio
import json
import logging
import uuid
from datetime import datetime

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Optional

from app.config import get_settings
from app.utils.s3 import _s3
from app.utils.dynamo import log_event

router = APIRouter()
settings = get_settings()
logger = logging.getLogger(__name__)


class SavePlanRequest(BaseModel):
    farmData: dict[str, Any]
    planData: dict[str, Any]
    language: str = "hindi"


@router.post("/save-plan")
async def save_plan(req: SavePlanRequest):
    """Save a generated plan to S3 as JSON."""
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
    logger.info("Plan saved to s3://%s/%s", settings.S3_DATA_BUCKET, key)

    log_event("plan_saved", {"planId": plan_id, "language": req.language})
    return {"success": True, "planId": plan_id}


@router.get("/plans/{plan_id}")
async def get_plan(plan_id: str):
    """Retrieve a saved plan from S3."""
    key = f"plans/{plan_id}.json"

    def _download():
        try:
            resp = _s3().get_object(Bucket=settings.S3_DATA_BUCKET, Key=key)
            return json.loads(resp["Body"].read().decode("utf-8"))
        except _s3().exceptions.NoSuchKey:
            return None
        except Exception as e:
            if "NoSuchKey" in str(e) or "404" in str(e):
                return None
            raise

    data = await asyncio.to_thread(_download)
    if data is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    return {"success": True, **data}
