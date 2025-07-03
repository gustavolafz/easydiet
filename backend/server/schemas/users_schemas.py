# schemas/users_schemas.py

from typing import Literal

from pydantic import BaseModel, EmailStr


class UpdateUser(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

    birth_date: str  # Considerar usar date futuramente
    weight: str  # Idealmente deveria ser float
    height: str  # Idealmente deveria ser float

    gender: Literal["male", "female", "other"]
    activity_level: Literal["low", "moderate", "high"]
    goal: Literal["perda de peso", "ganho de massa", "manutenção", "melhorar saúde"]
    dietary_preference: (
        Literal["vegetariana", "vegana", "onívora", "low carb", "mediterrânea", "outro"]
        | None
    ) = None
    dietary_restriction: list
