from typing import Optional
from datetime import datetime
from server.db.database import get_database
from server.utils.bson_utils import PyObjectId
from pydantic import BaseModel, Field, EmailStr
import pytz

class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
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
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow().replace(tzinfo=pytz.utc))

    class Config:
        allow_population_by_field_name = True
        json_encoders = {PyObjectId: str}
        populate_by_name = True  # Isso ajuda a respeitar o alias na hora de criar o objeto


    @classmethod
    def get_by_email(cls, email: str):
        db = get_database()  # Corrigido de get_client() para get_database()
        user_data = db.users.find_one({"email": email})

        if user_data:
            return cls(**user_data)
        return None
