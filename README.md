# Simple Microblogging Demo Application

NOTE: Requirements & Installation Guide are incomplete.

This is a simple microblogging demo application built with Python, FastAPI, SQLite using SQLAlchemy, React, and JavaScript. The application allows users to post messages and view posts. The project is structured into three main directories: `client`, `db`, and `server`.

You can find the figma designs here: https://www.figma.com/design/5ip0qwHZIgW3zLuqwsQD19/Twitter-Clone?node-id=63-76&t=vCZt0hixyuq14BG7-1

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Features

-Users can register a new user with a email, username and password
-Users may reset a user's password
-A valid username and password will generate a JWT access token
-Can view "tweets" made by users in the database
-An authenticated user may post Tweets

## Directory Structure

### Client

The `client` directory contains the React application, which is responsible for the frontend of the microblogging platform. It communicates with the FastAPI backend to authenticate users, fetch and display posts. Authentication is done using JWT Access Tokens.

### DB

The `db` directory is where all the database operations are handled. It uses SQLAlchemy to interact with a SQLite database, which stores the posts. The models folder defines the 3 tables (users, tweets and user_tweet_likes). Base is the abstract class which SQLAlchemy models inherit from.

### Server

The `server` directory contains the FastAPI backend server. It exposes API endpoints to create and retrieve posts, and handles the business logic of the application.

## Installation

--ToDo: This.

## API Endpoints

### User Authentication and Management

- **POST `/register`**
  - **Description:** Register a new user.
  - **Request Body:** 
    - `username`: `string` (required) - The username for the new user.
    - `email`: `string` (required) - The email address for the new user.
    - `password`: `string` (required) - The password for the new user.
  - **Response:** Returns the newly created user.
  - **Response Model:** `UserResponse`
  - **Possible Errors:**
    - `400`: User already exists.

- **POST `/login`**
  - **Description:** Log in a user and retrieve an access token.
  - **Request Body:**
    - `username`: `string` (required) - The username of the user.
    - `password`: `string` (required) - The password of the user.
  - **Response:** Returns a JSON object containing the access token.
  - **Response Model:** `Token`
  - **Possible Errors:**
    - `401`: Invalid username or password.

- **GET `/verify-token`**
  - **Description:** Verify the validity of an access token.
  - **Headers:**
    - `Authorization`: `string` (required) - Bearer token.
  - **Response:** Returns a message indicating whether the token is valid and includes the associated user.
  - **Possible Errors:**
    - `401`: Invalid or expired token.

- **GET `/user/{username}`**
  - **Description:** Retrieve a user by username.
  - **Path Parameter:**
    - `username`: `string` (required) - The username of the user to retrieve.
  - **Response:** Returns the user's details.
  - **Response Model:** `UserResponse`
  - **Possible Errors:**
    - `404`: User not found.

### Tweet Management

- **POST `/tweets/`**
  - **Description:** Create a new tweet.
  - **Request Body:**
    - `user_id`: `int` (required) - The ID of the user creating the tweet.
    - `content`: `string` (required) - The content of the tweet.
  - **Response:** Returns the newly created tweet.
  - **Response Model:** `TweetResponse`
  - **Status Code:** `201 Created`
  - **Possible Errors:**
    - `400`: Invalid tweet data.
    - `500`: Internal server error.

- **GET `/tweets/{tweet_id}`**
  - **Description:** Retrieve a tweet by its ID.
  - **Path Parameter:**
    - `tweet_id`: `int` (required) - The ID of the tweet to retrieve.
  - **Response:** Returns the tweet's details.
  - **Response Model:** `TweetResponse`
  - **Possible Errors:**
    - `404`: Tweet not found.

- **GET `/users/{user_id}/tweets/`**
  - **Description:** Retrieve all tweets created by a specific user.
  - **Path Parameter:**
    - `user_id`: `int` (required) - The ID of the user whose tweets are being retrieved.
  - **Response:** Returns a list of tweets created by the user.
  - **Response Model:** `List[TweetResponse]`
  - **Possible Errors:**
    - `404`: User not found or no tweets available for the user.

- **DELETE `/tweets/{tweet_id}`**
  - **Description:** Delete a tweet by its ID.
  - **Path Parameter:**
    - `tweet_id`: `int` (required) - The ID of the tweet to delete.
  - **Response:** Returns the details of the deleted tweet.
  - **Response Model:** `TweetResponse`
  - **Possible Errors:**
    - `404`: Tweet not found.
    - `500`: Internal server error.

- **PUT `/tweets/{tweet_id}/content`**
  - **Description:** Update the content of an existing tweet.
  - **Path Parameter:**
    - `tweet_id`: `int` (required) - The ID of the tweet to update.
  - **Request Body:**
    - `new_content`: `string` (required) - The new content for the tweet.
  - **Response:** Returns the updated tweet's details.
  - **Response Model:** `TweetResponse`
  - **Possible Errors:**
    - `400`: Invalid tweet content.
    - `500`: Internal server error.

- **GET `/tweets/`**
  - **Description:** Retrieve all tweets.
  - **Response:** Returns a list of all tweets.
  - **Response Model:** `List[TweetResponse]`
  - **Possible Errors:**
    - `404`: No tweets found.
    - `500`: Internal server error.
