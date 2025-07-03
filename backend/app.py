# app.py

from typing import Optional

from flask import Flask, Response, request
from flask_cors import CORS
from middleware import jwt_middleware

from server.api.endpoints import auth_bp, diet_bp, food_bp, recipe_bp, user_bp
from server.core.config import Config
from server.core.error_handlers import register_error_handlers


def create_app() -> Flask:
    """
    Creates and configures the Flask application instance.
    """
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    register_error_handlers(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(recipe_bp, url_prefix="/recipe")
    app.register_blueprint(diet_bp, url_prefix="/diet")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(food_bp, url_prefix="/food")

    return app


app = create_app()


@app.before_request
def run_middleware() -> Optional[Response]:
    if request.endpoint not in [
        "auth.login_user",
        "auth.register_user",
    ]:
        result = jwt_middleware()
        if result:
            return result
    return None


if __name__ == "__main__":
    app.run(debug=True)
