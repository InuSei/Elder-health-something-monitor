
from typing import Optional
from pydantic import BaseModel, Field


class VitalData(BaseModel):
    device_id: str
    heart_rate: int = Field(..., ge=0, le=500)
    spo2: int = Field(..., ge=0, le=500)
    timestamp: Optional[str] = None

class UserSignUp(BaseModel):
    first_name: str
    last_name: str
    age: int
    birthday: str
    phone_number: str

class UserLogin(BaseModel):
    first_name: str
    last_name: str
    birthday: str

class DeviceClaim(BaseModel):
    device_id: str

class UserProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    birthday: str