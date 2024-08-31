import pytest
from unittest.mock import patch, MagicMock
from db.initialize_db import initialize_db, setup_db, get_db_url, hash_password

@patch('db.initialize_db.create_engine')
@patch('db.initialize_db.get_db_url')
@patch('db.initialize_db._create_tables')
def test_initialize_db_success(mock_create_tables, mock_get_db_url, mock_create_engine):
    mock_get_db_url.return_value = 'sqlite:///test.db'
    mock_engine = MagicMock()
    mock_create_engine.return_value = mock_engine

    mock_connection = MagicMock()
    mock_engine.connect.return_value = mock_connection

    initialize_db('test')
    
    mock_create_engine.assert_called_once_with('sqlite:///test.db')
    mock_create_tables.assert_called_once_with(mock_engine, mock_connection)
    mock_connection.close.assert_called_once()
    print("test_initialize_db_success passed!")
