from flask import Blueprint
from server.api.endpoints.auth import auth_bp
from server.api.endpoints.food import food_bp


api_bp = Blueprint('app', __name__)

api_bp.register_blueprint(auth_bp, url_prefix='/auth')
api_bp.register_blueprint(food_bp, url_prefix='')
