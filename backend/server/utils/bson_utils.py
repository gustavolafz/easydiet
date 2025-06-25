# server/utils/bson_utils.py
# Description: Utility functions for handling BSON ObjectId in Pydantic models.

from bson import ObjectId
from datetime import datetime

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

def convert_objectid_to_str(document):
    """
    Converte os campos ObjectId e datetime em strings ISO em um documento ou lista de documentos.
    """
    if isinstance(document, list):
        return [convert_objectid_to_str(doc) for doc in document]

    if not isinstance(document, dict):
        return document

    converted = {}
    for key, value in document.items():
        if isinstance(value, ObjectId):
            converted[key] = str(value)
        elif isinstance(value, datetime):
            converted[key] = value.isoformat()
        elif isinstance(value, list):
            converted[key] = [convert_objectid_to_str(v) for v in value]
        elif isinstance(value, dict):
            converted[key] = convert_objectid_to_str(value)
        else:
            converted[key] = value

    return converted