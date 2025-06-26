# app.py
# Description: This is the main entry point for the Flask application. It initializes the app, registers blueprints, and sets up error handling.
# Descrição: Este é o ponto de entrada principal para a aplicação Flask. Ele inicializa o app, registra blueprints e configura o tratamento de erros.

from flask import Flask, request
from flask_cors import CORS
from middleware import jwt_middleware

from server.api.endpoints import auth_bp, diet_bp, food_bp, recipe_bp, user_bp
from server.core.config import Config
from server.core.error_handlers import register_error_handlers


def create_app() -> Flask:
    """
    Cria e configura a instância da aplicação Flask.
    """
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    register_error_handlers(app)

    # Registra rotas da aplicação usando Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(recipe_bp, url_prefix="/recipe")
    app.register_blueprint(diet_bp, url_prefix="/diet")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(food_bp, url_prefix="/food")

    return app


# Inicializa a aplicação
app = create_app()


@app.before_request
def run_middleware():
    if request.endpoint not in [
        "auth.login_user",
        "auth.register_user",
    ]:  # nomes exatos das funções
        result = jwt_middleware()
        if result:
            return result


if __name__ == "__main__":
    app.run(debug=True)
