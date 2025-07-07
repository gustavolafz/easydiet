# backend\server\hateoas\user_hateoas.py

def build_user_response(user: dict) -> dict:
    user_id = user.get("id") or user.get("user_id")
    return {
        **user,
        "_links": {
            "self": {"href": f"/user/{user_id}", "method": "GET"},
            "update": {"href": f"/user/{user_id}", "method": "PUT"},
            "delete": {"href": f"/user/{user_id}", "method": "DELETE"},
        }
    }
