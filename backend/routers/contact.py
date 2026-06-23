import logging
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from database import get_db
from models import ContactSubmission
from schemas import ContactCreate, ContactResponse
from services.email_service import send_contact_emails

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db),
):
    ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else None)
    if ip:
        ip = ip.split(",")[0].strip()

    submission = ContactSubmission(
        name=payload.name,
        email=payload.email,
        organization=payload.organization,
        subject=payload.subject,
        message=payload.message,
        ip_address=ip,
    )
    try:
        db.add(submission)
        db.commit()
        db.refresh(submission)
    except Exception as exc:
        db.rollback()
        logger.error("DB error saving contact submission: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save your message. Please try again.",
        )

    background_tasks.add_task(
        send_contact_emails,
        name=payload.name,
        email=payload.email,
        organization=payload.organization,
        subject=payload.subject,
        message=payload.message,
    )

    logger.info("Contact submission #%d saved — emails queued", submission.id)
    return ContactResponse(
        success=True,
        message="Your message has been received. I'll get back to you within 48 hours.",
    )