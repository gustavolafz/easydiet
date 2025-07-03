# db/database.py

from pymongo import MongoClient
from pymongo.database import Database
from server.core.config import Config


def get_database() -> Database:
    client = MongoClient(Config.MONGO_URI)
    db = client.easydiet
    return db
