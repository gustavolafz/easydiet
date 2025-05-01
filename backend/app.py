# app.py
# Description: This is the main entry point for the Flask application. It initializes the app, registers blueprints, and sets up error handling.

import requests
from flask_cors import CORS
from flask import Flask, jsonify
from server.core.config import Config
from server.api.endpoints.auth import auth_bp
from server.api.endpoints.food import food_bp
from server.core.error_handlers import register_error_handlers

def create_app():
    # Cria a aplicação Flask
    app = Flask(__name__)
    
    CORS(app)  # Habilita CORS para a aplicação
    
    # Configura as configurações globais (ex: chave secreta, debug, etc.)
    app.config.from_object(Config)
    
    register_error_handlers(app)  # Registra os manipuladores de erro

    # Registra os blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(food_bp, url_prefix='')

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
