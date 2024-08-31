from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from server.dependencies import get_db
from server.crud.user_crud import create_user, get_user_by_username
from db.initialize_db import is_password_hashed
from server.schemas.user_schema import UserCreate, UserResponse, UserLogin

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
    
@router.get("/user/{username}", response_model=UserResponse)
def get_user(username: str, db: Session = Depends(get_db)):
    try:
        user = get_user_by_username(db=db, username=username)
        return user
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.post("/login", response_model=UserResponse)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    try:
        user = get_user_by_username(db=db, username=login_data.username)
        
        if user.hashed_password != login_data.hashed_password:
            raise HTTPException(status_code=401, detail="Invalid password.")
        
        return user
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
