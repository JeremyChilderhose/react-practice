import pytest
from sqlalchemy.orm import sessionmaker
from db.base import Base
from db.models.user import User
from db.models.tweet import Tweet
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

def test_insert_tweet(test_session):
    password = "password"
    user = User(username="testuser1", email="testuser1@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    tweet = Tweet(user_id=user.id, content="This is a test tweet", likes=0)
    test_session.add(tweet)
    test_session.commit()

    inserted_tweet = test_session.query(Tweet).filter_by(content="This is a test tweet").first()
    assert inserted_tweet is not None
    assert inserted_tweet.content == "This is a test tweet"
    assert inserted_tweet.likes == 0
    assert inserted_tweet.user_id == user.id

def test_query_tweet(test_session):
    password = "password"
    user = User(username="testuser2", email="testuser2@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    tweet = Tweet(user_id=user.id, content="Another test tweet", likes=0)
    test_session.add(tweet)
    test_session.commit()

    queried_tweet = test_session.query(Tweet).filter_by(content="Another test tweet").first()
    assert queried_tweet is not None
    assert queried_tweet.content == "Another test tweet"
    assert queried_tweet.likes == 0
    assert queried_tweet.user_id == user.id

def test_update_increase_likes(test_session):
    tweet = test_session.query(Tweet).filter_by(content="This is a test tweet").first()
    assert tweet is not None

    tweet.likes += 1
    test_session.commit()

    updated_tweet = test_session.query(Tweet).filter_by(id=tweet.id).first()
    assert updated_tweet.likes == 1  

def test_update_decrease_likes(test_session):
    tweet = test_session.query(Tweet).filter_by(content="This is a test tweet").first()
    assert tweet is not None

    tweet.likes -= 1
    test_session.commit()

    updated_tweet = test_session.query(Tweet).filter_by(id=tweet.id).first()
    assert updated_tweet.likes == 0 

def test_negative_likes(test_session):
    tweet = test_session.query(Tweet).filter_by(content="This is a test tweet").first()
    assert tweet is not None

    with pytest.raises(ValueError):
        tweet.likes -= 1
        test_session.commit()
    test_session.rollback()
    
    updated_tweet = test_session.query(Tweet).filter_by(id=tweet.id).first()
    assert updated_tweet.likes == 0 

def test_delete_tweet(test_session):
    password = "password"
    user = User(username="testuser3", email="testuser3@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    tweet = Tweet(user_id=user.id, content="Tweet to be deleted", likes=0)
    test_session.add(tweet)
    test_session.commit()

    tweet_to_delete = test_session.query(Tweet).filter_by(content="Tweet to be deleted").first()
    assert tweet_to_delete is not None

    test_session.delete(tweet_to_delete)
    test_session.commit()

    deleted_tweet = test_session.query(Tweet).filter_by(content="Tweet to be deleted").first()
    assert deleted_tweet is None

def test_content_over_140_characters(test_session):
    password = "password"
    user = User(username="testuser4", email="testuser4@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    long_content = "x" * 141  # 141 characters, exceeds the limit

    with pytest.raises(ValueError, match="Tweet content must be at most 140 characters long."):
        tweet = Tweet(user_id=user.id, content=long_content)
        test_session.add(tweet)
        test_session.commit()

def test_empty_content(test_session):
    password = "password"
    user = User(username="testuser5", email="testuser5@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    with pytest.raises(ValueError, match="Tweet content must be at most 140 characters long."):
        tweet = Tweet(user_id=user.id, content="")
        test_session.add(tweet)
        test_session.commit()