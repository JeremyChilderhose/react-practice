import pytest
from sqlalchemy.orm import sessionmaker
from db.initialize_db import hash_password, setup_db
from db.base import Base
from server.crud.tweet_crud import create_tweet, get_tweet_by_id, get_tweets_by_user, delete_tweet, update_tweet_content, increment_likes, decrement_likes
from server.crud.user_crud import create_user

# Each test file clears the test db so the first test in this file should create a user that has id == 1 for all subsequent tests
# ToDo: This is bad pactice. Should change...

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

def test_create_tweet(db_session):
    user = create_user(db=db_session, username="testuser1", email="test1@example.com", hashed_password=hash_password("hashedpassword"))
    tweet = create_tweet(db=db_session, user_id=user.id, content="This is a test tweet.")
    assert tweet.user_id == user.id
    assert tweet.content == "This is a test tweet."
    assert tweet.likes == 0

def test_create_tweet_empty_content(db_session):
    with pytest.raises(ValueError) as excinfo:
        create_tweet(db=db_session, user_id=1, content="")
    assert "Tweet content must be at most 140 characters long and not the empty string." in str(excinfo.value)

def test_create_tweet_long_content(db_session):
    long_content = "a" * 141
    with pytest.raises(ValueError) as excinfo:
        create_tweet(db=db_session, user_id=1, content=long_content)
    assert "Tweet content must be at most 140 characters long and not the empty string." in str(excinfo.value)

def test_get_tweet_by_id(db_session):
    tweet = create_tweet(db=db_session, user_id=1, content="Another test tweet.")
    retrieved_tweet = get_tweet_by_id(db=db_session, tweet_id=tweet.id)
    assert retrieved_tweet.id == tweet.id
    assert retrieved_tweet.content == "Another test tweet."

def test_get_tweet_by_id_not_found(db_session):
    with pytest.raises(ValueError) as excinfo:
        get_tweet_by_id(db=db_session, tweet_id=-1)
    assert "Tweet not found." in str(excinfo.value)

def test_get_tweets_by_user(db_session):
    user = create_user(db=db_session, username="testuser2", email="test2@example.com", hashed_password=hash_password("hashedpassword"))
    create_tweet(db=db_session, user_id=user.id, content="Tweet 1")
    create_tweet(db=db_session, user_id=user.id, content="Tweet 2")
    tweets = get_tweets_by_user(db=db_session, user_id=1)
    assert len(tweets) == 2

def test_get_tweets_by_user_not_found(db_session):
    with pytest.raises(ValueError) as excinfo:
        get_tweets_by_user(db=db_session, user_id=-1)
    assert "No tweets found for this user." in str(excinfo.value)

def test_update_tweet_content(db_session):
    tweet = create_tweet(db=db_session, user_id=1, content="Old content")
    updated_tweet = update_tweet_content(db=db_session, tweet_id=tweet.id, new_content="New content")
    assert updated_tweet.content == "New content"

def test_update_tweet_content_not_found(db_session):
    with pytest.raises(ValueError) as excinfo:
        update_tweet_content(db=db_session, tweet_id=-1, new_content="New content")
    assert "Tweet not found." in str(excinfo.value)

def test_increment_likes(db_session):
    tweet = create_tweet(db=db_session, user_id=1, content="Tweet with likes")
    tweet_with_likes = increment_likes(db=db_session, tweet_id=tweet.id)
    assert tweet_with_likes.likes == 1

def test_decrement_likes(db_session):
    tweet = create_tweet(db=db_session, user_id=1, content="Tweet with likes")
    increment_likes(db=db_session, tweet_id=tweet.id)
    tweet_with_likes = decrement_likes(db=db_session, tweet_id=tweet.id)
    assert tweet_with_likes.likes == 0

def test_decrement_likes_below_zero(db_session):
    tweet = create_tweet(db=db_session, user_id=1, content="Tweet with no likes")

    tweet = get_tweet_by_id(db=db_session, tweet_id=tweet.id)
    assert tweet.likes == 0

    with pytest.raises(ValueError) as excinfo:
        decrement_likes(db=db_session, tweet_id=tweet.id)
    
    assert str(excinfo.value) == "Error updating likes: Cannot decrement likes below zero."

