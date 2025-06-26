# api/endpoints/users_endpoints.py

from flask import Blueprint, current_app, jsonify

from server.core.validation_middleware import validate_json
from server.schemas import UpdateUser
from server.services import UserService

user_bp = Blueprint("user", __name__)


@user_bp.route("/<user_id>", methods=["GET"])
def get_user_endpoint(user_id):
    """
    GET /user/<user_id>
    """
    try:
        current_app.logger.info(f"[GET /user/{user_id}] Fetch user called")
        service = UserService()
        user = service.get_user_by_id(user_id)
        return jsonify(user), 200

    except ValueError as e:
        current_app.logger.error(f"[GET /user/{user_id}] User not found: {e}")
        return (
            jsonify({"error": "user_not_found", "message": "Usuário não encontrado"}),
            404,
        )


@user_bp.route("/<user_id>", methods=["PUT"])
@validate_json(UpdateUser)
def update_user_endpoint(data, user_id):
    """
    PUT /user/<user_id>
    """
    try:
        current_app.logger.info(f"[PUT /user/{user_id}] Update user called")
        service = UserService()
        update_data = data.model_dump()
        result = service.update_user(user_id, update_data)
        return jsonify(result), 200

    except ValueError as e:
        current_app.logger.error(f"[PUT /user/{user_id}] Error updating user: {e}")
        return (
            jsonify({"error": "update_failed", "message": "Erro ao atualizar usuário"}),
            400,
        )


@user_bp.route("/<user_id>", methods=["DELETE"])
def delete_user_endpoint(user_id):
    """
    DELETE /user/<user_id>
    """
    try:
        current_app.logger.info(f"[DELETE /user/{user_id}] Delete user called")
        service = UserService()
        result = service.delete_user(user_id)
        return jsonify(result), 200

    except ValueError as e:
        current_app.logger.error(f"[DELETE /user/{user_id}] Error deleting user: {e}")
        return (
            jsonify({"error": "delete_failed", "message": "Erro ao excluir usuário"}),
            404,
        )
