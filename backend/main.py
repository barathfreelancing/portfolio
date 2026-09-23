import re
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
import models
import schemas
from auth import verify_admin, ADMIN_SECRET
from email_service import send_enquiry_email, EmailConfigurationError, EmailSendError
from rate_limiter import rate_limiter

# Create DB tables automatically if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Barathkumar Portfolio - API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://portfolio-blue-ten-45.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


@app.post("/api/contact", response_model=schemas.ContactResponse, status_code=status.HTTP_200_OK)
def handle_contact_enquiry(enquiry: schemas.ContactEnquiry, request: Request):
    """
    Handle contact form enquiry submission.
    Validates input fields, applies rate limiting, and dispatches enquiry email via SMTP.
    """
    client_ip = request.client.host if request.client else "unknown"
    if not rate_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many enquiries sent. Please wait a few minutes before trying again.",
        )

    name = enquiry.name.strip()
    email = enquiry.email.strip()
    project_type = enquiry.project_type.strip()
    message = enquiry.message.strip()

    if not name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Name is required.")
    if not email or not EMAIL_REGEX.match(email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A valid email address is required.")
    if not project_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project type is required.")
    if not message:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Message is required.")

    try:
        send_enquiry_email(
            name=name,
            visitor_email=email,
            project_type=project_type,
            message=message,
        )
    except EmailConfigurationError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        )
    except EmailSendError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send your enquiry due to an email delivery error. Please try again later.",
        )

    return schemas.ContactResponse(
        success=True,
        message="Your enquiry has been sent successfully.",
    )


@app.get("/api/reviews", response_model=List[schemas.ReviewResponse])
def get_published_reviews(db: Session = Depends(get_db)):
    """Fetch all approved/published reviews ordered by newest first."""
    reviews = (
        db.query(models.Review)
        .filter(models.Review.is_approved == True)
        .order_by(models.Review.created_at.desc())
        .all()
    )
    return reviews


@app.post("/api/reviews", response_model=schemas.ReviewResponse, status_code=status.HTTP_201_CREATED)
def submit_review(review_data: schemas.ReviewCreate, db: Session = Depends(get_db)):
    """Submit a client review. Immediately published — no approval required."""
    db_review = models.Review(
        name=review_data.name.strip(),
        company=review_data.company.strip() if review_data.company else None,
        role=review_data.role.strip() if review_data.role else None,
        review=review_data.review.strip(),
        is_approved=True,
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


@app.post("/api/admin/login")
def admin_login(login_data: schemas.AdminLogin):
    """Authenticate admin and return access token."""
    if login_data.password != ADMIN_SECRET:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin password.",
        )
    return {"token": ADMIN_SECRET, "status": "authenticated"}


@app.get("/api/admin/reviews", response_model=List[schemas.AdminReviewResponse])
def get_all_reviews_admin(
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin),
):
    """Fetch all reviews for admin management (delete-only workflow)."""
    reviews = db.query(models.Review).order_by(models.Review.created_at.desc()).all()
    return reviews



@app.delete("/api/reviews/{review_id}", status_code=status.HTTP_200_OK)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    authorized: bool = Depends(verify_admin),
):
    """Delete a review (protected by admin auth)."""
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found.")
    db.delete(review)
    db.commit()
    return {"message": f"Review {review_id} deleted successfully."}

