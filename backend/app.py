import requests
from flask import Flask, jsonify
from server.core.config import Config  # Importa a configuração global
from server.api.endpoints import api_bp  # Importa o blueprint com os endpoints

def create_app():
    # Cria a aplicação Flask
    app = Flask(__name__)
    
    # Configura as configurações globais (ex: chave secreta, debug, etc.)
    app.config.from_object(Config)

    # Registra o blueprint com prefixo '/api'
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
