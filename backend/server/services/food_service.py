# services/food_service.py

import re
from datetime import datetime

from server.db.database import get_database
from server.utils.bson_utils import PyObjectId as ObjectId


class FoodService:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db["foods"]

    def parse_food_description(self, desc: str) -> dict:
        """
        Recebe a string food_description e retorna um dicionário com os nutrientes extraídos.
        """
        match = re.search(r"Per\s+(\d+)(\w+)", desc)
        amount = int(match.group(1)) if match else 100
        unit = match.group(2) if match else "g"

        def extract(pattern):
            m = re.search(pattern, desc)
            return float(m.group(1)) if m else None

        return {
            "metric_serving_amount": amount,
            "metric_serving_unit": unit,
            "calories": extract(r"Calories:\s*([\d.]+)kcal"),
            "fat": extract(r"Fat:\s*([\d.]+)g"),
            "carbohydrate": extract(r"Carbs:\s*([\d.]+)g"),
            "protein": extract(r"Protein:\s*([\d.]+)g"),
            "fiber": extract(r"Fiber:\s*([\d.]+)g"),
        }

    def create_food(self, food_data: dict):
        """
        Converte o alimento bruto da API para o modelo local e insere no banco de dados.
        """
        serving = self.parse_food_description(food_data["food_description"])

        food_doc = {
            "fatsecret_id": food_data["food_id"],
            "name": food_data["food_name"],
            "brand": None,
            "serving_sizes": [serving],
            "category": food_data.get("food_type", "Unknown"),
            "last_updated": datetime.utcnow(),
        }

        result = self.collection.insert_one(food_doc)
        return str(result.inserted_id)
