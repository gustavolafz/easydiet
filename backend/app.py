# app.py
# Description: This is the main entry point for the Flask application. It initializes the app, registers blueprints, and sets up error handling.

import requests
from flask_cors import CORS
from flask import Flask, jsonify
from server.core.config import Config
from server.core.error_handlers import register_error_handlers

def create_app():
    # Cria a aplicação Flask
    app = Flask(__name__)
    
    CORS(app)  # Habilita CORS para a aplicação
    
    # Configura as configurações globais (ex: chave secreta, debug, etc.)
    app.config.from_object(Config)
    
    register_error_handlers(app)  # Registra os manipuladores de erro

    # Registra o blueprint com prefixo '/api'
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
