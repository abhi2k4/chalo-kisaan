"""
Amazon S3 utility — upload files, generate pre-signed URLs.
Uses a cached client to avoid creating new connections per request.
"""

from __future__ import annotations
import logging
import mimetypes
import uuid
from functools import lru_cache
from typing import Optional

import boto3
from botocore.config import Config as BotoConfig
from botocore.exceptions import ClientError

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


@lru_cache()
def _s3():
    return boto3.client(
        "s3",
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID or None,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY or None,
        config=BotoConfig(retries={"mode": "standard", "max_attempts": 3}),
    )


def upload_file(
    file_bytes: bytes,
    filename: str,
    prefix: str = "farm-images",
    bucket: Optional[str] = None,
    content_type: Optional[str] = None,
) -> dict[str, str]:
    """
    Upload raw bytes to S3.
    Returns {"bucket": str, "key": str, "url": str}
    """
    bucket = bucket or settings.S3_ASSETS_BUCKET
    ext = filename.rsplit(".", 1)[-1] if "." in filename else "bin"
    key = f"{prefix}/{uuid.uuid4().hex}.{ext}"
    ct = content_type or mimetypes.guess_type(filename)[0] or "application/octet-stream"

    client = _s3()
    client.put_object(Bucket=bucket, Key=key, Body=file_bytes, ContentType=ct)
    logger.info("Uploaded to s3://%s/%s", bucket, key)

    url = client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket, "Key": key},
        ExpiresIn=3600,
    )
    return {"bucket": bucket, "key": key, "url": url}


def get_presigned_url(bucket: str, key: str, expires: int = 3600) -> str:
    return _s3().generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket, "Key": key},
        ExpiresIn=expires,
    )


def delete_object(bucket: str, key: str) -> None:
    try:
        _s3().delete_object(Bucket=bucket, Key=key)
    except ClientError as e:
        logger.warning("S3 delete failed for %s/%s: %s", bucket, key, e)
