from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
from pathlib import Path
import os


# Get the backend directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from backend/.env
load_dotenv(BASE_DIR / ".env")


# Get database URL
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is not set.")


# Create database engine
engine = create_engine(DATABASE_URL)


# Create database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base class for SQLAlchemy models
class Base(DeclarativeBase):
    pass


# FastAPI database dependency
def get_db():
    """FastAPI dependency that yields a DB session and closes it after use."""
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()