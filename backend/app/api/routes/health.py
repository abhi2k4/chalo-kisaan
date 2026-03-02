"""
Route: GET /api/health — service diagnostics
Route: GET /api/health/s3 — verify S3 bucket access
"""

import asyncio
import logging

from fastapi import APIRouter
from app.config import get_settings

router = APIRouter()
settings = get_settings()
logger = logging.getLogger(__name__)


@router.get("/health")
async def health():
    return {
        "status": "ok",
        "version": settings.APP_VERSION,
        "region": settings.AWS_REGION,
        "bedrock_region": settings.BEDROCK_REGION,
        "services": {
            "bedrock": "api_key" if settings.AWS_BEARER_TOKEN_BEDROCK else (
                "iam" if settings.AWS_ACCESS_KEY_ID else "none"
            ),
            "bedrock_model": settings.BEDROCK_MODEL_ID,
            "s3_assets": settings.S3_ASSETS_BUCKET,
            "s3_audio_temp": settings.S3_AUDIO_TEMP_BUCKET,
            "polly": "configured" if settings.AWS_ACCESS_KEY_ID else "no_credentials",
            "transcribe": "configured" if settings.AWS_ACCESS_KEY_ID else "no_credentials",
            "sagemaker_sdxl": "deployed" if settings.SAGEMAKER_SDXL_ENDPOINT else "not_deployed",
            "database": _db_status(),
        },
    }


@router.get("/health/s3")
async def health_s3():
    """Verify S3 bucket access."""
    from app.utils.s3 import _s3

    results = {}
    for name, bucket in [
        ("assets", settings.S3_ASSETS_BUCKET),
        ("audio_temp", settings.S3_AUDIO_TEMP_BUCKET),
        ("data", settings.S3_DATA_BUCKET),
    ]:
        try:
            await asyncio.to_thread(_s3().head_bucket, Bucket=bucket)
            results[name] = {"bucket": bucket, "status": "ok"}
        except Exception as e:
            err = str(e)
            # Extract just the error code for cleaner output
            if "404" in err:
                err = "bucket not found"
            elif "403" in err:
                err = "access denied"
            results[name] = {"bucket": bucket, "status": "error", "error": err}

    all_ok = all(r["status"] == "ok" for r in results.values())
    return {"status": "ok" if all_ok else "degraded", "buckets": results}


def _db_status() -> str:
    try:
        from app.database import is_db_available
        return "connected" if is_db_available() else "not_running"
    except Exception:
        return "not_configured"
