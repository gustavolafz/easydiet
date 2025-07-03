# schemas/food_schemas.py


from pydantic import BaseModel


class CreateFoodShema(BaseModel):
    fatsecret_id: str
    name: str
    category: str
    url: str
    type: str
    brand: str
    description: str
