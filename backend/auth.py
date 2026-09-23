import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import Header, HTTPException, status

# Load .env from the backend directory (works regardless of where uvicorn is launched from)
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

ADMIN_SECRET = os.getenv("ADMIN_SECRET")

if not ADMIN_SECRET:
    raise RuntimeError(
        "ADMIN_SECRET is not configured. "
        "Add ADMIN_SECRET=<your-secret> to backend/.env and restart the server."
    )

def verify_admin(x_admin_key: str = Header(None), authorization: str = Header(None)):
    token = None
    if x_admin_key:
        token = x_admin_key
    elif authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]

    if not token or token != ADMIN_SECRET:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing admin credentials.",
        )
    return True
