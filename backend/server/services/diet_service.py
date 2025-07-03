# backend/server/services/diet_service.py

from datetime import datetime
from typing import Any, cast

from bson import ObjectId

from server.db.database import get_database


class DietService:
    def __init__(self) -> None:
        self.db = get_database()
        self.recipe_collection = self.db["recipes"]
        self.diet_collection = self.db["diets"]

    def create_diet(self, diet_data: dict[str, Any]) -> dict[str, Any]:
        total_nutrients: dict[str, float] = {
            "calories": 0.0,
            "carbohydrate": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
        }

        for meal in diet_data["meals"]:
            for recipe_ref in meal["recipes"]:
                recipe = self.recipe_collection.find_one(
                    {"_id": ObjectId(recipe_ref["recipe_id"])}
                )
                if recipe is None:
                    raise ValueError(f"Recipe {recipe_ref['recipe_id']} not found")

                quantity = recipe_ref["quantity"]
                nutrients = recipe.get("total_nutrients", {})
                for key in total_nutrients:
                    total_nutrients[key] += nutrients.get(key, 0.0) * quantity

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
        raw = self.diet_collection.find_one({"_id": ObjectId(diet_id)})
        if raw is None:
            raise ValueError(f"Diet with ID {diet_id} not found")

        diet = cast(dict[str, Any], raw)
        diet["_id"] = str(diet["_id"])
        diet["user_id"] = str(diet["user_id"])

        for meal in diet.get("meals", []):
            for recipe in meal.get("recipes", []):
                if isinstance(recipe["recipe_id"], ObjectId):
                    recipe["recipe_id"] = str(recipe["recipe_id"])

        return diet

    def get_diets_by_user_id(self, user_id: str) -> list[dict[str, Any]]:
        raw_list = list(self.diet_collection.find({"user_id": ObjectId(user_id)}))
        if not raw_list:
            return []

        diets: list[dict[str, Any]] = []
        for raw in raw_list:
            diet = cast(dict[str, Any], raw)
            diet["_id"] = str(diet["_id"])
            diet["user_id"] = str(diet["user_id"])
            for meal in diet.get("meals", []):
                for recipe in meal.get("recipes", []):
                    if isinstance(recipe["recipe_id"], ObjectId):
                        recipe["recipe_id"] = str(recipe["recipe_id"])
            diets.append(diet)

        return diets

    def update_diet(self, diet_id: str, diet_data: dict[str, Any]) -> dict[str, Any]:
        existing = self.diet_collection.find_one({"_id": ObjectId(diet_id)})
        if existing is None:
            raise ValueError(f"Diet with ID {diet_id} not found")

        total_nutrients: dict[str, float] = {
            "calories": 0.0,
            "carbohydrate": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
        }

        for meal in diet_data["meals"]:
            for recipe_ref in meal["recipes"]:
                recipe = self.recipe_collection.find_one(
                    {"_id": ObjectId(recipe_ref["recipe_id"])}
                )
                if recipe is None:
                    raise ValueError(f"Recipe {recipe_ref['recipe_id']} not found")

                quantity = recipe_ref["quantity"]
                nutrients = recipe.get("total_nutrients", {})
                for key in total_nutrients:
                    total_nutrients[key] += nutrients.get(key, 0.0) * quantity

        updates: dict[str, Any] = {
            "title": diet_data["title"],
            "description": diet_data["description"],
            "meals": diet_data["meals"],
            "public": diet_data.get("public", existing.get("public", False)),
            "total_nutrients": total_nutrients,
        }

        self.diet_collection.update_one({"_id": ObjectId(diet_id)}, {"$set": updates})

        raw_updated = self.diet_collection.find_one({"_id": ObjectId(diet_id)})
        if raw_updated is None:
            raise RuntimeError(f"Failed to retrieve updated diet {diet_id}")

        updated = cast(dict[str, Any], raw_updated)
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
