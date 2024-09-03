from datetime import timedelta
from fastapi import APIRouter, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from server.dependencies import get_db
from server.crud.user_crud import create_user, get_user_by_username
from db.initialize_db import is_password_hashed
from server.schemas.user_schema import UserCreate, UserResponse, UserLogin
from server.schemas.token_schema import Token
from server.auth import create_access_token, verify_token

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if not is_password_hashed(user.password):
        raise HTTPException(status_code=400, detail="Password must be a valid SHA-256 hash.")

    try:
        new_user = create_user(db=db, username=user.username, email=user.email, hashed_password=user.password)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=Token)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    try:
        user = get_user_by_username(db=db, username=login_data.username)
        
        if user is None or user.hashed_password != login_data.hashed_password:
            raise HTTPException(status_code=401, detail="Invalid username or password.")
        
        access_token_expires = timedelta(minutes=5)
        access_token = create_access_token(
            data={"sub": user.username},
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/verify-token")
async def verify_user_token(Authorization: str = Header(...), db: Session = Depends(get_db)):
    token = Authorization.replace("Bearer ", "")
    try:
        user = verify_token(token=token, db=db)
        return {"message": "Token is valid", "user": user}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
