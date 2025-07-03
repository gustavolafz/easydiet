# api/endpoints/food_endpoints.py

import difflib
from datetime import datetime

from flask import Blueprint, Response, jsonify, request

from server.api.external_api.fatsecret import search_food
from server.core.validation_middleware import validate_json
from server.schemas import CreateFoodSchema
from server.services import FoodService

food_bp = Blueprint("food", __name__)
food_service = FoodService()


@food_bp.route("/", methods=["GET"])  # type: ignore[misc]
def get_or_search_food() -> Response:
    food_name = request.args.get("nome")
    if not food_name:
        return jsonify({"error": "Query param 'nome' is required"}), 400

    try:
        existing_food = food_service.collection.find_one(
            {"name": {"$regex": f"^{food_name}", "$options": "i"}}
        )
        if existing_food:
            existing_food["_id"] = str(existing_food["_id"])
            return jsonify(existing_food)

        api_result = search_food(food_name)
        food_raw_list = api_result.get("foods", {}).get("food", [])
        if not food_raw_list:
            return jsonify({"error": "Food not found in FatSecret"}), 404

        def similarity(a: str, b: str) -> float:
            return difflib.SequenceMatcher(None, a.lower(), b.lower()).ratio()

        best_match = max(
            food_raw_list, key=lambda f: similarity(food_name, f["food_name"])
        )
        if similarity(food_name, best_match["food_name"]) < 0.6:
            return (
                jsonify({"error": "No sufficiently similar food found"}),
                404,
            )

        fatsecret_id = best_match["food_id"]

        existing_by_id = food_service.collection.find_one(
            {"fatsecret_id": fatsecret_id}
        )
        if existing_by_id:
            existing_by_id["_id"] = str(existing_by_id["_id"])
            return jsonify(existing_by_id)

        serving = food_service.parse_food_description(best_match["food_description"])
        food_doc = {
            "fatsecret_id": fatsecret_id,
            "name": best_match["food_name"],
            "brand": (
                "Generic" if best_match.get("food_type") == "Generic" else "Unknown"
            ),
            "serving_sizes": [serving],
            "category": best_match.get("food_type", "Generic"),
            "last_updated": datetime.utcnow(),
        }

        inserted = food_service.collection.insert_one(food_doc)
        food_doc["_id"] = str(inserted.inserted_id)
        return jsonify(food_doc)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@food_bp.route("/", methods=["POST"])  # type: ignore[misc]
@validate_json(CreateFoodSchema)
def create_food_endpoint(data: CreateFoodSchema) -> tuple[Response, int]:
    try:
        serving = food_service.parse_food_description(data.description)
        food_doc = {
            "fatsecret_id": data.fatsecret_id,
            "name": data.name,
            "brand": data.brand or None,
            "serving_sizes": [serving],
            "category": data.type,
            "last_updated": datetime.utcnow(),
        }
        new_id = food_service.collection.insert_one(food_doc).inserted_id
        return jsonify({"message": "Food added successfully", "id": str(new_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
