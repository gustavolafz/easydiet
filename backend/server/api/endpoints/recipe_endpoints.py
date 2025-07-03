# api/endpoints/recipe_endpoints.py


from bson import ObjectId
from flask import Blueprint, Response, jsonify, request

from server.core.validation_middleware import validate_json
from server.schemas import CreateRecipe
from server.services import RecipeService

recipe_bp = Blueprint("recipe", __name__)
recipe_service = RecipeService()


@recipe_bp.route("/<recipe_id>", methods=["GET"])  # type: ignore[misc]
def get_recipe(recipe_id: str) -> tuple[Response, int] | Response:
    try:
        recipe = recipe_service.db.recipes.find_one({"_id": ObjectId(recipe_id)})
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        enriched_ingredients = []
        for item in recipe["ingredients"]:
            food = recipe_service.db.foods.find_one({"_id": item["food_id"]})
            enriched_ingredients.append(
                {
                    "food_id": str(item["food_id"]),
                    "food_name": food["name"] if food else "Unknown",
                    "quantity": item["quantity"],
                    "unit": item["unit"],
                }
            )

        recipe["ingredients"] = enriched_ingredients
        recipe["_id"] = str(recipe["_id"])
        recipe["user_id"] = str(recipe["user_id"])
        recipe["created_at"] = recipe["created_at"].isoformat()

        return jsonify(recipe)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@recipe_bp.route("/", methods=["GET"])  # type: ignore[misc]
def get_recipes_by_user() -> Response:
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Query param 'user_id' is required"}), 400
    try:
        recipes = recipe_service.get_recipes_by_user(user_id)
        return jsonify(recipes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@recipe_bp.route("/<recipe_id>", methods=["PUT"])  # type: ignore[misc]
def update_recipe(recipe_id: str) -> tuple[Response, int]:
    try:
        data = request.get_json()
        updated_message = recipe_service.update_recipe(recipe_id, data)
        return jsonify(updated_message), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@recipe_bp.route("/<recipe_id>", methods=["DELETE"])  # type: ignore[misc]
def delete_recipe(recipe_id: str) -> tuple[Response, int]:
    try:
        delete_message = recipe_service.delete_recipe(recipe_id)
        return jsonify(delete_message), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@recipe_bp.route("/", methods=["POST"])  # type: ignore[misc]
@validate_json(CreateRecipe)
def create_recipe_endpoint(data: CreateRecipe) -> tuple[Response, int]:
    try:
        inserted_id = recipe_service.create_recipe(data.dict())
        return jsonify({"message": "Recipe created", "id": inserted_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
