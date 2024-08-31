from pydantic import BaseModel

class TweetBase(BaseModel):
    content: str

class TweetCreate(TweetBase):
    user_id: int

class TweetResponse(TweetBase):
    id: int
    user_id: int
    likes: int

    class Config:
        orm_mode = True
