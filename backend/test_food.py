import pytest
from flask import Flask
from flask.testing import FlaskClient
from server.api.endpoints.food import food_bp

@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(food_bp)
    return app

@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()

@food_bp.route('/food/search', methods=['GET'])
def test_search_food_route(client: FlaskClient, monkeypatch):
    # Mock search_food function
    def mock_search_food(food_name):
        assert food_name == "apple"
        return {"food": "apple", "calories": 52}

    monkeypatch.setattr('server.api.external_api.fatsecret.search_food', mock_search_food)

    # Test with valid food name
    response = client.get('/food/search', query_string={"nome": "apple"})
    assert response.status_code == 200
    assert response.get_json() == {"food": "apple", "calories": 52}

    # Test with missing food name
    response_missing_name = client.get('/food/search')
    assert response_missing_name.status_code == 400
    assert response_missing_name.get_json() == {"error": "Query param 'nome' is required"}

    # Test with handling exceptions
    def mock_search_food_with_exception(food_name):
        raise Exception("An error occurred")

    monkeypatch.setattr('server.api.external_api.fatsecret.search_food', mock_search_food_with_exception)

    response_error = client.get('/food/search', query_string={"nome": "apple"})
    assert response_error.status_code == 500
    assert response_error.get_json() == {"error": "An error occurred"}