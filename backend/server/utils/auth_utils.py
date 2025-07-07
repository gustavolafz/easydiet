# backend/server/utils/auth_utils.py

import base64
from typing import Any

import requests

from server.core.config import Config


def get_access_token() -> str:
    """
    Retrieve an OAuth2 access token from FatSecret using client credentials.
    """
    url = "https://oauth.fatsecret.com/connect/token"

    # FatSecret requires Base64-encoded client credentials
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
        timeout=Config.DEFAULT_TIMEOUT,
    )

    if response.status_code == 200:
        response_json: Any = response.json()
        token = response_json.get("access_token")
        if not isinstance(token, str):
            raise ValueError("Access token missing or not a string")
        return token
    else:
        raise Exception(
            f"Error fetching token: {response.status_code} - {response.text}"
        )
