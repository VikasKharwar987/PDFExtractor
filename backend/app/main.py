from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from .database import engine, Base
from .routes import user, certificate

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---------------- API ROUTES ----------------
app.include_router(user.router, prefix="/api")
app.include_router(certificate.router, prefix="/api")

# ---------------- SERVE VITE FRONTEND ----------------

frontend_path = Path(__file__).resolve().parent / "dist"

# Mount Vite assets folder
app.mount("/assets", StaticFiles(directory=frontend_path / "assets"), name="assets")

# Serve index.html for all other routes
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    return FileResponse(frontend_path / "index.html")