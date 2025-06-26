# api/endpoints/diet_endpoints.py

from flask import Blueprint, jsonify, request

from server.core.validation_middleware import validate_json
from server.schemas import CreateDietSchema
from server.services import DietService
from server.utils.json_encoder import bson_to_json

diet_bp = Blueprint("diet", __name__)
diet_service = DietService()


@diet_bp.route("/", methods=["POST"])
@validate_json(CreateDietSchema)
def create_diet_endpoint(data: CreateDietSchema):
    try:
        created_diet = diet_service.create_diet(data.dict())
        return jsonify(bson_to_json(created_diet)), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["GET"])
def get_diet(diet_id):
    try:
        # Busca pela dieta pelo ID
        diet = diet_service.get_diet_by_id(diet_id)
        if diet:
            return jsonify(diet), 200
        else:
            return jsonify({"error": "Dieta não encontrada"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/", methods=["GET"])
def get_diets_by_user_id():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Query param 'user_id' é obrigatório"}), 400

    try:
        # Busca todas as dietas do usuário
        diets = diet_service.get_diets_by_user_id(user_id)
        return jsonify(diets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["PUT"])
def update_diet(diet_id):
    data = request.get_json()
    try:
        # Chama o serviço para atualizar a dieta
        updated_diet = diet_service.update_diet(diet_id, data)
        return jsonify(updated_diet), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@diet_bp.route("/<diet_id>", methods=["DELETE"])
def delete_diet(diet_id):
    try:
        # Chama o serviço para deletar a dieta
        diet_service.delete_diet(diet_id)
        return jsonify({"message": "Dieta deletada com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
