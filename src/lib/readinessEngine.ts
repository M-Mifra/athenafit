export interface ReadinessInput {
  sleep: number;
  energy: number;
  stress: number;
  soreness: number;
  timeAvailable: number;
}

export interface EnvironmentInput {
  aqi: number;
  temperature_celsius: number;
  is_heatwave: boolean;
  lockdown_status: "none" | "partial" | "full";
  has_local_event: boolean;
}

export interface EnvironmentAdjustment {
  rule_id: string;
  trigger: string;
  action: string;
  reason: string;
}

export interface WorkoutConstraints {
  allow_outdoor: boolean;
  max_intensity_percent: number;
  max_duration_minutes: number;
  recommended_location: "indoor" | "outdoor" | "home" | "any";
  blocked_workout_types: string[];
  suggested_workout_types: string[];
}

export interface ReadinessResult {
  readiness_score: number;
  decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  explanation: Record<string, string>;
  sleep_hours: number;
  stress_level: number;
  fatigue_level: number;
  muscle_soreness: number;
  available_time: number;
}

export interface CombinedResult {
  readiness_score: number;
  base_decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  final_decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  readiness_explanation: Record<string, string>;
  environment_adjustments: EnvironmentAdjustment[];
  constraints: WorkoutConstraints;
  environment_severity: "low" | "moderate" | "high" | "critical";
}

export function calculateReadiness(input: ReadinessInput): ReadinessResult {
  const sleepHours = 4 + (input.sleep - 1) * 1.5;
  const stressLevel = (5 - input.stress) * 2 + 1;
  const fatigueLevel = (5 - input.energy) * 2 + 1;
  const muscleSoreness = (5 - input.soreness) * 2 + 1;
  const availableTime = [15, 30, 45, 60, 90][input.timeAvailable - 1];

  const sleepScore = Math.min(Math.max((sleepHours - 5) / 3 * 40, 0), 40);
  const stressScore = (10 - stressLevel) * 2;
  const fatigueScore = (10 - fatigueLevel) * 2;
  const sorenessScore = (10 - muscleSoreness) * 2;

  const readinessScore = Math.round(sleepScore + stressScore + fatigueScore + sorenessScore);

  let decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST" = "TRAIN";
  const reasons: Record<string, string> = {};

  if (sleepHours < 5) {
    decision = "REST";
    reasons["sleep"] = "Sleep is critically low (< 5h). High injury risk.";
  }

  if (fatigueLevel > 8 || muscleSoreness > 8) {
    decision = decision !== "REST" ? "ACTIVE_RECOVERY" : "REST";
    reasons["fatigue_soreness"] = "High fatigue or soreness detected. Prioritize recovery.";
  }

  if (readinessScore < 40) {
    decision = "REST";
    reasons["overall"] = `Readiness score (${readinessScore}) is too low for safe exercise.`;
  } else if (readinessScore < 65) {
    if (decision === "TRAIN") {
      decision = "ACTIVE_RECOVERY";
      reasons["overall"] = "Moderate readiness. Low-intensity recovery suggested.";
    }
  } else {
    if (Object.keys(reasons).length === 0) {
      reasons["overall"] = "Body is well-rested and ready for a standard session.";
    }
  }

  if (decision === "TRAIN" && availableTime < 30) {
    decision = "ACTIVE_RECOVERY";
    reasons["time_constraint"] = "Time is limited (<30m). Short recovery session recommended.";
  }

  return {
    readiness_score: readinessScore,
    decision,
    explanation: reasons,
    sleep_hours: sleepHours,
    stress_level: stressLevel,
    fatigue_level: fatigueLevel,
    muscle_soreness: muscleSoreness,
    available_time: availableTime,
  };
}

