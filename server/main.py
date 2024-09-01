import os 
from fastapi import FastAPI
from db.initialize_db import setup_db
from server.routes import users, tweets
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",  
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

engine = setup_db('dev')

app.include_router(users.router)
app.include_router(tweets.router)
