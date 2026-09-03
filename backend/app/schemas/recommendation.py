from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator
import html


def _sanitize(value: str) -> str:
    """Strip leading/trailing whitespace and escape HTML entities."""
    return html.escape(value.strip())


class RecommendationCreate(BaseModel):
    """Schema for the public POST endpoint. Status is never accepted from clients."""

    name: str = Field(..., min_length=1, max_length=200)
    company: Optional[str] = Field(None, max_length=200)
    role: Optional[str] = Field(None, max_length=200)
    project: str = Field(..., min_length=1, max_length=300)
    rating: int = Field(..., ge=1, le=5)
    message: str = Field(..., min_length=1, max_length=5000)

    @field_validator("name", "project", "message", mode="before")
    @classmethod
    def sanitize_required(cls, v: str) -> str:
        if v is None:
            return v
        return _sanitize(v)

    @field_validator("company", "role", mode="before")
    @classmethod
    def sanitize_optional(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        return _sanitize(v)


class RecommendationPublic(BaseModel):
    """Schema returned on the public GET endpoint (approved only)."""

    id: int
    name: str
    company: Optional[str]
    role: Optional[str]
    project: str
    rating: int
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}


class RecommendationAdmin(BaseModel):
    """Schema returned on admin endpoints (includes status)."""

    id: int
    name: str
    company: Optional[str]
    role: Optional[str]
    project: str
    rating: int
    message: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
