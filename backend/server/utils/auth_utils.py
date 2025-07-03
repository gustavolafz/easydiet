# file: backend/server/utils/auth_utils.py

import base64

import requests
from server.core.config import Config


def get_access_token() -> str:
    url = "https://oauth.fatsecret.com/connect/token"

    # FatSecret requires Base64 authentication
    credentials = f"{Config.CLIENT_ID}:{Config.CLIENT_SECRET}"
    credentials_base64 = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {credentials_base64}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    data = {"grant_type": "client_credentials"}

    response = requests.post(
        url,
        headers=headers,
        data=data,
        timeout=Config.DEFAULT_TIMEOUT
    )

    if response.status_code == 200:
        token = response.json()["access_token"]
        return token
    else:
        raise Exception(
            f"Error fetching token: {response.status_code} - {response.text}"
        )
