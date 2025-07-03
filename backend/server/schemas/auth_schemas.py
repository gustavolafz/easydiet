# backend/server/schemas/auth_schemas.py

from typing import Literal

from pydantic import BaseModel, EmailStr


class UserCreateSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

    birth_date: str
    weight: str
    height: str

    gender: Literal["male", "female", "other"]
    activity_level: Literal["low", "moderate", "high"]
    goal: Literal["weight_loss", "muscle_gain", "maintenance", "improve_health"]
    dietary_preference: (
        Literal[
            "vegetarian",
            "vegan",
            "omnivore",
            "low_carb",
            "mediterranean",
            "other",
        ]
        | None
    ) = None
    dietary_restriction: list[str] = []

    def validate_username(cls, v: str) -> str:
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return v.lower()


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
