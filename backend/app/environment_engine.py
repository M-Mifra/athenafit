from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class EnvironmentAdjustment:
    rule_id: str
    trigger: str
    action: str
    reason: str

@dataclass
class WorkoutConstraints:
    allow_outdoor: bool = True
    max_intensity_percent: int = 100
    max_duration_minutes: int = 120
    recommended_location: str = "any"
    blocked_workout_types: List[str] = None
    suggested_workout_types: List[str] = None

    def __post_init__(self):
        if self.blocked_workout_types is None:
            self.blocked_workout_types = []
        if self.suggested_workout_types is None:
            self.suggested_workout_types = []

AQI_THRESHOLDS = {
    "good": (0, 50),
    "moderate": (51, 100),
    "unhealthy_sensitive": (101, 150),
    "unhealthy": (151, 200),
    "very_unhealthy": (201, 300),
    "hazardous": (301, 500)
}

TEMP_THRESHOLDS = {
    "cold_extreme": (-50, 0),
    "cold": (0, 10),
    "cool": (10, 18),
    "comfortable": (18, 28),
    "warm": (28, 35),
    "hot": (35, 38),
    "extreme_hot": (38, 60)
}

def calculate_environment_impact(
    aqi: int,
    temperature_celsius: float,
    is_heatwave: bool,
    lockdown_status: str,
    has_local_event: bool
) -> Tuple[WorkoutConstraints, List[EnvironmentAdjustment], str]:
    constraints = WorkoutConstraints()
    adjustments: List[EnvironmentAdjustment] = []
    severity_scores = []

    # === RULE 1: AQI Rules ===
    if aqi > 300:
        constraints.allow_outdoor = False
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 50)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 30)
        constraints.recommended_location = "indoor"
        constraints.blocked_workout_types.extend(["outdoor_running", "cycling", "hiking", "outdoor_sports"])
        constraints.suggested_workout_types.extend(["indoor_yoga", "light_stretching", "indoor_strength"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="AQI_HAZARDOUS",
            trigger=f"AQI is hazardous ({aqi})",
            action="Block all outdoor workouts, reduce intensity to 50%, limit duration to 30min",
            reason=f"Air quality is hazardous (AQI {aqi}). Outdoor exercise poses severe health risks including respiratory damage."
        ))
        severity_scores.append(4)
    elif aqi > 200:
        constraints.allow_outdoor = False
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 60)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 45)
        constraints.recommended_location = "indoor"
        constraints.blocked_workout_types.extend(["outdoor_running", "cycling", "hiking"])
        constraints.suggested_workout_types.extend(["indoor_cardio", "swimming_indoor", "yoga"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="AQI_VERY_UNHEALTHY",
            trigger=f"AQI is very unhealthy ({aqi})",
            action="Block outdoor workouts, reduce intensity to 60%, limit duration to 45min",
            reason=f"Air quality is very unhealthy (AQI {aqi}). Avoid all outdoor activities to prevent respiratory issues."
        ))
        severity_scores.append(3)
    elif aqi > 150:
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 70)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 60)
        constraints.recommended_location = "indoor"
        constraints.blocked_workout_types.extend(["high_intensity_outdoor", "long_distance_running"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="AQI_UNHEALTHY",
            trigger=f"AQI is unhealthy ({aqi})",
            action="Reduce intensity to 70%, limit duration to 60min, prefer indoor",
            reason=f"Air quality is unhealthy (AQI {aqi}). Outdoor high-intensity exercise may cause respiratory discomfort."
        ))
        severity_scores.append(2)
    elif aqi > 100:
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 85)
        adjustments.append(EnvironmentAdjustment(
            rule_id="AQI_MODERATE_SENSITIVE",
            trigger=f"AQI is unhealthy for sensitive groups ({aqi})",
            action="Reduce intensity to 85%",
            reason=f"Air quality is unhealthy for sensitive groups (AQI {aqi}). Consider reducing outdoor workout intensity."
        ))
        severity_scores.append(1)

    # === RULE 2: Temperature Rules ===
    if temperature_celsius > 38:
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 50)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 30)
        constraints.recommended_location = "indoor"
        constraints.blocked_workout_types.extend(["outdoor_running", "outdoor_hiit", "outdoor_sports"])
        constraints.suggested_workout_types.extend(["swimming", "indoor_strength", "air_conditioned_gym"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="TEMP_EXTREME_HOT",
            trigger=f"Temperature is extreme ({temperature_celsius}°C)",
            action="Reduce intensity to 50%, limit duration to 30min, move indoors",
            reason=f"Temperature is dangerously high ({temperature_celsius}°C). High risk of heat stroke and dehydration."
        ))
        severity_scores.append(4)
    elif temperature_celsius > 35:
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 65)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 45)
        constraints.suggested_workout_types.extend(["early_morning_workout", "evening_workout", "swimming"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="TEMP_HOT",
            trigger=f"Temperature is hot ({temperature_celsius}°C)",
            action="Reduce intensity to 65%, limit duration to 45min",
            reason=f"Temperature is very hot ({temperature_celsius}°C). Increase hydration and avoid peak sun hours."
        ))
        severity_scores.append(2)
    elif temperature_celsius < 0:
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 45)
        constraints.blocked_workout_types.extend(["outdoor_swimming"])
        constraints.suggested_workout_types.extend(["indoor_cardio", "heated_gym", "indoor_sports"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="TEMP_EXTREME_COLD",
            trigger=f"Temperature is extreme cold ({temperature_celsius}°C)",
            action="Limit outdoor duration to 45min, suggest indoor alternatives",
            reason=f"Temperature is below freezing ({temperature_celsius}°C). Risk of frostbite and hypothermia with prolonged exposure."
        ))
        severity_scores.append(2)

    # === RULE 3: Heatwave Rules ===
    if is_heatwave:
        constraints.max_intensity_percent = min(constraints.max_intensity_percent, 60)
        constraints.max_duration_minutes = min(constraints.max_duration_minutes, 40)
        constraints.recommended_location = "indoor"
        adjustments.append(EnvironmentAdjustment(
            rule_id="HEATWAVE_ACTIVE",
            trigger="Heatwave warning is active",
            action="Reduce intensity to 60%, limit duration to 40min, prioritize indoor",
            reason="A heatwave is in effect. Outdoor exercise should be minimized. Stay hydrated and exercise in cooled environments."
        ))
        severity_scores.append(3)

    # === RULE 4: Lockdown Rules ===
    if lockdown_status == "full":
        constraints.allow_outdoor = False
        constraints.recommended_location = "home"
        constraints.blocked_workout_types.extend(["gym", "outdoor_running", "group_classes", "swimming_public"])
        constraints.suggested_workout_types.extend(["home_bodyweight", "home_yoga", "home_hiit", "resistance_bands"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="LOCKDOWN_FULL",
            trigger="Full lockdown is in effect",
            action="Home-only workouts, block all outdoor and gym activities",
            reason="Full lockdown restrictions are active. All workouts must be done at home. No outdoor or facility access permitted."
        ))
        severity_scores.append(4)
    elif lockdown_status == "partial":
        constraints.blocked_workout_types.extend(["group_classes", "crowded_gym"])
        constraints.suggested_workout_types.extend(["solo_outdoor", "home_workout", "outdoor_solo_running"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="LOCKDOWN_PARTIAL",
            trigger="Partial lockdown is in effect",
            action="Avoid group activities and crowded spaces",
            reason="Partial lockdown restrictions are active. Avoid group fitness classes and crowded gyms. Solo outdoor exercise permitted."
        ))
        severity_scores.append(2)

    # === RULE 5: Local Event Rules ===
    if has_local_event:
        constraints.blocked_workout_types.extend(["outdoor_running_streets", "cycling_roads", "public_parks"])
        constraints.suggested_workout_types.extend(["indoor_gym", "home_workout", "private_facilities"])
        adjustments.append(EnvironmentAdjustment(
            rule_id="LOCAL_EVENT_ACTIVE",
            trigger="Local event affecting safety/access",
            action="Avoid affected outdoor areas, prefer indoor or private facilities",
            reason="A local event may affect safety or access to outdoor workout areas. Consider indoor alternatives or different routes."
        ))
        severity_scores.append(2)

    # === Calculate Overall Severity ===
    if not severity_scores:
        severity = "low"
    else:
        max_severity = max(severity_scores)
        if max_severity >= 4:
            severity = "critical"
        elif max_severity >= 3:
            severity = "high"
        elif max_severity >= 2:
            severity = "moderate"
        else:
            severity = "low"

    # Deduplicate suggested workout types
    constraints.blocked_workout_types = list(set(constraints.blocked_workout_types))
    constraints.suggested_workout_types = list(set(constraints.suggested_workout_types))
    
    # Remove blocked types from suggested
    constraints.suggested_workout_types = [
        w for w in constraints.suggested_workout_types 
        if w not in constraints.blocked_workout_types
    ]

    return constraints, adjustments, severity

def apply_environment_to_readiness(
    base_decision: str,
    readiness_score: int,
    constraints: WorkoutConstraints,
    severity: str
) -> str:
    if severity == "critical":
        if base_decision == "TRAIN":
            return "ACTIVE_RECOVERY"
        elif base_decision == "ACTIVE_RECOVERY":
            return "REST" if not constraints.allow_outdoor and constraints.recommended_location == "home" else "ACTIVE_RECOVERY"
        return base_decision
    
    if severity == "high":
        if base_decision == "TRAIN" and constraints.max_intensity_percent < 60:
            return "ACTIVE_RECOVERY"
        return base_decision
    
    return base_decision

def get_combined_explanation(
    readiness_explanation: Dict[str, str],
    adjustments: List[EnvironmentAdjustment]
) -> Dict[str, str]:
    combined = dict(readiness_explanation)
    
    for i, adj in enumerate(adjustments):
        combined[f"env_{adj.rule_id.lower()}"] = adj.reason
    
    return combined
