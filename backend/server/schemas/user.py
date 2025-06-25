# server/schemas/user.py
# Description: This file contains the Pydantic schemas for user-related operations.

from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional

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
    dietary_preference: Optional[Literal[
        "vegetariana", "vegana", "onívora", "low carb", "mediterrânea", "outro"
    ]] = None
    dietary_restriction: list