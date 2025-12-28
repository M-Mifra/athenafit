import json
import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import redis

from . import models, schemas, engine, database, environment_engine

# Initialize DB
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AI Exercise Personalization System")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis setup (optional, graceful fallback)
try:
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "localhost"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        db=0,
        decode_responses=True,
        socket_connect_timeout=2
    )
    redis_client.ping()
except Exception:
    redis_client = None

@app.get("/")
def root():
    return {"status": "healthy", "service": "AI Exercise Personalization System"}

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
    if redis_client:
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


# ============================================================
# ENVIRONMENT & POLICY AWARENESS ENDPOINTS
# ============================================================

@app.post("/environment-input", response_model=schemas.EnvironmentImpactResponse)
def submit_environment_input(
    data: schemas.EnvironmentInputCreate,
    db: Session = Depends(database.get_db)
):
    """
    Submit environmental and policy data.
    Returns calculated constraints and human-readable adjustments.
    """
    # Calculate impact using rule-based engine
    constraints, adjustments, severity = environment_engine.calculate_environment_impact(
        aqi=data.aqi,
        temperature_celsius=data.temperature_celsius,
        is_heatwave=data.is_heatwave,
        lockdown_status=data.lockdown_status.value,
        has_local_event=data.has_local_event
    )
    
    # Convert adjustments to dict format for JSON storage
    adjustments_dict = [
        {"rule_id": a.rule_id, "trigger": a.trigger, "action": a.action, "reason": a.reason}
        for a in adjustments
    ]
    
    # Save to database
    db_env = models.EnvironmentPolicy(
        user_id=data.user_id,
        aqi=data.aqi,
        temperature_celsius=data.temperature_celsius,
        is_heatwave=data.is_heatwave,
        lockdown_status=data.lockdown_status.value,
        has_local_event=data.has_local_event,
        allow_outdoor=constraints.allow_outdoor,
        max_intensity_percent=constraints.max_intensity_percent,
        max_duration_minutes=constraints.max_duration_minutes,
        recommended_location=constraints.recommended_location,
        adjustments=adjustments_dict
    )
    db.add(db_env)
    db.commit()
    db.refresh(db_env)
    
    # Build response with proper schema types
    return schemas.EnvironmentImpactResponse(
        id=db_env.id,
        user_id=db_env.user_id,
        date=db_env.date,
        aqi=db_env.aqi,
        temperature_celsius=db_env.temperature_celsius,
        is_heatwave=db_env.is_heatwave,
        lockdown_status=db_env.lockdown_status,
        has_local_event=db_env.has_local_event,
        constraints=schemas.WorkoutConstraints(
            allow_outdoor=constraints.allow_outdoor,
            max_intensity_percent=constraints.max_intensity_percent,
            max_duration_minutes=constraints.max_duration_minutes,
            recommended_location=schemas.RecommendedLocation(constraints.recommended_location),
            blocked_workout_types=constraints.blocked_workout_types,
            suggested_workout_types=constraints.suggested_workout_types
        ),
        adjustments=[
            schemas.EnvironmentAdjustment(
                rule_id=a.rule_id,
                trigger=a.trigger,
                action=a.action,
                reason=a.reason
            ) for a in adjustments
        ],
        severity=severity
    )

@app.get("/environment-impact/{user_id}", response_model=Optional[schemas.EnvironmentImpactResponse])
def get_environment_impact(
    user_id: int,
    db: Session = Depends(database.get_db)
):
    """
    Get the latest environment impact data for a user.
    Returns constraints and adjustments that affect workout recommendations.
    """
    # Get latest environment policy for user
    db_env = db.query(models.EnvironmentPolicy)\
        .filter(models.EnvironmentPolicy.user_id == user_id)\
        .order_by(models.EnvironmentPolicy.date.desc())\
        .first()
    
    if not db_env:
        return None
    
    # Recalculate constraints to ensure fresh data
    constraints, adjustments, severity = environment_engine.calculate_environment_impact(
        aqi=db_env.aqi,
        temperature_celsius=db_env.temperature_celsius,
        is_heatwave=db_env.is_heatwave,
        lockdown_status=db_env.lockdown_status,
        has_local_event=db_env.has_local_event
    )
    
    return schemas.EnvironmentImpactResponse(
        id=db_env.id,
        user_id=db_env.user_id,
        date=db_env.date,
        aqi=db_env.aqi,
        temperature_celsius=db_env.temperature_celsius,
        is_heatwave=db_env.is_heatwave,
        lockdown_status=db_env.lockdown_status,
        has_local_event=db_env.has_local_event,
        constraints=schemas.WorkoutConstraints(
            allow_outdoor=constraints.allow_outdoor,
            max_intensity_percent=constraints.max_intensity_percent,
            max_duration_minutes=constraints.max_duration_minutes,
            recommended_location=schemas.RecommendedLocation(constraints.recommended_location),
            blocked_workout_types=constraints.blocked_workout_types,
            suggested_workout_types=constraints.suggested_workout_types
        ),
        adjustments=[
            schemas.EnvironmentAdjustment(
                rule_id=a.rule_id,
                trigger=a.trigger,
                action=a.action,
                reason=a.reason
            ) for a in adjustments
        ],
        severity=severity
    )

