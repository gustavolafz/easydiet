# server/api/endpoints/__init__.py

from .auth_endpoints import auth_bp
from .diet_endpoints import diet_bp
from .food_endpoints import food_bp
from .recipe_endpoints import recipe_bp
from .users_endpoints import user_bp

__all__ = [
    "auth_bp",
    "diet_bp",
    "food_bp",
    "recipe_bp",
    "user_bp",
]
