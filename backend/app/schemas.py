from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class DailyReadinessBase(BaseModel):
    sleep_hours: float
    stress_level: int
    fatigue_level: int
    muscle_soreness: int
    available_time: int

class DailyReadinessCreate(DailyReadinessBase):
    user_id: int

class DailyReadinessResponse(DailyReadinessBase):
    id: int
    user_id: int
    date: datetime
    readiness_score: int
    decision: str
    explanation: Dict[str, str]

    class Config:
        from_attributes = True
