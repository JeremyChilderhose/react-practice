import pytest
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from db.base import Base
from db.models.user import User
from db.initialize_db import setup_db, hash_password

@pytest.fixture(scope='module')
def test_engine():
    engine = setup_db('test')
    Base.metadata.create_all(engine)
    yield engine
    Base.metadata.drop_all(engine)

@pytest.fixture(scope='module')
def test_session(test_engine):
    Session = sessionmaker(bind=test_engine)
    session = Session()
    yield session
    session.close()

def test_insert_user(test_session):
    password = "password"
    user = User(username="testuser1", email="testuser1@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    inserted_user = test_session.query(User).filter_by(username="testuser1").first()
    assert inserted_user is not None
    assert inserted_user.username == "testuser1"
    assert inserted_user.email == "testuser1@example.com"

def test_retrieve_user(test_session):
    password = "password"
    user = User(username="testuser2", email="testuser2@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    retrieved_user = test_session.query(User).filter_by(username="testuser2").first()
    assert retrieved_user is not None
    assert retrieved_user.username == "testuser2"
    assert retrieved_user.email == "testuser2@example.com"

def test_insert_user_with_duplicate_username(test_session):
    password = "password"
    user1 = User(username="testuser3", email="testuser3@example.com", hashed_password=hash_password(password))
    user2 = User(username="testuser3", email="anotheremail@example.com", hashed_password=hash_password(password))
    
    test_session.add(user1)
    test_session.commit()

    with pytest.raises(IntegrityError):
        test_session.add(user2)
        test_session.commit()
    test_session.rollback()  

def test_delete_user(test_session):
    password = "password"
    user = User(username="testuser4", email="testuser4@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()
    
    user_to_delete = test_session.query(User).filter_by(username="testuser4").first()
    assert user_to_delete is not None

    test_session.delete(user_to_delete)
    test_session.commit()

    deleted_user = test_session.query(User).filter_by(username="testuser4").first()
    assert deleted_user is None

def test_insert_user_with_unhashed_password(test_session):
    with pytest.raises(ValueError, match="Hashed password length is incorrect. Must be SHA-256 hash."):
        user = User(username="testuser5", email="testuser5@example.com", hashed_password="plainpassword")
        test_session.add(user)
        test_session.commit()