import pytest
from sqlalchemy.orm import sessionmaker
from db.initialize_db import setup_db, hash_password
from db.base import Base
from server.crud.user_crud import create_user, get_user_by_id, get_user_by_username, delete_user, change_password

@pytest.fixture(scope='module')
def test_engine():
    engine = setup_db('test')  
    Base.metadata.create_all(engine)
    yield engine
    Base.metadata.drop_all(engine)

@pytest.fixture(scope='function')
def db_session(test_engine):  
    Session = sessionmaker(bind=test_engine)
    session = Session()
    yield session
    session.close()

def test_create_user(db_session):
    user = create_user(db=db_session, username="testuser1", email="test1@example.com", hashed_password=hash_password("hashedpassword"))
    assert user.username == "testuser1"
    assert user.email == "test1@example.com"
    assert user.hashed_password == hash_password("hashedpassword")

def test_create_user_existing_username(db_session):
    create_user(db=db_session, username="testuser2", email="test2@example.com", hashed_password=hash_password("hashedpassword"))
    
    with pytest.raises(ValueError) as excinfo:
        create_user(db=db_session, username="testuser2", email="test3@example.com", hashed_password=hash_password("hashedpassword2"))
    assert "Username already exists." in str(excinfo.value)

def test_create_user_existing_email(db_session):
    create_user(db=db_session, username="testuser3", email="test3@example.com", hashed_password=hash_password("hashedpassword"))
    
    with pytest.raises(ValueError) as excinfo:
        create_user(db=db_session, username="testuser4", email="test3@example.com", hashed_password=hash_password("hashedpassword2"))
    assert "Email already registered." in str(excinfo.value)

def test_get_user_by_id(db_session):
    user = create_user(db=db_session, username="testuser5", email="test5@example.com", hashed_password=hash_password("hashedpassword"))
    
    retrieved_user = get_user_by_id(db=db_session, user_id=user.id)
    assert retrieved_user.id == user.id
    assert retrieved_user.username == user.username

def test_get_user_by_id_not_found(db_session):
    with pytest.raises(ValueError) as excinfo:
        get_user_by_id(db=db_session, user_id=-1)
    assert "User not found." in str(excinfo.value)

def test_get_user_by_username(db_session):
    user = create_user(db=db_session, username="testuser6", email="test6@example.com", hashed_password=hash_password("hashedpassword"))
    
    retrieved_user = get_user_by_username(db=db_session, username="testuser6")
    assert retrieved_user.username == user.username

def test_get_user_by_username_not_found(db_session):
    with pytest.raises(ValueError) as excinfo:
        get_user_by_username(db=db_session, username="nonexistentuser")
    assert "User not found." in str(excinfo.value)

def test_delete_user(db_session):
    user = create_user(db=db_session, username="testuser7", email="test7@example.com", hashed_password=hash_password("hashedpassword"))
    
    deleted_user = delete_user(db=db_session, user_id=user.id)
    assert deleted_user.id == user.id
    
    with pytest.raises(ValueError) as excinfo:
        get_user_by_id(db=db_session, user_id=user.id)
    assert "User not found." in str(excinfo.value)

def test_change_password(db_session):

    user = create_user(db=db_session, username="testuser8", email="test8@example.com", hashed_password=hash_password("oldhashedpassword"))
    
    updated_user = change_password(db=db_session, user_id=user.id, new_hashed_password=hash_password("newhashedpassword"))
    assert updated_user.hashed_password == hash_password("newhashedpassword")
