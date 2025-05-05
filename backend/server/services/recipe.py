from datetime import datetime
from bson import ObjectId
from server.db.database import get_database
from server.services.food import FoodService

class RecipeService:
    def __init__(self):
        self.db = get_database()
        self.food_service = FoodService()

    def calculate_total_nutrients(self, ingredients):
        total = {
            "calories": 0.0,
            "carbohydrate": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0
        }

        for item in ingredients:
            food = self.db.foods.find_one({"_id": ObjectId(item["food_id"])})
            if not food:
                continue

            serving = food["serving_sizes"][0]  # assume primeira porção
            factor = item["quantity"] / serving["metric_serving_amount"]

            total["calories"] += serving["calories"] * factor
            total["carbohydrate"] += serving["carbohydrate"] * factor
            total["protein"] += serving["protein"] * factor
            total["fat"] += serving["fat"] * factor
            total["fiber"] += serving["fiber"] * factor

        return {k: round(v, 2) for k, v in total.items()}
    
    def get_recipes_by_user(self, user_id):
        try:
            recipes = self.db.recipes.find({"user_id": ObjectId(user_id)})
            result = []
            for recipe in recipes:
                # Convertendo food_id de cada ingrediente para string
                ingredients = [
                    {
                        **ingredient,
                        "food_id": str(ingredient["food_id"])
                    } for ingredient in recipe["ingredients"]
                ]

                result.append({
                    "id": str(recipe["_id"]),
                    "title": recipe["title"],
                    "description": recipe["description"],
                    "ingredients": ingredients,
                    "total_nutrients": recipe["total_nutrients"],
                    "created_at": recipe["created_at"],
                    "public": recipe["public"]
                })
            return result
        except Exception as e:
            raise Exception(f"Error fetching recipes: {str(e)}")
        
    def update_recipe(self, recipe_id, data):
        try:
            recipe = self.db.recipes.find_one({"_id": ObjectId(recipe_id)})
            if not recipe:
                raise Exception("Recipe not found")

            updated_recipe = {
                "title": data.get("title", recipe["title"]),
                "description": data.get("description", recipe["description"]),
                "ingredients": data.get("ingredients", recipe["ingredients"]),
                "total_nutrients": data.get("total_nutrients", recipe["total_nutrients"]),
                "public": data.get("public", recipe["public"]),
                "created_at": recipe["created_at"]
            }

            self.db.recipes.update_one({"_id": ObjectId(recipe_id)}, {"$set": updated_recipe})
            return {"message": "Recipe updated successfully"}
        except Exception as e:
            raise Exception(f"Error updating recipe: {str(e)}")
        
    def delete_recipe(self, recipe_id):
        try:
            recipe = self.db.recipes.find_one({"_id": ObjectId(recipe_id)})
            if not recipe:
                raise Exception("Recipe not found")
            self.db.recipes.delete_one({"_id": ObjectId(recipe_id)})
            return {"message": "Recipe deleted successfully"}
        except Exception as e:
            raise Exception(f"Error deleting recipe: {str(e)}")
        

    def create_recipe(self, data: dict):
        ingredients = data["ingredients"]
        nutrients = self.calculate_total_nutrients(ingredients)

        recipe = {
            "user_id": ObjectId(data["user_id"]),
            "title": data["title"],
            "description": data.get("description", ""),
            "ingredients": [
                {
                    "food_id": ObjectId(i["food_id"]),
                    "quantity": i["quantity"],
                    "unit": i["unit"]
                } for i in ingredients
            ],
            "total_nutrients": nutrients,
            "created_at": datetime.utcnow(),
            "public": data.get("public", False)
        }

        result = self.db.recipes.insert_one(recipe)
        return str(result.inserted_id)
