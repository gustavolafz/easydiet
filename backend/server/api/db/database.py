from pymongo import MongoClient
from server.api.core.config import Config

# Cria o cliente
client = MongoClient(Config.MONGO_URI)

# Seleciona o banco de dados
client = MongoClient(Config.MONGO_URI)

db = client[Config.MONGO_DB_NAME]