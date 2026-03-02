"""
Route: POST /api/generate-visualization
Uses Bedrock Claude to generate a vivid text description of the farm transformation.

Frontend expects: {success: true, visualization: {afterDescription, keyChanges[], atmosphereDescription}}
"""

from __future__ import annotations
import asyncio
import logging

from fastapi import APIRouter, HTTPException

from app.schemas.schemas import VisualizationRequest
from app.services.bedrock import generate_visualization_description

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/generate-visualization")
async def viz(req: VisualizationRequest):
    """
    Generates a vivid text description of the transformed farm using Bedrock Claude.
    Returns structured text (afterDescription, keyChanges, atmosphereDescription).
    """
    try:
        result = await asyncio.to_thread(
            generate_visualization_description,
            req.farmData,
            req.planData,
        )

        return {
            "success": True,
            "visualization": {
                "afterDescription": result.get("afterDescription", ""),
                "keyChanges": result.get("keyChanges", []),
                "atmosphereDescription": result.get("atmosphereDescription", ""),
            },
        }

    except Exception as e:
        logger.error("Visualization generation failed: %s", e, exc_info=True)
        return {
            "success": False,
            "visualization": None,
            "message": f"Visualization service error: {e}",
        }
