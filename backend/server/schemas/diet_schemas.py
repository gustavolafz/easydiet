# schemas/diet_schemas.py


from pydantic import BaseModel, Field


class RecipeReference(BaseModel):
    recipe_id: str
    quantity: int = Field(gt=0)


class Meal(BaseModel):
    name: str
    time: str  # HH:mm
    recipes: list[RecipeReference]


class CreateDietSchema(BaseModel):
    user_id: str
    title: str
    description: str
    meals: list[Meal]
    public: bool = False
