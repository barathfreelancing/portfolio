import os
from fastapi import Header, HTTPException, status, Depends

ADMIN_SECRET = os.getenv("ADMIN_SECRET", "admin123")


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
