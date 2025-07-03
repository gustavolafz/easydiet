# schemas/recipe_schemas.py


from pydantic import BaseModel


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
    description: str | None = ""
    ingredients: list[Ingredient]
    public: bool = False
