# backend/server/api/external_api/fatsecret.py

from typing import Any

import requests

from server.core.config import Config


def get_access_token() -> str:
    """Obtain the FatSecret OAuth 2.0 access token via client credentials grant."""
    url = "https://oauth.fatsecret.com/connect/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "scope": "basic",
        "client_id": Config.CLIENT_ID,
        "client_secret": Config.CLIENT_SECRET,
    }

    response = requests.post(
        url,
        headers=headers,
        data=data,
        timeout=Config.DEFAULT_TIMEOUT,
    )
    response.raise_for_status()

    # Parse and validate the token field
    response_json: Any = response.json()
    token = response_json.get("access_token")
    if not isinstance(token, str):
        raise ValueError("Access token missing or not a string")

    return token


def search_food(food_name: str) -> Any:
    """Search for foods on FatSecret using the provided food name."""
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

    response = requests.post(
        search_url,
        headers=headers,
        data=data,
        timeout=Config.DEFAULT_TIMEOUT,
    )
    response.raise_for_status()
    return response.json()
