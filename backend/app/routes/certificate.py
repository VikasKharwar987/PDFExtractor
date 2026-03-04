from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from datetime import date
import cloudinary
import cloudinary.uploader
from ..database import get_db
from ..models import Certificate
from ..dependencies import get_current_user
from ..schemas import CertificateResponse
from typing import List
from ..utils.ocr import extract_text_from_url
from ..utils.extractor import extract_certificate_info

router = APIRouter()

@router.post("/certificates")
async def create_certificate(
    title: str = Form(...),
    issue_date: date = Form(...),
    expire_date: date = Form(...),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):

    uploaded_certificates = []

    try:

        for file in files:

            upload_result = cloudinary.uploader.upload(
                file.file,
                resource_type="auto",
                use_filename=True,
                unique_filename=False,
                filename_override=file.filename,
                access_mode="public"
            )

            file_url = upload_result["secure_url"]

            # OCR text extraction
            text = extract_text_from_url(file_url)

            # Extract certificate fields
            data = extract_certificate_info(text)

            if data["title"]:
                title = data["title"]

            if data["issue_date"]:
                issue_date = data["issue_date"]

            if data["expire_date"]:
                expire_date = data["expire_date"]

            cert = Certificate(
                title=title,
                file_url=file_url,
                original_filename=file.filename,
                issue_date=issue_date,
                expire_date=expire_date,
                owner_id=user.id
            )

            db.add(cert)
            uploaded_certificates.append(cert)

        db.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "message": f"{len(uploaded_certificates)} certificates uploaded successfully"
    }

@router.get("/certificates", response_model=list[CertificateResponse])
def get_certificates(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Certificate).filter(Certificate.owner_id == user.id).all()

@router.delete("/certificates/{cert_id}")
def delete_certificate(
    cert_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    cert = db.query(Certificate).filter(
        Certificate.id == cert_id,
        Certificate.owner_id == user.id
    ).first()

    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")

    db.delete(cert)
    db.commit()

    return {"message": "Certificate deleted successfully"}