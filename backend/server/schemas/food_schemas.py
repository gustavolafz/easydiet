# schemas/food_schemas.py

from typing import Optional

from pydantic import BaseModel, Field


class CreateFoodShema(BaseModel):
    fatsecret_id: str
    name: str
    category: str
    url: str
    type: str
    brand: str
    description: str
