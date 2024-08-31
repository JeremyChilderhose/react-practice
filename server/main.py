import os 
from fastapi import FastAPI
from db.initialize_db import setup_db
from server.routes import users, tweets

app = FastAPI()

engine = setup_db('dev')

app.include_router(users.router)
app.include_router(tweets.router)
