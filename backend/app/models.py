from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)

class DailyReadiness(Base):
    __tablename__ = "daily_readiness"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Inputs
    sleep_hours = Column(Float)
    stress_level = Column(Integer) # 1-10
    fatigue_level = Column(Integer) # 1-10
    muscle_soreness = Column(Integer) # 1-10
    available_time = Column(Integer) # Minutes
    
    # Calculated Outputs
    readiness_score = Column(Integer)
    decision = Column(String) # TRAIN, ACTIVE_RECOVERY, REST
    explanation = Column(JSON)

class EnvironmentPolicy(Base):
    __tablename__ = "environment_policy"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime(timezone=True), server_default=func.now())
    
    # Environmental Inputs
    aqi = Column(Integer, default=50)
    temperature_celsius = Column(Float, default=25.0)
    is_heatwave = Column(Boolean, default=False)
    lockdown_status = Column(String, default="none")  # none, partial, full
    has_local_event = Column(Boolean, default=False)
    
    # Computed Constraints
    allow_outdoor = Column(Boolean, default=True)
    max_intensity_percent = Column(Integer, default=100)
    max_duration_minutes = Column(Integer, default=120)
    recommended_location = Column(String, default="any")  # any, indoor, outdoor, home
    
    # Explainability
    adjustments = Column(JSON, default=[])
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