export function calculateEnvironmentImpact(env: EnvironmentInput): {
  constraints: WorkoutConstraints;
  adjustments: EnvironmentAdjustment[];
  severity: "low" | "moderate" | "high" | "critical";
} {
  const adjustments: EnvironmentAdjustment[] = [];
  let severity: "low" | "moderate" | "high" | "critical" = "low";
  
  let allowOutdoor = true;
  let maxIntensity = 100;
  let maxDuration = 120;
  let recommendedLocation: "indoor" | "outdoor" | "home" | "any" = "any";
  const blockedTypes: string[] = [];
  let suggestedTypes = ["strength", "cardio", "flexibility", "hiit"];

  if (env.aqi > 50 && env.aqi <= 100) {
    adjustments.push({
      rule_id: "AQI_001",
      trigger: `AQI = ${env.aqi}`,
      action: "Monitor symptoms",
      reason: "Air quality is moderate. Sensitive individuals should limit prolonged outdoor exertion."
    });
  }
  
  if (env.aqi > 100 && env.aqi <= 150) {
    severity = "moderate";
    maxIntensity = 80;
    maxDuration = 60;
    adjustments.push({
      rule_id: "AQI_002",
      trigger: `AQI = ${env.aqi}`,
      action: "Reduce outdoor intensity",
      reason: "Air quality is unhealthy for sensitive groups. Reduce outdoor workout intensity by 20%."
    });
    recommendedLocation = "indoor";
  }
  
  if (env.aqi > 150 && env.aqi <= 200) {
    severity = "high";
    maxIntensity = 60;
    maxDuration = 45;
    allowOutdoor = false;
    blockedTypes.push("running", "cycling", "outdoor cardio");
    adjustments.push({
      rule_id: "AQI_003",
      trigger: `AQI = ${env.aqi}`,
      action: "Move indoors",
      reason: "Air quality is unhealthy. All outdoor cardio activities blocked. Indoor alternatives only."
    });
    recommendedLocation = "indoor";
  }
  
  if (env.aqi > 200) {
    severity = "critical";
    maxIntensity = 40;
    maxDuration = 30;
    allowOutdoor = false;
    blockedTypes.push("running", "cycling", "outdoor cardio", "hiit");
    suggestedTypes = ["yoga", "stretching", "light strength"];
    adjustments.push({
      rule_id: "AQI_004",
      trigger: `AQI = ${env.aqi}`,
      action: "Minimal exertion only",
      reason: "Air quality is hazardous. Recommend rest or very light indoor activity only."
    });
    recommendedLocation = "home";
  }

  if (env.temperature_celsius > 35 || env.is_heatwave) {
    const currentSeverity = env.is_heatwave ? "high" : "moderate";
    if (currentSeverity === "high" && severity !== "critical") severity = "high";
    else if (severity === "low") severity = "moderate";
    
    maxIntensity = Math.min(maxIntensity, env.is_heatwave ? 50 : 70);
    maxDuration = Math.min(maxDuration, env.is_heatwave ? 30 : 45);
    
    adjustments.push({
      rule_id: "TEMP_001",
      trigger: env.is_heatwave ? "Heatwave Alert Active" : `Temperature = ${env.temperature_celsius}°C`,
      action: env.is_heatwave ? "Avoid peak hours, stay hydrated" : "Reduce intensity",
      reason: env.is_heatwave 
        ? "Heatwave conditions increase heat stroke risk. Exercise only in early morning or late evening, indoors preferred."
        : "High temperature requires reduced intensity and increased hydration breaks."
    });
    
    if (env.is_heatwave) {
      blockedTypes.push("outdoor cardio", "endurance training");
      recommendedLocation = "indoor";
    }
  }
  
  if (env.temperature_celsius < 5) {
    adjustments.push({
      rule_id: "TEMP_002",
      trigger: `Temperature = ${env.temperature_celsius}°C`,
      action: "Extended warm-up required",
      reason: "Cold conditions require 10-15 min extended warm-up to prevent muscle strain and joint stiffness."
    });
  }

  if (env.lockdown_status === "partial") {
    if (severity !== "critical" && severity !== "high") severity = "moderate";
    recommendedLocation = "home";
    blockedTypes.push("gym workouts");
    suggestedTypes = ["home strength", "bodyweight", "yoga", "cardio at home"];
    adjustments.push({
      rule_id: "POLICY_001",
      trigger: "Partial Lockdown Active",
      action: "Home workouts preferred",
      reason: "Movement restrictions in place. Prioritize home-based exercises. Outdoor activities may be limited."
    });
  }
  
  if (env.lockdown_status === "full") {
    severity = "critical";
    allowOutdoor = false;
    maxIntensity = Math.min(maxIntensity, 60);
    recommendedLocation = "home";
    blockedTypes.push("gym workouts", "outdoor activities", "group fitness");
    suggestedTypes = ["bodyweight", "yoga", "stretching", "home cardio"];
    adjustments.push({
      rule_id: "POLICY_002",
      trigger: "Full Lockdown Active",
      action: "Home only",
      reason: "Full lockdown in effect. All activities must be performed at home. No outdoor exercise permitted."
    });
  }

  if (env.has_local_event) {
    adjustments.push({
      rule_id: "EVENT_001",
      trigger: "Local Event/Crowd",
      action: "Avoid crowded areas",
      reason: "Local event may cause crowding. Avoid outdoor routes near event areas or exercise at off-peak times."
    });
    if (recommendedLocation === "any" || recommendedLocation === "outdoor") {
      recommendedLocation = "indoor";
    }
  }

  return {
    constraints: {
      allow_outdoor: allowOutdoor,
      max_intensity_percent: maxIntensity,
      max_duration_minutes: maxDuration,
      recommended_location: recommendedLocation,
      blocked_workout_types: [...new Set(blockedTypes)],
      suggested_workout_types: suggestedTypes.filter(t => !blockedTypes.includes(t)),
    },
    adjustments,
    severity,
  };
}

export function getCombinedReadiness(
  bioInput: ReadinessInput,
  envInput: EnvironmentInput
): CombinedResult {
  const readinessResult = calculateReadiness(bioInput);
  const envResult = calculateEnvironmentImpact(envInput);

  let finalDecision = readinessResult.decision;

  if (envResult.severity === "critical" && finalDecision === "TRAIN") {
    finalDecision = "ACTIVE_RECOVERY";
  }
  if (envResult.severity === "critical" && !envResult.constraints.allow_outdoor) {
    if (finalDecision !== "REST" && readinessResult.readiness_score < 50) {
      finalDecision = "REST";
    }
  }

  return {
    readiness_score: readinessResult.readiness_score,
    base_decision: readinessResult.decision,
    final_decision: finalDecision,
    readiness_explanation: readinessResult.explanation,
    environment_adjustments: envResult.adjustments,
    constraints: envResult.constraints,
    environment_severity: envResult.severity,
  };
}

