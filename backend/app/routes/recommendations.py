from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.models.recommendation import Recommendation
from app.schemas.recommendation import (
    RecommendationCreate,
    RecommendationPublic,
    RecommendationAdmin,
)
from app.auth import require_admin

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])
admin_router = APIRouter(prefix="/api/admin/recommendations", tags=["admin"])

limiter = Limiter(key_func=get_remote_address)


# ── Public: submit a recommendation ──────────────────────────────────────────

@router.post(
    "",
    response_model=RecommendationPublic,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a recommendation (pending review)",
)
@limiter.limit("5/minute")
def create_recommendation(
    request: Request,
    payload: RecommendationCreate,
    db: Session = Depends(get_db),
):
    rec = Recommendation(
        name=payload.name,
        company=payload.company,
        role=payload.role,
        project=payload.project,
        rating=payload.rating,
        message=payload.message,
        status="pending",  # Always set by backend; never trusted from client
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec


# ── Public: fetch approved recommendations ───────────────────────────────────

@router.get(
    "",
    response_model=List[RecommendationPublic],
    summary="Get all approved recommendations",
)
def list_approved_recommendations(db: Session = Depends(get_db)):
    return (
        db.query(Recommendation)
        .filter(Recommendation.status == "approved")
        .order_by(Recommendation.created_at.desc())
        .all()
    )


# ── Admin: list all (pending + approved + rejected) ───────────────────────────

@admin_router.get(
    "",
    response_model=List[RecommendationAdmin],
    summary="[Admin] List all recommendations",
    dependencies=[Depends(require_admin)],
)
def admin_list_recommendations(db: Session = Depends(get_db)):
    return (
        db.query(Recommendation)
        .order_by(Recommendation.created_at.desc())
        .all()
    )


# ── Admin: approve ────────────────────────────────────────────────────────────

@admin_router.patch(
    "/{rec_id}/approve",
    response_model=RecommendationAdmin,
    summary="[Admin] Approve a recommendation",
    dependencies=[Depends(require_admin)],
)
def approve_recommendation(rec_id: int, db: Session = Depends(get_db)):
    rec = db.get(Recommendation, rec_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found.")
    rec.status = "approved"
    db.commit()
    db.refresh(rec)
    return rec


# ── Admin: reject ─────────────────────────────────────────────────────────────

@admin_router.patch(
    "/{rec_id}/reject",
    response_model=RecommendationAdmin,
    summary="[Admin] Reject a recommendation",
    dependencies=[Depends(require_admin)],
)
def reject_recommendation(rec_id: int, db: Session = Depends(get_db)):
    rec = db.get(Recommendation, rec_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found.")
    rec.status = "rejected"
    db.commit()
    db.refresh(rec)
    return rec
