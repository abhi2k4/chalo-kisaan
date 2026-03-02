"""
DynamoDB audit logging — writes events to the `chalokisaan-logs` table.
Silently fails so it never breaks the main flow.
"""

import json
import logging
import uuid
from datetime import datetime
from functools import lru_cache

import boto3
from botocore.config import Config as BotoConfig

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

TABLE_NAME = "chalokisaan-logs"


@lru_cache()
def _dynamo():
    return boto3.client(
        "dynamodb",
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID or None,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY or None,
        config=BotoConfig(retries={"mode": "standard", "max_attempts": 2}),
    )


def log_event(event_type: str, data: dict | None = None):
    """
    Write an audit event to DynamoDB. Never raises.

    Keys: sessionId (partition), timestamp (sort).
    """
    try:
        item = {
            "sessionId": {"S": uuid.uuid4().hex},
            "timestamp": {"S": datetime.utcnow().isoformat()},
            "eventType": {"S": event_type},
        }
        if data:
            item["data"] = {"S": json.dumps(data, ensure_ascii=False, default=str)[:4000]}
        _dynamo().put_item(TableName=TABLE_NAME, Item=item)
        logger.debug("DynamoDB log: %s", event_type)
    except Exception as e:
        logger.warning("DynamoDB log_event failed (non-fatal): %s", e)