@app.get("/environment-history/{user_id}", response_model=List[schemas.EnvironmentImpactResponse])
def get_environment_history(
    user_id: int,
    limit: int = 10,
    db: Session = Depends(database.get_db)
):
    """
    Get environment impact history for a user.
    """
    records = db.query(models.EnvironmentPolicy)\
        .filter(models.EnvironmentPolicy.user_id == user_id)\
        .order_by(models.EnvironmentPolicy.date.desc())\
        .limit(limit)\
        .all()
    
    results = []
    for db_env in records:
        constraints, adjustments, severity = environment_engine.calculate_environment_impact(
            aqi=db_env.aqi,
            temperature_celsius=db_env.temperature_celsius,
            is_heatwave=db_env.is_heatwave,
            lockdown_status=db_env.lockdown_status,
            has_local_event=db_env.has_local_event
        )
        
        results.append(schemas.EnvironmentImpactResponse(
            id=db_env.id,
            user_id=db_env.user_id,
            date=db_env.date,
            aqi=db_env.aqi,
            temperature_celsius=db_env.temperature_celsius,
            is_heatwave=db_env.is_heatwave,
            lockdown_status=db_env.lockdown_status,
            has_local_event=db_env.has_local_event,
            constraints=schemas.WorkoutConstraints(
                allow_outdoor=constraints.allow_outdoor,
                max_intensity_percent=constraints.max_intensity_percent,
                max_duration_minutes=constraints.max_duration_minutes,
                recommended_location=schemas.RecommendedLocation(constraints.recommended_location),
                blocked_workout_types=constraints.blocked_workout_types,
                suggested_workout_types=constraints.suggested_workout_types
            ),
            adjustments=[
                schemas.EnvironmentAdjustment(
                    rule_id=a.rule_id,
                    trigger=a.trigger,
                    action=a.action,
                    reason=a.reason
                ) for a in adjustments
            ],
            severity=severity
        ))
    
    return results


# ============================================================
# COMBINED READINESS + ENVIRONMENT ENDPOINT
# ============================================================

@app.post("/combined-readiness/", response_model=schemas.CombinedReadinessResponse)
def get_combined_readiness(
    data: schemas.CombinedReadinessRequest,
    db: Session = Depends(database.get_db)
):
    """
    Combined endpoint that calculates readiness and applies environmental constraints.
    Returns the final decision with full explainability.
    """
    # 1. Calculate base readiness
    readiness_score, base_decision, readiness_explanation = engine.calculate_readiness(
        data.sleep_hours,
        data.stress_level,
        data.fatigue_level,
        data.muscle_soreness
    )
    
    # 2. Apply time constraint
    if base_decision == "TRAIN" and data.available_time < 30:
        base_decision = "ACTIVE_RECOVERY"
        readiness_explanation["time_constraint"] = "Time is limited (<30m). Short recovery session recommended."
    
    # 3. Calculate environment impact
    constraints, adjustments, severity = environment_engine.calculate_environment_impact(
        aqi=data.aqi,
        temperature_celsius=data.temperature_celsius,
        is_heatwave=data.is_heatwave,
        lockdown_status=data.lockdown_status.value,
        has_local_event=data.has_local_event
    )
    
    # 4. Apply environment constraints to decision
    final_decision = environment_engine.apply_environment_to_readiness(
        base_decision=base_decision,
        readiness_score=readiness_score,
        constraints=constraints,
        severity=severity
    )
    
    # 5. Store both records
    # Store readiness
    db_readiness = models.DailyReadiness(
        user_id=data.user_id,
        sleep_hours=data.sleep_hours,
        stress_level=data.stress_level,
        fatigue_level=data.fatigue_level,
        muscle_soreness=data.muscle_soreness,
        available_time=data.available_time,
        readiness_score=readiness_score,
        decision=final_decision,
        explanation=environment_engine.get_combined_explanation(readiness_explanation, adjustments)
    )
    db.add(db_readiness)
    
    # Store environment
    adjustments_dict = [
        {"rule_id": a.rule_id, "trigger": a.trigger, "action": a.action, "reason": a.reason}
        for a in adjustments
    ]
    db_env = models.EnvironmentPolicy(
        user_id=data.user_id,
        aqi=data.aqi,
        temperature_celsius=data.temperature_celsius,
        is_heatwave=data.is_heatwave,
        lockdown_status=data.lockdown_status.value,
        has_local_event=data.has_local_event,
        allow_outdoor=constraints.allow_outdoor,
        max_intensity_percent=constraints.max_intensity_percent,
        max_duration_minutes=constraints.max_duration_minutes,
        recommended_location=constraints.recommended_location,
        adjustments=adjustments_dict
    )
    db.add(db_env)
    db.commit()
    
    # 6. Return combined response
    return schemas.CombinedReadinessResponse(
        readiness_score=readiness_score,
        base_decision=base_decision,
        final_decision=final_decision,
        readiness_explanation=readiness_explanation,
        environment_adjustments=[
            schemas.EnvironmentAdjustment(
                rule_id=a.rule_id,
                trigger=a.trigger,
                action=a.action,
                reason=a.reason
            ) for a in adjustments
        ],
        constraints=schemas.WorkoutConstraints(
            allow_outdoor=constraints.allow_outdoor,
            max_intensity_percent=constraints.max_intensity_percent,
            max_duration_minutes=constraints.max_duration_minutes,
            recommended_location=schemas.RecommendedLocation(constraints.recommended_location),
            blocked_workout_types=constraints.blocked_workout_types,
            suggested_workout_types=constraints.suggested_workout_types
        ),
        environment_severity=severity
    )
