from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from db.models.user import User

def create_user(db: Session, username: str, email: str, hashed_password: str):
    try:
        existing_user = db.query(User).filter(User.username == username).first()
        if existing_user:
            raise ValueError("Username already exists.")

        existing_email = db.query(User).filter(User.email == email).first()
        if existing_email:
            raise ValueError("Email already registered.")

        db_user = User(username=username, email=email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except ValueError as ve:
        raise ValueError(f"Error creating user: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def get_user_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise ValueError("User not found.")
    return user

def get_user_by_username(db: Session, username: str):
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise ValueError("User not found.")
    return user

def delete_user(db: Session, user_id: int):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise ValueError("User not found.")

        db.delete(user)
        db.commit()
        return user
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def change_password(db: Session, user_id: int, new_hashed_password: str):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise ValueError("User not found.")

        user.hashed_password = new_hashed_password
        db.commit()
        db.refresh(user)
        return user
    except ValueError as ve:
        raise ValueError(f"Error changing password: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")
