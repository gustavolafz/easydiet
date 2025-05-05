from bson import ObjectId
from datetime import datetime

def bson_to_json(data):
    if isinstance(data, list):
        return [bson_to_json(item) for item in data]
    elif isinstance(data, dict):
        return {
            key: bson_to_json(value)
            for key, value in data.items()
        }
    elif isinstance(data, ObjectId):
        return str(data)
    elif isinstance(data, datetime):
        return data.isoformat()
    else:
        return data