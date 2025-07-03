# utils/bson_utils.py

from collections.abc import Iterator
from datetime import datetime
from typing import Any

from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls) -> Iterator[Any]:
        yield cls.validate

    @classmethod
    def validate(cls, v: Any) -> str:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)


def convert_objectid_to_str(document: Any) -> Any:
    """
    Converts ObjectId and datetime fields to ISO strings in a document or a list of documents.
    """
    if isinstance(document, list):
        return [convert_objectid_to_str(doc) for doc in document]

    if not isinstance(document, dict):
        return document

    converted: dict[Any, Any] = {}
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
