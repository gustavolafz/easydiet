# server/schemas/auth.py
# Description: This file contains the Pydantic schemas for user authentication and registration.

from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    username: str 
    email: EmailStr
    password: str 

    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return v.lower()

class UserLoginSchema(BaseModel):
    email: str 
    password: str 
