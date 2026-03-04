import pytesseract
from PIL import Image
import requests
import tempfile
import os
import pdfplumber

# Windows only
if os.name == "nt":
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def extract_text_from_url(file_url):

    response = requests.get(file_url)

    suffix = file_url.split(".")[-1].lower()

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}") as tmp:
        tmp.write(response.content)
        tmp_path = tmp.name

    # ---------- PDF TEXT EXTRACTION ----------
    if suffix == "pdf":

        text = ""

        with pdfplumber.open(tmp_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

        return text

    # ---------- IMAGE OCR ----------
    else:

        img = Image.open(tmp_path)

        text = pytesseract.image_to_string(img)

        return text