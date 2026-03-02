"""
Route: POST /api/generate-plan
Streams the agritourism plan from Bedrock Claude using SSE.

Frontend sends a flat JSON body: {landSize, location, ..., language}
Frontend reads SSE: data: {"type":"delta","text":"..."}
                    data: {"type":"complete","data":{...}}
                    data: {"type":"error","message":"..."}
"""

from __future__ import annotations
import asyncio
import json
import logging

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.schemas.schemas import FarmDataIn
from app.services import bedrock

logger = logging.getLogger(__name__)
router = APIRouter()


def _sse(payload: dict) -> str:
    """Format a server-sent event line."""
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"


@router.post("/generate-plan")
async def generate_plan(req: FarmDataIn):
    """
    Accepts flat farm data (matching frontend form shape).
    Streams plan JSON chunks as SSE.
    """
    farm_dict = req.model_dump()
    language = farm_dict.get("language", "hindi")

    # Validate minimum required fields
    if not farm_dict.get("landSize") or not farm_dict.get("location"):
        raise HTTPException(
            status_code=422,
            detail="landSize and location are required to generate a plan.",
        )

    async def event_stream():
        raw_text = ""
        try:
            # Run the synchronous streaming generator in a thread
            # to avoid blocking the event loop
            chunks = await asyncio.to_thread(
                lambda: list(bedrock.stream_plan(farm_dict, language))
            )

            for chunk in chunks:
                raw_text += chunk
                yield _sse({"type": "delta", "text": chunk})

            # Parse the accumulated JSON
            try:
                plan_data = bedrock._extract_json(raw_text)
            except (json.JSONDecodeError, ValueError):
                plan_data = {"raw": raw_text}

            yield _sse({"type": "complete", "data": plan_data})

        except Exception as e:
            logger.error("Plan generation error: %s", e, exc_info=True)
            yield _sse({"type": "error", "message": str(e)})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
