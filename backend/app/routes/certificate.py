from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from datetime import date
import cloudinary
import cloudinary.uploader
from ..database import get_db
from ..models import Certificate
from ..dependencies import get_current_user
from ..schemas import CertificateResponse

router = APIRouter()

@router.post("/certificates")
async def create_certificate(
    title: str = Form(...),
    issue_date: date = Form(...),
    expire_date: date = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):

    try:
        upload_result = cloudinary.uploader.upload(
            file.file,
            resource_type="image",
            use_filename=True,
            unique_filename=False,
            filename_override=file.filename,
            access_mode="public"
    )

        file_url = upload_result["secure_url"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    cert = Certificate(
        title=title,
        file_url=file_url,
        original_filename=file.filename,
        issue_date=issue_date,
        expire_date=expire_date,
        owner_id=user.id
    )

    db.add(cert)
    db.commit()
    db.refresh(cert)

    return {"message": "Certificate uploaded successfully"}


@router.get("/certificates", response_model=list[CertificateResponse])
def get_certificates(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Certificate).filter(Certificate.owner_id == user.id).all()