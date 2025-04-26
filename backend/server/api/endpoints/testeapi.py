from flask import Blueprint, request, jsonify
import requests
from server.utils.auth import get_access_token

testeapi_bp = Blueprint('testeapi', __name__)


# Endpoint para buscar frutas na API do FatSecret
@testeapi_bp.route('/fruta', methods=['GET'])
def fruta():
    fruta_nome = request.args.get('nome')  # Pega a fruta da URL ?nome=Apple
    if not fruta_nome:
        return jsonify({"erro": "Nome da fruta é obrigatório."}), 400

    try:
        dados = buscar_fruta(fruta_nome)
        return jsonify(dados)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500



# Função para buscar a fruta na API do FatSecret
def buscar_fruta(nome_fruta):
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
