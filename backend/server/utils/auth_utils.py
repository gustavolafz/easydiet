# server/utils/auth.py
# Description: This file contains the authentication logic for the FatSecret API.

import base64
import requests
from server.core.config import Config

def get_access_token():
    url = "https://oauth.fatsecret.com/connect/token"
    
    # FatSecret pede autenticação em Base64
    credentials = f"{Config.CLIENT_ID}:{Config.CLIENT_SECRET}"
    credentials_base64 = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {credentials_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "client_credentials"
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        token = response.json()['access_token']
        return token
    else:
        raise Exception(f"Erro ao pegar token: {response.status_code} - {response.text}")
