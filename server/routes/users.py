from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from server.dependencies import get_db
from server.crud.user_crud import create_user, get_user_by_username
from db.initialize_db import is_password_hashed
from server.schemas.user_schema import UserCreate, UserResponse, UserLogin

router = APIRouter()
    
@router.get("/user/{username}", response_model=UserResponse)
def get_user(username: str, db: Session = Depends(get_db)):
    try:
        user = get_user_by_username(db=db, username=username)
        return user
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

