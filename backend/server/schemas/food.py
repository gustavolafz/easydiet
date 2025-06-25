# server/schemas/food.py
# Description: This file contains the Pydantic schemas for food-related operations.

from pydantic import BaseModel, Field 
from typing import Optional 

class CreateFoodShema(BaseModel):
    fatsecret_id : str
    name : str
    category: str
    url : str
    type : str
    brand : str
    description: str