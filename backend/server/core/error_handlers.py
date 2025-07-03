# core/error_handlers.py

from flask import Flask, Response, jsonify
from pydantic import ValidationError
from werkzeug.exceptions import HTTPException


def register_error_handlers(app: Flask) -> None:

    @app.errorhandler(ValidationError)  # type: ignore[misc]
    def handle_validation_error(error: ValidationError) -> tuple[Response, int]:
        app.logger.error(f"Validation Error: {str(error)}")
        return jsonify({"error": "Dados inválidos", "details": str(error)}), 400

    @app.errorhandler(ValueError)  # type: ignore[misc]
    def handle_value_error(error: ValueError) -> tuple[Response, int]:
        app.logger.error(f"Value Error: {str(error)}")
        return jsonify({"error": "Erro de valor inválido", "details": str(error)}), 400

    @app.errorhandler(HTTPException)  # type: ignore[misc]
    def handle_http_exception(error: HTTPException) -> tuple[Response, int]:
        app.logger.error(f"HTTP Exception: {error.description}")
        return jsonify({"error": error.description}), error.code

    @app.errorhandler(Exception)  # type: ignore[misc]
    def handle_general_exception(error: Exception) -> tuple[Response, int]:
        app.logger.error(f"Unhandled Exception: {str(error)}")
        return jsonify({"error": "Erro interno no servidor"}), 500
