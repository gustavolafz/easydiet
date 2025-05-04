# server/services/auth.py
# Description: This file contains the authentication service for user registration and login.

import os
from flask import current_app
from dotenv import load_dotenv
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
            hashed_password=hashed_password,
            activityLevel=user_data["activityLevel"],
            birthDate=user_data["birthDate"],
            gender=user_data["gender"],
            goal=user_data["goal"],
            height=user_data["height"],
            weight=user_data["weight"],
        )

        # Insere o usuário no banco de dados
        result = self.db.users.insert_one(user.dict())

        # Retorna o id do usuário criado
        return {"user_id": str(result.inserted_id)}


    def login(self, user_data: dict):
        user = self.db.users.find_one({"email": user_data["email"]})
        if not user:
            raise ValueError("User not found")

        if not verify_password(user_data['password'], user["hashed_password"]):
            raise ValueError("Invalid password")

        token = self._create_token(
            data={"sub": str(user["_id"])},
            expires_delta=timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS),
        )

        # salva ou atualiza o token no banco
        self.db.tokens.update_one(
            {"user_id": str(user["_id"])},
            {"$set": {
                "refresh_token": token,
                "expires_at": datetime.utcnow() + timedelta(days=self.ACCESS_TOKEN_EXPIRE_DAYS)
            }},
            upsert=True
        )

        return {"token": token, "token_type": "refresh"}

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
