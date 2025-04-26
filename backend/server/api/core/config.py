import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente do arquivo .env
load_dotenv('.env')

class Config:
    """Configurações globais da aplicação."""

    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    API_URL = os.getenv("API_URL")

    # # Validação das variáveis obrigatórias
    # if not DB_USER or not DB_PASSWORD or not DB_NAME:
    #     raise ValueError("As variáveis de ambiente DB_USER, DB_PASSWORD e DB_NAME são obrigatórias.")

config = Config()