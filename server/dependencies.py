from sqlalchemy.orm import sessionmaker
from db.initialize_db import setup_db

engine = setup_db('dev')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
