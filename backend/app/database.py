"""
SQLAlchemy database engine + session factory.
All models import Base from here.

Database is OPTIONAL for the stateless AI flow (Phase 1).
Engine is created lazily — the app works fine without PostgreSQL.
"""

import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class Base(DeclarativeBase):
    pass


engine = None
SessionLocal = None

try:
    engine = create_engine(
        settings.DATABASE_URL,
        echo=settings.DATABASE_ECHO,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    logger.warning("Database engine creation failed (OK for stateless mode): %s", e)


def get_db():
    """FastAPI dependency — yields a DB session, closes on exit."""
    if SessionLocal is None:
        raise RuntimeError("Database is not configured. Set DATABASE_URL in .env.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def is_db_available() -> bool:
    """Check if database is reachable (attempts a real connection)."""
    if engine is None:
        return False
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception:
        return False
