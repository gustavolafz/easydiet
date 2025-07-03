# api/endpoints/diet_endpoints.py


from flask import Blueprint, Response, jsonify, request

from server.core.validation_middleware import validate_json
from server.schemas import CreateDietSchema
from server.services import DietService
from server.utils.json_encoder import bson_to_json

diet_bp = Blueprint("diet", __name__)
diet_service = DietService()


@diet_bp.route("/", methods=["POST"])
@validate_json(CreateDietSchema)
def create_diet_endpoint(data: CreateDietSchema) -> tuple[Response, int]:
    try:
        created_diet = diet_service.create_diet(data.dict())
        return jsonify(bson_to_json(created_diet)), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["GET"])
def get_diet(diet_id: str) -> tuple[Response, int]:
    try:
        diet = diet_service.get_diet_by_id(diet_id)
        if diet:
            return jsonify(diet), 200
        else:
            return jsonify({"error": "Diet not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/", methods=["GET"])
def get_diets_by_user_id() -> tuple[Response, int]:
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Query param 'user_id' is required"}), 400

    try:
        diets = diet_service.get_diets_by_user_id(user_id)
        return jsonify(diets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["PUT"])
def update_diet(diet_id: str) -> tuple[Response, int]:
    data = request.get_json()
    try:
        updated_diet = diet_service.update_diet(diet_id, data)
        return jsonify(updated_diet), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["DELETE"])
def delete_diet(diet_id: str) -> tuple[Response, int]:
    try:
        diet_service.delete_diet(diet_id)
        return jsonify({"message": "Diet successfully deleted!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
