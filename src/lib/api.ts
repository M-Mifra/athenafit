const API_BASE = "/api";

export interface ReadinessInput {
  user_id: number;
  sleep_hours: number;
  stress_level: number;
  fatigue_level: number;
  muscle_soreness: number;
  available_time: number;
}

export interface EnvironmentInput {
  user_id: number;
  aqi: number;
  temperature_celsius: number;
  is_heatwave: boolean;
  lockdown_status: "none" | "partial" | "full";
  has_local_event: boolean;
}

export interface CombinedReadinessInput extends ReadinessInput {
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

export interface ReadinessResponse {
  id: number;
  user_id: number;
  readiness_score: number;
  decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  explanation: Record<string, string>;
  sleep_hours: number;
  stress_level: number;
  fatigue_level: number;
  muscle_soreness: number;
  available_time: number;
}

export interface EnvironmentImpactResponse {
  id: number;
  user_id: number;
  date: string;
  aqi: number;
  temperature_celsius: number;
  is_heatwave: boolean;
  lockdown_status: string;
  has_local_event: boolean;
  constraints: WorkoutConstraints;
  adjustments: EnvironmentAdjustment[];
  severity: "low" | "moderate" | "high" | "critical";
}

export interface CombinedReadinessResponse {
  readiness_score: number;
  base_decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  final_decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  readiness_explanation: Record<string, string>;
  environment_adjustments: EnvironmentAdjustment[];
  constraints: WorkoutConstraints;
  environment_severity: "low" | "moderate" | "high" | "critical";
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async submitReadiness(data: ReadinessInput): Promise<ReadinessResponse> {
    return this.request<ReadinessResponse>("/readiness/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getReadinessHistory(userId: number): Promise<ReadinessResponse[]> {
    return this.request<ReadinessResponse[]>(`/readiness/${userId}`);
  }

  async submitEnvironmentInput(data: EnvironmentInput): Promise<EnvironmentImpactResponse> {
    return this.request<EnvironmentImpactResponse>("/environment-input", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getEnvironmentImpact(userId: number): Promise<EnvironmentImpactResponse | null> {
    return this.request<EnvironmentImpactResponse | null>(`/environment-impact/${userId}`);
  }

  async getEnvironmentHistory(userId: number, limit = 10): Promise<EnvironmentImpactResponse[]> {
    return this.request<EnvironmentImpactResponse[]>(`/environment-history/${userId}?limit=${limit}`);
  }

  async getCombinedReadiness(data: CombinedReadinessInput): Promise<CombinedReadinessResponse> {
    return this.request<CombinedReadinessResponse>("/combined-readiness/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
