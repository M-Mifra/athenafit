from typing import Dict, Tuple

def calculate_readiness(
    sleep_hours: float, 
    stress: int, 
    fatigue: int, 
    soreness: int
) -> Tuple[int, str, Dict[str, str]]:
    """
    Rule-based engine to calculate readiness and decision.
    Returns: (score, decision, explanation)
    """
    # 1. Base Score calculation (max 100)
    # Sleep: 8 hours = 40 pts, < 5 hours = 0 pts
    sleep_score = min(max((sleep_hours - 5) / 3 * 40, 0), 40)
    
    # Stress/Fatigue/Soreness: 1-10 (1 is best, 10 is worst)
    # Each contributes 20 pts max
    stress_score = (10 - stress) * 2
    fatigue_score = (10 - fatigue) * 2
    soreness_score = (10 - soreness) * 2
    
    readiness_score = int(sleep_score + stress_score + fatigue_score + soreness_score)
    
    # 2. Decision Logic & Risk Rules
    decision = "TRAIN"
    reasons = {}
    
    if sleep_hours < 5:
        decision = "REST"
        reasons["sleep"] = "Sleep is critically low (< 5h). High injury risk."
    
    if fatigue > 8 or soreness > 8:
        decision = "ACTIVE_RECOVERY" if decision != "REST" else "REST"
        reasons["fatigue_soreness"] = "High fatigue or soreness detected. Prioritize recovery."
    
    if readiness_score < 40:
        decision = "REST"
        reasons["overall"] = f"Readiness score ({readiness_score}) is too low for safe exercise."
    elif readiness_score < 65:
        if decision == "TRAIN":
            decision = "ACTIVE_RECOVERY"
            reasons["overall"] = "Moderate readiness. Low-intensity recovery suggested."
    else:
        if not reasons:
            reasons["overall"] = "Body is well-rested and ready for a standard session."

    return readiness_score, decision, reasons
