# schemas/recipe_schemas.py

from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class Ingredient(BaseModel):
    food_id: str
    quantity: float
    unit: str


class Nutrients(BaseModel):
    calories: float
    carbohydrate: float
    protein: float
    fat: float
    fiber: float


class CreateRecipe(BaseModel):
    user_id: str
    title: str
    description: Optional[str] = ""
    ingredients: List[Ingredient]
    public: bool = False
