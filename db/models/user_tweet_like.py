from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from db.base import Base

class UserTweetLike(Base):
    __tablename__ = 'user_tweet_likes'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    tweet_id = Column(Integer, ForeignKey('tweets.id'), primary_key=True)

    __table_args__ = (
        UniqueConstraint('user_id', 'tweet_id', name='uix_user_tweet'),
    )

    def __init__(self, user_id, tweet_id):
        self.user_id = user_id
        self.tweet_id = tweet_id

    def __repr__(self):
        return f"<UserTweetLike(user_id={self.user_id}, tweet_id={self.tweet_id})>"
