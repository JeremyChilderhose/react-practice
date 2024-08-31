from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List
from server.dependencies import get_db
from server.crud.tweet_crud import (
    create_tweet,
    get_tweet_by_id,
    get_tweets_by_user,
    delete_tweet,
    update_tweet_content
)
from server.schemas.tweet_schema import TweetCreate, TweetResponse

router = APIRouter()

@router.post("/tweets/", response_model=TweetResponse, status_code=status.HTTP_201_CREATED)
def create_new_tweet(tweet: TweetCreate, db: Session = Depends(get_db)):
    try:
        created_tweet = create_tweet(db=db, user_id=tweet.user_id, content=tweet.content)
        return created_tweet
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/tweets/{tweet_id}", response_model=TweetResponse)
def read_tweet(tweet_id: int, db: Session = Depends(get_db)):
    try:
        tweet = get_tweet_by_id(db=db, tweet_id=tweet_id)
        return tweet
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))

@router.get("/users/{user_id}/tweets/", response_model=List[TweetResponse])
def read_tweets_by_user(user_id: int, db: Session = Depends(get_db)):
    try:
        tweets = get_tweets_by_user(db=db, user_id=user_id)
        return tweets
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))

@router.delete("/tweets/{tweet_id}", response_model=TweetResponse)
def delete_existing_tweet(tweet_id: int, db: Session = Depends(get_db)):
    try:
        tweet = delete_tweet(db=db, tweet_id=tweet_id)
        return tweet
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/tweets/{tweet_id}/content", response_model=TweetResponse)
def update_tweet(tweet_id: int, new_content: str, db: Session = Depends(get_db)):
    try:
        tweet = update_tweet_content(db=db, tweet_id=tweet_id, new_content=new_content)
        return tweet
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
