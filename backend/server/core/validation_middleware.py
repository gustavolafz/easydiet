# core/validation_middleware.py

from functools import wraps
from typing import Any, Callable, TypeVar, cast

from flask import Response, jsonify, request
from pydantic import ValidationError

F = TypeVar("F", bound=Callable[..., Any])


def validate_json(schema: type) -> Callable[[F], F]:
    def decorator(func: F) -> F:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            try:
                data = schema(**request.json)
            except ValidationError as e:
                return jsonify({"error": "validation error", "details": str(e)}), 400
            return func(data, *args, **kwargs)

        return cast(F, wrapper)

    return decorator
