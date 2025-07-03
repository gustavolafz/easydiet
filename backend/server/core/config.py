# core/config.py

import os

from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()


class Config:
    """Configurações globais da aplicação."""

    DEFAULT_TIMEOUT = 10
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    API_URL = os.getenv("API_URL")
    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
    JWT_SECRET = os.getenv("JWT_SECRET")


config = Config()
