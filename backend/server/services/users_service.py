# backend/server/services/users_service.py

from typing import Any, cast

from server.db.database import get_database
from server.utils.bson_utils import PyObjectId as ObjectId


class UserService:
    def __init__(self) -> None:
        self.db = get_database()

    def get_user_by_id(self, user_id: str) -> dict[str, str]:
        try:
            raw = self.db.users.find_one({"_id": ObjectId(user_id)})
            if raw is None:
                raise ValueError(f"User with ID {user_id} not found")

            user = cast(dict[str, Any], raw)
            return {
                "_id": str(user["_id"]),
                "username": user["username"],
                "email": user["email"],
            }
        except Exception as e:
            raise ValueError(f"Error fetching user: {e}") from e

    def get_user_by_email(self, email: str) -> dict[str, Any] | None:
        raw = self.db.users.find_one({"email": email})
        if raw is None:
            return None

        user = cast(dict[str, Any], raw)
        user["_id"] = str(user["_id"])
        return user

    def update_user(self, user_id: str, update_data: dict[str, Any]) -> dict[str, str]:
        user_obj_id = ObjectId(user_id)

        if not self.db.users.find_one({"_id": user_obj_id}):
            raise ValueError(f"User with ID {user_id} not found")

        result = self.db.users.update_one({"_id": user_obj_id}, {"$set": update_data})

        if result.modified_count == 0:
            raise ValueError("No modifications were made")

        return {"message": "User updated successfully"}

    def delete_user(self, user_id: str) -> dict[str, str]:
        result = self.db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise ValueError(f"User with ID {user_id} not found")
        return {"message": "User deleted successfully"}
