# server/api/endpoints/food.py
# Description: This file contains the endpoint for searching food items using the FatSecret API.

import requests
from flask import Blueprint, request, jsonify
from server.api.external_api.fatsecret import search_food
from server.db.database import get_database

food_bp = Blueprint("food", __name__)

@food_bp.route("/search", methods=["GET"])
def search_food_route():
    food_name = request.args.get("nome")
    if not food_name:
        return jsonify({"error": "Query param 'nome' is required"}), 400
    try:
        result = search_food(food_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500