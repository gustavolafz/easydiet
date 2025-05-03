import pytest
from flask import Flask
from flask.testing import FlaskClient
from server.api.endpoints.auth import auth_bp
from server.services.auth import AuthService

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(auth_bp)
    return app

@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()

@auth_bp.route('/auth/register')
def test_register_user(client: FlaskClient, monkeypatch):
    # Mock AuthService
    class MockAuthService:
        def register(self, user_data):
            assert user_data == {"username": "testuser", "password": "testpass"}

    monkeypatch.setattr(AuthService, "register", MockAuthService().register)

    # Define a sample user data
    user_data = {
        "username": "testuser",
        "password": "testpass"
    }

    # Send a POST request to the /register endpoint
    response = client.post('/register', json=user_data)

    # Assert the response
    assert response.status_code == 201
    assert response.get_json() == {'message': 'Usuário criado com sucesso'}

@auth_bp.route('/auth/login')
def test_login_user(client: FlaskClient, monkeypatch):
    # Mock AuthService
    class MockAuthService:
        def login(self, user_data):
            assert user_data == {"username": "testuser", "password": "testpass"}
            return {"token": "mocked_token"}

    monkeypatch.setattr(AuthService, "login", MockAuthService().login)

    # Define a sample user data
    user_data = {
        "username": "testuser",
        "password": "testpass"
    }

    # Send a POST request to the /login endpoint
    response = client.post('/login', json=user_data)

    # Assert the response
    assert response.status_code == 200
    assert response.get_json() == {"token": "mocked_token"}

@auth_bp.route('/auth/verify')
def test_verify_user(client: FlaskClient, monkeypatch):
    # Mock AuthService
    class MockAuthService:
        def verify_token(self, token):
            assert token == "mocked_token"
            return {"valid": True, "user": "testuser"}

    monkeypatch.setattr(AuthService, "verify_token", MockAuthService().verify_token)

    # Define a sample payload
    valid_payload = {
        "token": "mocked_token"
    }

    # Send a POST request to the /verify endpoint with a valid token
    response = client.post('/verify', json=valid_payload)

    # Assert the response for valid token
    assert response.status_code == 200
    assert response.get_json() == {"valid": True, "user": "testuser"}

    # Test for missing token
    response_missing_token = client.post('/verify', json={})
    assert response_missing_token.status_code == 400
    assert response_missing_token.get_json() == {"error": "Token não fornecido"}