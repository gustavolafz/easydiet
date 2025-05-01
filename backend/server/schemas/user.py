# server/schemas/user.py
# Description: This file contains the Pydantic schemas for user-related operations.

from pydantic import BaseModel, Field 
from typing import Optional 

class UpdateUser(BaseModel):
    username: Optional[str] = Field(None, min_length=3)
    email: Optional[str] = None 
