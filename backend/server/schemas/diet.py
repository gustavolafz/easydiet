from pydantic import BaseModel, Field
from typing import List, Literal
from bson import ObjectId

class RecipeReference(BaseModel):
    recipe_id: str
    quantity: int = Field(gt=0)

class Meal(BaseModel):
    name: str
    time: str  # HH:mm
    recipes: List[RecipeReference]

class CreateDietSchema(BaseModel):
    user_id: str
    title: str
    description: str
    meals: List[Meal]
    public: bool = False
