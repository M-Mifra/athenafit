import json
import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import redis

from . import models, schemas, engine, database

# Initialize DB
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Exercise Personalization System")

# Redis setup
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    db=0,
    decode_responses=True
)

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(username=user.username, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/readiness/", response_model=schemas.DailyReadinessResponse)
def submit_readiness(
    data: schemas.DailyReadinessCreate, 
    db: Session = Depends(database.get_db)
):
    # 1. Check Cache
    cache_key = f"readiness:{data.user_id}:{database.func.now().date()}"
    # Note: In a real app, date logic would be more robust
    
    # 2. Calculate using Engine
    score, decision, explanation = engine.calculate_readiness(
        data.sleep_hours,
        data.stress_level,
        data.fatigue_level,
        data.muscle_soreness
    )
    
    # 3. Simple Constraint Optimization (Step 9)
    if decision == "TRAIN" and data.available_time < 30:
        decision = "ACTIVE_RECOVERY"
        explanation["time_constraint"] = "Time is limited (<30m). Short recovery session recommended."

    # 4. Save to DB
    db_readiness = models.DailyReadiness(
        **data.dict(),
        readiness_score=score,
        decision=decision,
        explanation=explanation
    )
    db.add(db_readiness)
    db.commit()
    db.refresh(db_readiness)
    
    # 5. Update Cache
    try:
        redis_client.setex(
            f"user_last_decision:{data.user_id}", 
            86400, # 24h
            json.dumps({"decision": decision, "score": score})
        )
    except Exception:
        pass # Allow DB success even if Redis fails
        
    return db_readiness

@app.get("/readiness/{user_id}", response_model=List[schemas.DailyReadinessResponse])
def get_user_history(user_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.DailyReadiness).filter(models.DailyReadiness.user_id == user_id).all()
