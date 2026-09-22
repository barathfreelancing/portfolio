from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    role = Column(String(100), nullable=True)
    review = Column(Text, nullable=False)
    is_approved = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
