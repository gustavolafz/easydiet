import requests
from flask import Blueprint, request, jsonify
from server.api.db.database import db
from server.utils.auth import get_access_token

testeapi_bp = Blueprint('testeapi', __name__)


# Endpoint para buscar frutas na API do FatSecret
@testeapi_bp.route('/food', methods=['GET'])
def fruta():
    nome_alimento = request.args.get('nome')  # Pega a fruta da URL ?nome=Apple
    if not nome_alimento:
        return jsonify({"erro": "Nome da comida é obrigatório."}), 400

    try:
        dados = buscar_alimento(nome_alimento)
        return jsonify(dados)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500



# Função para buscar a fruta na API do FatSecret
def buscar_alimento(nome_fruta):
    access_token = get_access_token()

    url = "https://platform.fatsecret.com/rest/server.api"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    params = {
        "method": "foods.search",
        "search_expression": nome_fruta,
        "format": "json"
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Erro ao buscar fruta: {response.status_code} - {response.text}")
