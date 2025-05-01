# server/utils/bson_utils.py
# Description: Utility functions for handling BSON ObjectId in Pydantic models.

from utils.bson_utils import PyObjectId as ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)
