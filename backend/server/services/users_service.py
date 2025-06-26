# services/users_service.py

from flask import current_app

from server.db.database import get_database
from server.utils.bson_utils import PyObjectId as ObjectId


class UserService:
    def __init__(self):
        self.db = get_database()

    def get_user_by_id(self, user_id):
        try:
            user = self.db.users.find_one({"_id": ObjectId(user_id)})
            if not user:
                raise ValueError("User not found")

            return {
                "_id": str(user["_id"]),
                "username": user["username"],
                "email": user["email"],
            }
        except Exception as e:
            raise ValueError(f"error fetching user: {str(e)}")

    def get_user_by_email(self, email):
        user = self.db.users.find_one({"email": email})
        if not user:
            raise ValueError("User not found")
        return user

    def update_user(self, user_id, update_data):
        user_obj_id = ObjectId(user_id)

        if not self.db.users.find_one({"_id": user_obj_id}):
            raise ValueError("User not found")

        print(update_data)
        result = self.db.users.update_one({"_id": user_obj_id}, {"$set": update_data})

        if result.modified_count == 0:
            raise ValueError("No modifications were made")

        return {"message": "user updated successfully"}

    def delete_user(self, user_id):
        result = self.db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise ValueError("User not found")
        return {"message": "user deleted successfully"}
