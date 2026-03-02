"""
Route: POST /api/parse-voice
Parses a raw transcript into structured farm data using Bedrock Claude.

Route: POST /api/transcribe
Sends audio to Amazon Transcribe then returns the transcript.
"""

from __future__ import annotations
import asyncio
import logging

from fastapi import APIRouter, HTTPException

from app.schemas.schemas import ParseVoiceRequest, TranscribeRequest, TranscribeResponse
from app.services import bedrock, transcribe as transcribe_svc

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/parse-voice")
async def parse_voice(req: ParseVoiceRequest):
    """
    Accepts a plain-text transcript (from browser STT or Transcribe)
    and returns structured farm data JSON.

    Frontend expects: {success: true, formData: {...}}
    """
    if not req.transcript.strip():
        raise HTTPException(status_code=422, detail="Transcript cannot be empty.")

    try:
        parsed = await asyncio.to_thread(
            bedrock.parse_voice, req.transcript, req.language
        )
    except Exception as e:
        logger.error("Voice parse error: %s", e, exc_info=True)
        raise HTTPException(status_code=502, detail=f"Parse failed: {e}")

    # Frontend reads result.formData (not result.data)
    return {"success": True, "formData": parsed}


@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(req: TranscribeRequest):
    """
    Accepts base64-encoded audio and returns the transcript via Amazon Transcribe.
    """
    if not req.audio_base64.strip():
        raise HTTPException(status_code=422, detail="audio_base64 cannot be empty.")

    try:
        transcript = await asyncio.to_thread(
            transcribe_svc.transcribe_audio, req.audio_base64, req.language
        )
        return TranscribeResponse(success=True, transcript=transcript, language=req.language)
    except RuntimeError as e:
        logger.error("Transcribe error: %s", e)
        return TranscribeResponse(success=False, error=str(e))
    except Exception as e:
        logger.error("Unexpected transcribe error: %s", e, exc_info=True)
        raise HTTPException(status_code=502, detail=str(e))
