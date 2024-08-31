import re
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates, relationship
from db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(12), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    @validates('username')
    def validate_username(self, key, value):
        value = value.lower()
        if not value.isalnum() or len(value) > 12:
            raise ValueError("Username must be alphanumeric and at most 12 characters long.")
        return value

    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value or '.' not in value:
            raise ValueError("Invalid email address.")
        return value
    
    @validates('hashed_password')
    def validate_hashed_password(self, key, value):
        if not isinstance(value, str):
            raise ValueError("Hashed password must be a string.")
        if len(value) != 64:
            raise ValueError("Hashed password length is incorrect. Must be SHA-256 hash.")
        if not re.fullmatch(r'[0-9a-fA-F]{64}', value):
            raise ValueError("Hashed password format is incorrect. It must be a 64-character hexadecimal string.")
        return value
    
    def __init__(self, username, email, hashed_password):
        self.username = username
        self.email = email
        self.hashed_password = hashed_password

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
