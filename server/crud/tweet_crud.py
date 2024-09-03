from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from db.models.tweet import Tweet

def create_tweet(db: Session, user_id: int, content: str):
    try:
        db_tweet = Tweet(user_id=user_id, content=content)
        db.add(db_tweet)
        db.commit()
        db.refresh(db_tweet)
        return db_tweet
    except ValueError as ve:
        raise ValueError(f"Error creating tweet: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def get_tweet_by_id(db: Session, tweet_id: int):
    tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if tweet is None:
        raise ValueError("Tweet not found.")
    return tweet

def get_tweets_by_user(db: Session, user_id: int):
    tweets = db.query(Tweet).filter(Tweet.user_id == user_id).all()
    if not tweets:
        raise ValueError("No tweets found for this user.")
    return tweets

def delete_tweet(db: Session, tweet_id: int):
    try:
        tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
        if tweet is None:
            raise ValueError("Tweet not found.")

        db.delete(tweet)
        db.commit()
        return tweet
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def update_tweet_content(db: Session, tweet_id: int, new_content: str):
    try:
        tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
        if tweet is None:
            raise ValueError("Tweet not found.")

        tweet.content = new_content
        db.commit()
        db.refresh(tweet)
        return tweet
    except ValueError as ve:
        raise ValueError(f"Error updating tweet: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def increment_likes(db: Session, tweet_id: int):
    try:
        tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
        if tweet is None:
            raise ValueError("Tweet not found.")
        
        tweet.likes += 1
        db.commit()
        db.refresh(tweet)
        return tweet
    except ValueError as ve:
        raise ValueError(f"Error updating likes: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")
    
def decrement_likes(db: Session, tweet_id: int):
    try:
        tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
        if tweet is None:
            raise ValueError("Tweet not found.")
        
        if tweet.likes > 0: 
            tweet.likes -= 1
        else:
            raise ValueError("Cannot decrement likes below zero.")
        
        db.commit()
        db.refresh(tweet)
        return tweet
    except ValueError as ve:
        raise ValueError(f"Error updating likes: {ve}")
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")

def get_all_tweets(db: Session):
    try:
        tweets = db.query(Tweet).all()
        if not tweets:
            raise ValueError("No tweets found.")
        return tweets
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {e}")
