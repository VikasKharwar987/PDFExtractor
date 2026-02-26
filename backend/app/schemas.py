from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class CertificateResponse(BaseModel):
    id: int
    title: str
    file_url: str
    original_filename: str  # 👈 ADD THIS
    issue_date: date
    expire_date: date

    class Config:
        from_attributes = True