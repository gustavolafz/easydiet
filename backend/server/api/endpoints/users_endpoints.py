# api/endpoints/users_endpoints.py

from typing import Any

from flask import Blueprint, Response, jsonify
from flask_injector import inject

from server.core.validation_middleware import validate_json
from server.schemas import UpdateUser
from server.services import UserService
from server.hateoas import build_user_response

user_bp = Blueprint("user", __name__)


@user_bp.route("/<user_id>", methods=["GET"])  # type: ignore[misc]
@inject
def get_user_endpoint(user_id: str, service: UserService) -> tuple[Response, int]:
    """
    GET /user/<user_id>
    """
    try:
        user = service.get_user_by_id(user_id)
        return jsonify(build_user_response(user)), 200

    except ValueError:
        return (
            jsonify({"error": "user_not_found", "message": "User not found"}),
            404,
        )


@user_bp.route("/<user_id>", methods=["PUT"])  # type: ignore[misc]
@validate_json(UpdateUser)
@inject
def update_user_endpoint(data: Any, user_id: str, service: UserService) -> tuple[Response, int]:
    """
    PUT /user/<user_id>
    """
    try:
        update_data = data.model_dump()
        result = service.update_user(user_id, update_data)
        return jsonify(build_user_response(result)), 200

    except ValueError:
        return (
            jsonify({"error": "update_failed", "message": "Error updating user"}),
            400,
        )


@user_bp.route("/<user_id>", methods=["DELETE"])  # type: ignore[misc]
@inject
def delete_user_endpoint(user_id: str, service: UserService) -> tuple[Response, int]:
    """
    DELETE /user/<user_id>
    """
    try:
        service.delete_user(user_id)
        return jsonify({
            "message": "User deleted",
            "_links": {
                "create": {"href": "/user", "method": "POST"}
            }
        }), 200

    except ValueError:
        return (
            jsonify({"error": "delete_failed", "message": "Error deleting user"}),
            404,
        )
