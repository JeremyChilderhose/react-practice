from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import validates, relationship
from db.base import Base
from db.models.user_tweet_like import UserTweetLike

class Tweet(Base):
    __tablename__ = 'tweets'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    content = Column(String(140), nullable=False)
    likes = Column(Integer, default=0)

    liked_by = relationship("UserTweetLike", cascade="all,delete", backref="tweets")

    @validates('content')
    def validate_content(self, key, value):
        if len(value) > 140 or len(value) == 0:
            raise ValueError("Tweet content must be at most 140 characters long and not the empty string.")
        return value
    
    @validates('likes')
    def validate_likes(self, key, value):
        if value < 0:
            raise ValueError("Likes must be a non-negative integer")
        return value

    def __init__(self, user_id, content, likes=0):
        self.user_id = user_id
        self.content = content
        self.likes = likes

    def __repr__(self):
        return f"<Tweet(id={self.id}, user_id={self.user_id}, content='{self.content}', likes={self.likes})>"
    