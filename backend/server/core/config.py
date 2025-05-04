# server/core/config.py
# Description: This file contains the configuration settings for the Flask application, including loading environment variables from a .env file.

import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()


class Config:
    """Configurações globais da aplicação."""

    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    API_URL = os.getenv("API_URL")
    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

    # # Validação das variáveis obrigatórias
    # if not DB_USER or not DB_PASSWORD or not DB_NAME:
    #     raise ValueError("As variáveis de ambiente DB_USER, DB_PASSWORD e DB_NAME são obrigatórias.")

config = Config()