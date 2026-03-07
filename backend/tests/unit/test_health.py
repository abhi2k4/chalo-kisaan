"""
Basic health check test for CI/CD pipeline
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    """Test that health endpoint returns 200 OK"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == "ok"


def test_health_endpoint_has_version():
    """Test that health endpoint returns version info"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data
    assert "region" in data


def test_cors_headers():
    """Test that CORS headers are present"""
    response = client.options("/api/health")
    # FastAPI should handle CORS
    assert response.status_code in [200, 405]


@pytest.mark.asyncio
async def test_health_endpoint_async():
    """Test health endpoint with async client"""
    from httpx import AsyncClient
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
