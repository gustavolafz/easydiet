# server/api/endpoints/auth.py
# Description: Authentication endpoints for user registration, login, and token verification.

from flask import Blueprint, request, jsonify, current_app
from server.services.auth import AuthService
from server.core.validation_middleware import validate_json
from server.schemas.auth import UserCreateSchema, UserLoginSchema

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@validate_json(UserCreateSchema)
def register_user(data: UserCreateSchema):
    current_app.logger.info('Register endpoint called')
    auth_service = AuthService()
    auth_service.register(data.model_dump())
    return jsonify({'message': 'Usuário criado com sucesso'}), 201

@auth_bp.route('/login', methods=['POST'])
@validate_json(UserLoginSchema)
def login_user(data: UserLoginSchema):
    current_app.logger.info('Login endpoint called')
    auth_service = AuthService()
    payload = auth_service.login(data.model_dump())
    return jsonify(payload), 200

@auth_bp.route('/logout', methods=['POST'])
def logout(data):
    current_app.logger.info('Login endpoint called')
    body = data.model_dump()
    auth_service = AuthService()
    payload = auth_service.logout(body.user_id)
    return jsonify(payload), 200

@auth_bp.route('/verify', methods=["POST"])
def verify_user():
    data = request.get_json()
    if "token" not in data:
        return jsonify({"error": "Token não fornecido"}), 400

    auth_service = AuthService()
    token = data.get('token')
    payload = auth_service.verify_token(token)
    return jsonify(payload), 200
