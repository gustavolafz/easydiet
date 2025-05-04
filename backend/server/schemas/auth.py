# server/schemas/auth.py
# Description: This file contains the Pydantic schemas for user authentication and registration.

from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    activityLevel: str
    birthDate: str
    gender: str
    goal: str
    height: str
    weight: str

    def validate_username(cls, v: str) -> str:
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return v.lower()

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
