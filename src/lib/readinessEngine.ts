export interface ReadinessInput {
  sleep: number;
  energy: number;
  stress: number;
  soreness: number;
  timeAvailable: number;
}

export interface ReadinessResult {
  readiness_score: number;
  decision: string;
  explanation: Record<string, string>;
  sleep_hours: number;
  stress_level: number;
  fatigue_level: number;
  muscle_soreness: number;
  available_time: number;
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

  let decision = "TRAIN";
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
