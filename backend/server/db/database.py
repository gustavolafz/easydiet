# server/db/database.py
# Description: This file contains the function to connect to the MongoDB database.

from pymongo import MongoClient
from server.core.config import Config

def get_database(nome_do_banco: str):
    """Retorna o banco de dados MongoDB."""
    # Cria o cliente
    client = MongoClient(Config.MONGO_URI)
    
    # Seleciona o banco de dados
    db = client[nome_do_banco]
    
    return db
