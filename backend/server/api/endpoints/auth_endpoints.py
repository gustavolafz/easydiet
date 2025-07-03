# api/endpoints/auth_endpoints.py

from typing import Any

from flask import Blueprint, Response, current_app, jsonify, request

from server.core.validation_middleware import validate_json
from server.schemas import UserCreateSchema, UserLoginSchema
from server.services import AuthService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
@validate_json(UserCreateSchema)
def register_user(data: UserCreateSchema) -> tuple[Response, int]:
    current_app.logger.info("Register endpoint called")
    auth_service = AuthService()
    auth_service.register(data.model_dump())
    return jsonify({"message": "User created successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
@validate_json(UserLoginSchema)
def login_user(data: UserLoginSchema) -> tuple[Response, int]:
    current_app.logger.info("Login endpoint called")
    auth_service = AuthService()
    payload = auth_service.login(data.model_dump())
    return jsonify(payload), 200


@auth_bp.route("/logout", methods=["POST"])
def logout(data: Any) -> tuple[Response, int]:
    current_app.logger.info("Logout endpoint called")
    body = data.model_dump()
    auth_service = AuthService()
    payload = auth_service.logout(body.user_id)
    return jsonify(payload), 200


@auth_bp.route("/verify", methods=["POST"])
def verify_user() -> tuple[Response, int]:
    data = request.get_json()
    if "token" not in data:
        return jsonify({"error": "Token not provided"}), 400

    auth_service = AuthService()
    token = data.get("token")
    payload = auth_service.verify_token(token)
    return jsonify(payload), 200
