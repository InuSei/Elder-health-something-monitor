
from pydantic import BaseModel, Field
from datetime import datetime

class VitalData(BaseModel):
    device_id: str
    heart_rate: int = Field(..., ge=40, le=180)
    spo2: int = Field(..., ge=70, le=100)
    timestamp: str = datetime.now().isoformat()

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