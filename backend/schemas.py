from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    subject: str
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty")
        if len(v) > 255:
            raise ValueError("Name too long")
        return v

    @field_validator("subject")
    @classmethod
    def subject_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Subject cannot be empty")
        if len(v) > 500:
            raise ValueError("Subject too long")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty")
        if len(v) > 10000:
            raise ValueError("Message too long (max 10 000 characters)")
        return v

    @field_validator("organization")
    @classmethod
    def clean_organization(cls, v: Optional[str]) -> Optional[str]:
        if v:
            v = v.strip()
            return v if v else None
        return None


class ContactResponse(BaseModel):
    success: bool
    message: str


class ContactRead(BaseModel):
    id: int
    name: str
    email: str
    organization: Optional[str]
    subject: str
    message: str
    is_read: bool
    ip_address: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}