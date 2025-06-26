# db/database.py

from pymongo import MongoClient

from server.core.config import Config


def get_database():

    client = MongoClient(Config.MONGO_URI)
    db = client.easydiet
    return db
