# backend/middleware.py

from flask import Response, g, jsonify, request
from jose import JWTError, jwt

from server.core.config import Config


def jwt_middleware() -> Response | tuple[Response, int] | None:
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Authorization token required"}), 401

    try:
        token = token.replace("Bearer ", "")
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        g.user_id = payload.get("sub")
    except JWTError:
        return jsonify({"error": "Invalid token"}), 403

    return None
