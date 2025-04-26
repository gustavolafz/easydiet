from flask import Blueprint
from server.api.endpoints.testeapi import testeapi_bp  # Importa o blueprint do testeapi


api_bp = Blueprint('app', __name__)


api_bp.register_blueprint(testeapi_bp, url_prefix='')