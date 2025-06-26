import pytest
from flask import Flask
from flask.testing import FlaskClient

from server.api.endpoints import user_bp
from server.services import UserService


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(user_bp)
    return app


@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()


@user_bp.route("/<user_id>", methods=["GET"])
def test_get_user_endpoint(client: FlaskClient, monkeypatch):
    # Mock UserService
    class MockUserService:
        def get_user_by_id(self, user_id):
            if user_id == "valid_user_id":
                return {"id": "valid_user_id", "name": "Test User"}
            raise ValueError("User not found")

    monkeypatch.setattr(UserService, "get_user_by_id", MockUserService().get_user_by_id)

    # Test with valid user ID
    response = client.get("/valid_user_id")
    assert response.status_code == 200
    assert response.get_json() == {"id": "valid_user_id", "name": "Test User"}

    # Test with invalid user ID
    response_invalid = client.get("/invalid_user_id")
    assert response_invalid.status_code == 404
    assert response_invalid.get_json() == {
        "error": "user_not_found",
        "message": "Usuário não encontrado",
    }


@user_bp.route("/<user_id>", methods=["PUT"])
def test_update_user_endpoint(client: FlaskClient, monkeypatch):
    # Mock UserService
    class MockUserService:
        def update_user(self, user_id, update_data):
            if user_id == "valid_user_id":
                return {"id": "valid_user_id", "name": update_data["name"]}
            raise ValueError("Update failed")

    monkeypatch.setattr(UserService, "update_user", MockUserService().update_user)

    # Test with valid user ID
    update_payload = {"name": "Updated User"}
    response = client.put("/valid_user_id", json=update_payload)
    assert response.status_code == 200
    assert response.get_json() == {"id": "valid_user_id", "name": "Updated User"}

    # Test with invalid user ID
    response_invalid = client.put("/invalid_user_id", json=update_payload)
    assert response_invalid.status_code == 400
    assert response_invalid.get_json() == {
        "error": "update_failed",
        "message": "Erro ao atualizar usuário",
    }


@user_bp.route("/<user_id>", methods=["DELETE"])
def test_delete_user_endpoint(client: FlaskClient, monkeypatch):
    # Mock UserService
    class MockUserService:
        def delete_user(self, user_id):
            if user_id == "valid_user_id":
                return {"message": "User deleted"}
            raise ValueError("User not found")

    monkeypatch.setattr(UserService, "delete_user", MockUserService().delete_user)

    # Test with valid user ID
    response = client.delete("/valid_user_id")
    assert response.status_code == 200
    assert response.get_json() == {"message": "User deleted"}

    # Test with invalid user ID
    response_invalid = client.delete("/invalid_user_id")
    assert response_invalid.status_code == 404
    assert response_invalid.get_json() == {
        "error": "delete_failed",
        "message": "Erro ao excluir usuário",
    }
