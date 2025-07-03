# api/external_api/fatsecret.py

from typing import Any

import requests

from server.core.config import Config


def get_access_token() -> str:
    """Obtains the FatSecret OAuth 2.0 access token."""
    url = "https://oauth.fatsecret.com/connect/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "scope": "basic",
        "client_id": Config.CLIENT_ID,
        "client_secret": Config.CLIENT_SECRET,
    }
    response = requests.post(url, headers=headers, data=data)
    response.raise_for_status()
    return response.json()["access_token"]


def search_food(food_name: str) -> Any:
    """Searches foods on FatSecret."""
    token = get_access_token()
    search_url = "https://platform.fatsecret.com/rest/server.api"

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "method": "foods.search",
        "search_expression": food_name,
        "format": "json",
    }
    response = requests.post(search_url, headers=headers, data=data)
    response.raise_for_status()
    return response.json()
