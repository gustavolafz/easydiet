# schemas/users_schemas.py

from typing import Literal

from pydantic import BaseModel, EmailStr


class UpdateUser(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

    birth_date: str
    weight: str
    height: str

    gender: Literal["male", "female", "other"]
    activity_level: Literal["low", "moderate", "high"]
    goal: Literal["weight loss", "muscle gain", "maintenance", "improve health"]
    dietary_preference: (
        Literal["vegetarian", "vegan", "omnivore", "low carb", "mediterranean", "other"]
        | None
    ) = None
    dietary_restriction: list[str]
