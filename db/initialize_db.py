from hashlib import sha256
import json
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from db.base import Base

def initialize_db(env='test'):
    try:
        db_url = get_db_url(env)
        if db_url:
            engine = create_engine(db_url)
            connection = engine.connect()

            _create_tables(engine, connection)

            connection.close()
            print(env + " Database initializated")
        else:
            print("Database URL not found or invalid.")
    except SQLAlchemyError as e:
        print(f"Error initializing the database: {e}")

def setup_db(env='test'):
    db_url = get_db_url(env)
    if db_url:
        engine = create_engine(db_url)
        initialize_db(env)
        return engine
    else:
        raise ValueError("Database URL not found for test environment.")

def get_db_url(env):
    try:
        with open('db/config.json', 'r') as config_file:
            config = json.load(config_file)

        db_config = config.get("databases", {}).get(env)
        if db_config:
            db_url = db_config.get('url')
            if db_url:
                return db_url
            else:
                raise ValueError(f"Database URL not found for environment '{env}' in the configuration file.")
        else:
            raise ValueError(f"Database configuration for environment '{env}' not found in the configuration file.")
    except FileNotFoundError:
        raise FileNotFoundError("Config file 'config.json' not found.")

def hash_password(password: str) -> str:
    hasher = sha256()
    hasher.update(password.encode('utf-8'))
    return hasher.hexdigest()

def _create_tables(engine, connection):
    tables_to_check = ['users', 'tweets', 'user_tweet_like']
    missing_tables = []
    
    for table_name in tables_to_check:
        if not engine.dialect.has_table(connection, table_name):
            missing_tables.append(table_name)

    if missing_tables:
        Base.metadata.create_all(bind=engine)
        print("Database initialization successful!")
    else:
        print("All required database tables already exist.")
