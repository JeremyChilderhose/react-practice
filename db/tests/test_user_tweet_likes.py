import pytest
import warnings
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker
from db.base import Base
from db.models.user import User
from db.models.tweet import Tweet
from db.models.user_tweet_like import UserTweetLike
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

def test_create_user_tweet_like(test_session):
    password = "password"
    user = User(username="testuser1", email="testuser1@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    tweet = Tweet(user_id=user.id, content="Test tweet", likes=0)
    test_session.add(tweet)
    test_session.commit()

    like = UserTweetLike(user_id=user.id, tweet_id=tweet.id)
    test_session.add(like)
    
    try:
        test_session.commit()
    except IntegrityError:
        test_session.rollback()
        raise

    added_like = test_session.query(UserTweetLike).filter_by(user_id=user.id, tweet_id=tweet.id).first()
    assert added_like is not None
    assert added_like.user_id == user.id
    assert added_like.tweet_id == tweet.id

# Suppress the warning in this test. We are trying insert a duplicate because we are checking to make sure this fails.
@pytest.mark.filterwarnings("ignore:New instance:Warning")
def test_duplicate_user_tweet_like(test_session):
    password = "password"
    user = User(username="testuser", email="testuser@example.com", hashed_password=hash_password(password))
    test_session.add(user)
    test_session.commit()

    tweet = Tweet(user_id=user.id, content="Test tweet", likes=0)
    test_session.add(tweet)
    test_session.commit() 

    like = UserTweetLike(user_id=user.id, tweet_id=tweet.id)
    test_session.add(like)
    test_session.commit()

    duplicate_like = UserTweetLike(user_id=user.id, tweet_id=tweet.id)
    test_session.add(duplicate_like)

    try:
        test_session.commit()
    except IntegrityError:
        test_session.rollback()
        like_count = test_session.query(UserTweetLike).filter_by(user_id=user.id, tweet_id=tweet.id).count()
        assert like_count == 1
    else:
        assert False, "IntegrityError was expected but not raised"

def test_deleting_tweet_deletes_likes(test_session):
    password = "password"
    
    user1 = User(username="testuser2", email="testuser2@example.com", hashed_password=hash_password(password))
    user2 = User(username="testuser3", email="testuser3@example.com", hashed_password=hash_password(password))
    
    test_session.add(user1)
    test_session.add(user2)
    test_session.commit()  
    
    tweet = Tweet(user_id=user1.id, content="Shared tweet", likes=0)
    test_session.add(tweet)
    test_session.commit()  
    
    like1 = UserTweetLike(user_id=user1.id, tweet_id=tweet.id)
    like2 = UserTweetLike(user_id=user2.id, tweet_id=tweet.id)
    
    test_session.add(like1)
    test_session.add(like2)
    
    try:
        test_session.commit()
    except IntegrityError:
        test_session.rollback()
        assert False, "IntegrityError occurred while adding likes"
    
    likes = test_session.query(UserTweetLike).filter_by(tweet_id=tweet.id).all()
    assert len(likes) == 2, "There should be exactly two likes for the tweet"
    
    user_ids = {like.user_id for like in likes}
    assert user_ids == {user1.id, user2.id}, "The likes should be associated with both users"

    # This logic is not implemented yet at the db level... For now it is handled at the server level
    # tweet = test_session.query(Tweet).filter_by(id=tweet.id).first()
    # assert tweet.likes == 2, "The tweet should have 2 likes"

    test_session.delete(tweet)
    test_session.commit()
    
    remaining_likes = test_session.query(UserTweetLike).filter_by(tweet_id=tweet.id).all()
    assert len(remaining_likes) == 0
