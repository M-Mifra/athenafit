from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
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
