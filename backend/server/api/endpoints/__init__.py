from flask import Blueprint
from server.api.endpoints.food import food_bp  # Importa o blueprint do testeapi


api_bp = Blueprint('app', __name__)


api_bp.register_blueprint(food_bp, url_prefix='')