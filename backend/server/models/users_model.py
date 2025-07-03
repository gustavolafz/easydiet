# backend/server/models/users_model.py

from datetime import datetime
from typing import Optional

import pytz
from pydantic import BaseModel, EmailStr, Field

from server.db.database import get_database
from server.utils.bson_utils import PyObjectId


class UserModel(BaseModel):
    id: PyObjectId | None = Field(default=None, alias="_id")
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    activity_level: str
    birth_date: str
    gender: str
    goal: str
    height: str
    weight: str
    dietary_preference: str
    dietary_restriction: list[str] = Field(default_factory=list)
    created_at: datetime = Field(
        default_factory=lambda: datetime.utcnow().replace(tzinfo=pytz.utc)
    )

    class Config:
        validate_by_name = True
        populate_by_name = True
        json_encoders = {PyObjectId: str}

    @classmethod
    def get_by_email(cls, email: str) -> Optional["UserModel"]:
        db = get_database()
        user_data = db.users.find_one({"email": email})
        if user_data:
            return cls(**user_data)
        return None
