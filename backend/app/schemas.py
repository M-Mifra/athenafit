from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum

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

class LockdownStatus(str, Enum):
    NONE = "none"
    PARTIAL = "partial"
    FULL = "full"

class RecommendedLocation(str, Enum):
    ANY = "any"
    INDOOR = "indoor"
    OUTDOOR = "outdoor"
    HOME = "home"

class EnvironmentInputCreate(BaseModel):
    user_id: int
    aqi: int = Field(default=50, ge=0, le=500, description="Air Quality Index (0-500)")
    temperature_celsius: float = Field(default=25.0, ge=-50, le=60, description="Temperature in Celsius")
    is_heatwave: bool = Field(default=False, description="Whether a heatwave is active")
    lockdown_status: LockdownStatus = Field(default=LockdownStatus.NONE, description="Current lockdown status")
    has_local_event: bool = Field(default=False, description="Whether there's a local event affecting safety")

class WorkoutConstraints(BaseModel):
    allow_outdoor: bool = True
    max_intensity_percent: int = Field(default=100, ge=0, le=100)
    max_duration_minutes: int = Field(default=120, ge=0)
    recommended_location: RecommendedLocation = RecommendedLocation.ANY
    blocked_workout_types: List[str] = []
    suggested_workout_types: List[str] = []

class EnvironmentAdjustment(BaseModel):
    rule_id: str
    trigger: str
    action: str
    reason: str

class EnvironmentImpactResponse(BaseModel):
    id: int
    user_id: int
    date: datetime
    aqi: int
    temperature_celsius: float
    is_heatwave: bool
    lockdown_status: str
    has_local_event: bool
    constraints: WorkoutConstraints
    adjustments: List[EnvironmentAdjustment]
    severity: str  # low, moderate, high, critical

    class Config:
        from_attributes = True

class CombinedReadinessRequest(BaseModel):
    user_id: int
    sleep_hours: float
    stress_level: int
    fatigue_level: int
    muscle_soreness: int
    available_time: int
    aqi: int = 50
    temperature_celsius: float = 25.0
    is_heatwave: bool = False
    lockdown_status: LockdownStatus = LockdownStatus.NONE
    has_local_event: bool = False

class CombinedReadinessResponse(BaseModel):
    readiness_score: int
    base_decision: str
    final_decision: str
    readiness_explanation: Dict[str, str]
    environment_adjustments: List[EnvironmentAdjustment]
    constraints: WorkoutConstraints
    environment_severity: str

