import { useState } from "react";
import { Moon, Battery, Brain, Zap, Clock, Sparkles } from "lucide-react";
import CheckInSlider from "./CheckInSlider";

export interface BiologicalData {
  sleep_hours: number;
  stress_level: number;
  fatigue_level: number;
  muscle_soreness: number;
  available_time: number;
}

interface BiologicalCheckInProps {
  onDataChange: (data: BiologicalData) => void;
  data: {
    sleep: number;
    energy: number;
    stress: number;
    soreness: number;
    timeAvailable: number;
  };
  setData: React.Dispatch<React.SetStateAction<{
    sleep: number;
    energy: number;
    stress: number;
    soreness: number;
    timeAvailable: number;
  }>>;
}

const BiologicalCheckIn = ({ onDataChange, data, setData }: BiologicalCheckInProps) => {
  const convertToApiFormat = () => {
    return {
      sleep_hours: 4 + (data.sleep - 1) * 1.5,
      stress_level: (5 - data.stress) * 2 + 1,
      fatigue_level: (5 - data.energy) * 2 + 1,
      muscle_soreness: (5 - data.soreness) * 2 + 1,
      available_time: [15, 30, 45, 60, 90][data.timeAvailable - 1],
    };
  };

  const handleChange = (key: keyof typeof data, value: number) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    
    const apiData = {
      sleep_hours: 4 + (newData.sleep - 1) * 1.5,
      stress_level: (5 - newData.stress) * 2 + 1,
      fatigue_level: (5 - newData.energy) * 2 + 1,
      muscle_soreness: (5 - newData.soreness) * 2 + 1,
      available_time: [15, 30, 45, 60, 90][newData.timeAvailable - 1],
    };
    onDataChange(apiData);
  };

  return (
    <div className="editorial-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium">Biological Check-in</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Calibrate Your Output</p>
        </div>
      </div>

      <div className="space-y-6">
        <CheckInSlider
          icon={Moon}
          label="Sleep Quality"
          description="Restoration level from last night"
          value={data.sleep}
          onChange={(v) => handleChange("sleep", v)}
        />
        <CheckInSlider
          icon={Battery}
          label="Energy Level"
          description="Available metabolic capacity"
          value={data.energy}
          onChange={(v) => handleChange("energy", v)}
        />
        <CheckInSlider
          icon={Brain}
          label="Nervous System Stress"
          description="Cognitive and systemic load"
          value={data.stress}
          onChange={(v) => handleChange("stress", v)}
          labels={["Extreme", "High", "Moderate", "Low", "None"]}
        />
        <CheckInSlider
          icon={Zap}
          label="Peripheral Fatigue"
          description="Muscle soreness and tension"
          value={data.soreness}
          onChange={(v) => handleChange("soreness", v)}
          labels={["Severe", "High", "Moderate", "Mild", "None"]}
        />
        <CheckInSlider
          icon={Clock}
          label="Temporal Constraint"
          description="Duration available for today's session"
          value={data.timeAvailable}
          onChange={(v) => handleChange("timeAvailable", v)}
          labels={["15m", "30m", "45m", "60m", "90m+"]}
        />
      </div>
    </div>
  );
};

export default BiologicalCheckIn;
