# server/services/auth.py
# Description: This file contains the authentication service for user registration and login.

from jose import jwt, JWTError
from server.models.user import UserModel
from datetime import datetime, timedelta
from server.utils.bson_utils import PyObjectId as ObjectId
from server.core.security import hash_password, verify_password
from server.db.database import get_database
from server.core.config import Config

class AuthService:
    def __init__(self):
        self.db = get_database()
        self.ACCESS_TOKEN_EXPIRE_DAYS = 7
        self.SECRET_KEY = Config.JWT_SECRET

    def _get_user_by_id(self, user_id: str):
        return self.db.users.find_one({
            "_id": ObjectId(user_id)
        })

    def register(self, user_data: dict):
        # Verifica se o email já está registrado
        existing_user = self.db.users.find_one({"email": user_data["email"]})
        if existing_user:
            raise ValueError("User with this email already exists")

        # Faz o hash da senha
        hashed_password = hash_password(user_data["password"])

        # Cria o usuário com todos os campos obrigatórios
        user = UserModel(
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            email=user_data["email"],
            password=hashed_password,
            activity_level=user_data["activity_level"],
            birth_date=user_data["birth_date"],
            gender=user_data["gender"],
            goal=user_data["goal"],
            height=user_data["height"],
            weight=user_data["weight"],
        )

        # Remove o campo 'id' para não sobrescrever o _id do MongoDB
        result = self.db.users.insert_one(user.dict(by_alias=True, exclude={"id"}))

        # Retorna o id do usuário criado
        return {"user_id": str(result.inserted_id)}


    def login(self, user_data: dict):
        user = self.db.users.find_one({"email": user_data["email"]})
        if not user:
            raise ValueError("User not found")

        if not verify_password(user_data['password'], user["password"]):
            raise ValueError("Invalid password")

        token = self._create_token(
            data={"sub": str(user["_id"])},
            expires_delta=timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS),
        )

        expires_at = datetime.utcnow() + timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS)

        # salva ou atualiza o token no banco
        self.db.tokens.update_one(
            {"user_id": str(user["_id"])},
            {"$set": {
                "refresh_token": token,
                "expires_at": expires_at
            }},
            upsert=True
        )

        return {
        "user": {k: str(v) for k, v in user.items() if k != "password"},
        "token": {
            "access_token": token,
            "token_type": "bearer",
            "expires_at": expires_at
        }
}

    def _create_token(self, data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.SECRET_KEY, algorithm="HS256")

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("sub")
            if user_id is None:
                raise ValueError("Invalid token")

            # checar se o token ainda está registrado no banco
            token_record = self.db.tokens.find_one({
                "user_id": user_id,
                "refresh_token": token
            })

            if not token_record:
                raise ValueError("Token not found or revoked")

            if token_record["expires_at"] < datetime.utcnow():
                raise ValueError("Token expired")

            return True
        except JWTError:
            raise ValueError("Invalid token")
