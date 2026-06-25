import logging
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from database import get_db
from models import BookingRequest
from schemas import BookingCreate, BookingResponse
from services.email_service import send_booking_emails

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/booking", tags=["booking"])


@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookingCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db),
):
    ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else None)
    if ip:
        ip = ip.split(",")[0].strip()

    booking = BookingRequest(
        name=payload.name,
        email=payload.email,
        organization=payload.organization,
        service=payload.service,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time,
        timezone=payload.timezone,
        notes=payload.notes,
        ip_address=ip,
    )
    try:
        db.add(booking)
        db.commit()
        db.refresh(booking)
    except Exception as exc:
        db.rollback()
        logger.error("DB error saving booking request: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save your booking request. Please try again.",
        )

    background_tasks.add_task(
        send_booking_emails,
        name=payload.name,
        email=payload.email,
        organization=payload.organization,
        service=payload.service,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time,
        timezone=payload.timezone,
        notes=payload.notes,
    )

    logger.info("Booking request #%d saved — emails queued", booking.id)
    return BookingResponse(
        success=True,
        message="Booking request received. I'll confirm a time with you within 24–48 hours.",
    )
