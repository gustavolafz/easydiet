# server/models/user.py
# Description: User model for MongoDB with Pydantic validation.

from typing import Optional
from datetime import datetime
from server.db.database import get_database
from server.utils.bson_utils import PyObjectId
from pydantic import BaseModel, Field, EmailStr

class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    email: EmailStr
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.astimezone)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {PyObjectId: str}

    @classmethod
    def get_by_email(cls, email: str):
        db = get_database()
        user_data = db.users.find_one({"email": email})

        if user_data:
            return cls(**user_data)
        return None
