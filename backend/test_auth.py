from unittest.mock import MagicMock, patch

import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@patch(
    "server.api.endpoints.auth.AuthService.__init__", return_value=None
)  # deve retornar None!
@patch("server.api.endpoints.auth.AuthService.register")
def test_register_user(mock_register, mock_init, client):
    mock_register.return_value = {"user_id": "mocked_id"}

    user_data = {
        "first_name": "Teste",
        "last_name": "Henrique",
        "email": "teste@al.insper.edu.br",
        "password": "tfhSalIe",
        "activity_level": "Moderado",
        "birth_date": "1999-07-15",
        "gender": "Masculino",
        "goal": "Ganhar massa muscular",
        "height": "1.75",
        "weight": "70",
    }

    response = client.post("/auth/register", json=user_data)

    assert response.status_code == 201
    assert response.get_json() == {"message": "Usuário criado com sucesso"}


@patch(
    "server.api.endpoints.auth.AuthService.__init__", return_value=None
)  # deve retornar None!
@patch("server.api.endpoints.auth.AuthService.login")
def test_login_user(mock_register, mock_init, client):
    mock_register.return_value = {"user_id": "mocked_id"}

    user_data = {"email": "teste@al.insper.edu.br", "password": "tfhSalIe"}

    response = client.post("/auth/login", json=user_data)

    assert response.status_code == 200
