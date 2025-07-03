# services/diet_service.py

from datetime import datetime
from typing import Any

from bson import ObjectId

from server.db.database import get_database


class DietService:
    def __init__(self) -> None:
        self.db = get_database()
        self.recipe_collection = self.db["recipes"]
        self.diet_collection = self.db["diets"]

    def create_diet(self, diet_data: dict[str, Any]) -> dict[str, Any]:
        total_nutrients: dict[str, float] = {
            "calories": 0,
            "carbohydrate": 0,
            "protein": 0,
            "fat": 0,
            "fiber": 0,
        }

        for meal in diet_data["meals"]:
            for recipe_ref in meal["recipes"]:
                recipe = self.recipe_collection.find_one(
                    {"_id": ObjectId(recipe_ref["recipe_id"])}
                )
                if not recipe:
                    raise ValueError(f"Recipe {recipe_ref['recipe_id']} not found")

                qty = recipe_ref["quantity"]
                nutrients = recipe.get("total_nutrients", {})
                for key in total_nutrients:
                    total_nutrients[key] += nutrients.get(key, 0) * qty

        diet_doc: dict[str, Any] = {
            "user_id": ObjectId(diet_data["user_id"]),
            "title": diet_data["title"],
            "description": diet_data["description"],
            "meals": diet_data["meals"],
            "public": diet_data.get("public", False),
            "total_nutrients": total_nutrients,
            "created_at": datetime.utcnow(),
        }

        result = self.diet_collection.insert_one(diet_doc)
        diet_doc["_id"] = result.inserted_id
        return diet_doc

    def get_diet_by_id(self, diet_id: str) -> dict[str, Any]:
        diet = self.diet_collection.find_one({"_id": ObjectId(diet_id)})
        if not diet:
            raise ValueError(f"Diet with ID {diet_id} not found")

        diet["_id"] = str(diet["_id"])
        diet["user_id"] = str(diet["user_id"])

        for meal in diet.get("meals", []):
            for recipe in meal.get("recipes", []):
                if isinstance(recipe["recipe_id"], ObjectId):
                    recipe["recipe_id"] = str(recipe["recipe_id"])

        return diet

    def get_diets_by_user_id(self, user_id: str) -> list[dict[str, Any]]:
        diets = list(self.diet_collection.find({"user_id": ObjectId(user_id)}))
        if not diets:
            return []

        for diet in diets:
            diet["_id"] = str(diet["_id"])
            diet["user_id"] = str(diet["user_id"])
            for meal in diet.get("meals", []):
                for recipe in meal.get("recipes", []):
                    if isinstance(recipe["recipe_id"], ObjectId):
                        recipe["recipe_id"] = str(recipe["recipe_id"])

        return diets

    def update_diet(self, diet_id: str, diet_data: dict[str, Any]) -> dict[str, Any]:
        diet = self.diet_collection.find_one({"_id": ObjectId(diet_id)})
        if not diet:
            raise ValueError(f"Diet with ID {diet_id} not found")

        total_nutrients: dict[str, float] = {
            "calories": 0,
            "carbohydrate": 0,
            "protein": 0,
            "fat": 0,
            "fiber": 0,
        }

        for meal in diet_data["meals"]:
            for recipe_ref in meal["recipes"]:
                recipe = self.recipe_collection.find_one(
                    {"_id": ObjectId(recipe_ref["recipe_id"])}
                )
                if not recipe:
                    raise ValueError(f"Recipe {recipe_ref['recipe_id']} not found")

                qty = recipe_ref["quantity"]
                nutrients = recipe.get("total_nutrients", {})
                for key in total_nutrients:
                    total_nutrients[key] += nutrients.get(key, 0) * qty

        updated_diet: dict[str, Any] = {
            "title": diet_data["title"],
            "description": diet_data["description"],
            "meals": diet_data["meals"],
            "public": diet_data.get("public", diet["public"]),
            "total_nutrients": total_nutrients,
        }

        self.diet_collection.update_one(
            {"_id": ObjectId(diet_id)}, {"$set": updated_diet}
        )

        updated = self.diet_collection.find_one({"_id": ObjectId(diet_id)})

        updated["_id"] = str(updated["_id"])
        updated["user_id"] = str(updated["user_id"])
        for meal in updated.get("meals", []):
            for recipe in meal.get("recipes", []):
                if isinstance(recipe["recipe_id"], ObjectId):
                    recipe["recipe_id"] = str(recipe["recipe_id"])

        return updated

    def delete_diet(self, diet_id: str) -> dict[str, str]:
        result = self.diet_collection.delete_one({"_id": ObjectId(diet_id)})
        if result.deleted_count == 0:
            raise ValueError(f"Diet with ID {diet_id} not found")
        return {"message": "Diet successfully deleted"}
