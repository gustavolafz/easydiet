# core/error_handlers.py

from flask import jsonify
from pydantic import ValidationError
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):

    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        app.logger.error(f"Validation Error: {str(error)}")
        return jsonify({"error": "Dados inválidos", "details": str(error)}), 400

    @app.errorhandler(ValueError)
    def handle_value_error(error):
        app.logger.error(f"Value Error: {str(error)}")
        return jsonify({"error": "Erro de valor inválido", "details": str(error)}), 400

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        app.logger.error(f"HTTP Exception: {error.description}")
        return jsonify({"error": error.description}), error.code

    @app.errorhandler(Exception)
    def handle_general_exception(error):
        app.logger.error(f"Unhandled Exception: {str(error)}")
        return jsonify({"error": "Erro interno no servidor"}), 500
