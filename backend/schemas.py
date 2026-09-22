from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ReviewCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    company: Optional[str] = Field(None, max_length=100)
    role: Optional[str] = Field(None, max_length=100)
    review: str = Field(..., min_length=5, max_length=2000)


class ReviewResponse(BaseModel):
    id: int
    name: str
    company: Optional[str] = None
    role: Optional[str] = None
    review: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminReviewResponse(ReviewResponse):
    is_approved: bool

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    password: str


class ContactEnquiry(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=255)
    project_type: str = Field(..., min_length=1, max_length=100)
    message: str = Field(..., min_length=1, max_length=3000)


class ContactResponse(BaseModel):
    success: bool
    message: str

