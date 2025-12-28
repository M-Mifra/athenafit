import { useState } from "react";
import { Moon, Battery, Brain, Clock, Zap, ChevronRight, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckInSlider from "./CheckInSlider";
import { toast } from "sonner";
import { calculateReadiness, ReadinessResult } from "@/lib/readinessEngine";

interface CheckInData {
  sleep: number;
  energy: number;
  stress: number;
  soreness: number;
  timeAvailable: number;
}

interface QuickCheckInProps {
  onResult?: (result: ReadinessResult) => void;
}

const QuickCheckIn = ({ onResult }: QuickCheckInProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CheckInData>({
    sleep: 4,
    energy: 3,
    stress: 3,
    soreness: 2,
    timeAvailable: 3,
  });

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const payload = {
        user_id: 1, // Mock user ID for now
        sleep_hours: 4 + (data.sleep - 1) * 1.5,
        stress_level: (5 - data.stress) * 2 + 1,
        fatigue_level: (5 - data.energy) * 2 + 1,
        muscle_soreness: (5 - data.soreness) * 2 + 1,
        available_time: [15, 30, 45, 60, 90][data.timeAvailable - 1]
      };

      const response = await fetch("/api/readiness/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Backend connection failed. Falling back to local engine.");
      }

      const result = await response.json();
      
      setIsSubmitted(true);
      if (onResult) {
        onResult(result);
      }
      toast.success("Biological readiness synchronized!");
    } catch (error) {
      console.warn(error);
      const result = calculateReadiness(data);
      setIsSubmitted(true);
      if (onResult) {
        onResult(result);
      }
      toast.success("Assessment complete (Local Engine)");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-primary/20 via-background to-accent/20 rounded-3xl p-12 text-center animate-fade-up border border-primary/20 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] backdrop-blur-2xl">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-success to-primary flex items-center justify-center mb-8 shadow-[0_0_40px_-10px_rgba(var(--success),0.5)] animate-pulse">
          <Check className="h-12 w-12 text-white" />
        </div>
        <h3 className="font-serif text-4xl font-bold mb-4 text-foreground">Synthesis Complete</h3>
        <p className="text-muted-foreground max-w-xs mx-auto text-lg leading-relaxed">
          Your biometrics have been processed. Your adaptive training strategy is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background via-background/80 to-primary/10 rounded-3xl p-8 animate-fade-up border border-white/20 shadow-[0_0_80px_-15px_rgba(var(--primary),0.2)] backdrop-blur-3xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-10">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_8px_30px_-10px_rgba(var(--primary),0.5)]">
            <Sparkles className="h-7 w-7 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold tracking-tight text-foreground">Biological Check-in</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-1">Calibrate Your Output</p>
          </div>
        </div>

        <div className="space-y-8">
          <CheckInSlider
            icon={Moon}
            label="Sleep Quality"
            description="Restoration level from last night"
            value={data.sleep}
            onChange={(v) => setData({ ...data, sleep: v })}
          />
          <CheckInSlider
            icon={Battery}
            label="Energy Level"
            description="Available metabolic capacity"
            value={data.energy}
            onChange={(v) => setData({ ...data, energy: v })}
          />
          <CheckInSlider
            icon={Brain}
            label="Nervous System Stress"
            description="Cognitive and systemic load"
            value={data.stress}
            onChange={(v) => setData({ ...data, stress: v })}
            labels={["Extreme", "High", "Moderate", "Low", "None"]}
          />
          <CheckInSlider
            icon={Zap}
            label="Peripheral Fatigue"
            description="Muscle soreness and tension"
            value={data.soreness}
            onChange={(v) => setData({ ...data, soreness: v })}
            labels={["Severe", "High", "Moderate", "Mild", "None"]}
          />
          <CheckInSlider
            icon={Clock}
            label="Temporal Constraint"
            description="Duration available for today's session"
            value={data.timeAvailable}
            onChange={(v) => setData({ ...data, timeAvailable: v })}
            labels={["15m", "30m", "45m", "60m", "90m+"]}
          />
        </div>

        <div className="mt-12">
          <Button 
            variant="hero" 
            className="w-full h-16 text-xl font-bold shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x hover:scale-[1.02] active:scale-95 transition-all rounded-2xl border-none text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                Generate Performance Strategy
                <ChevronRight className="h-6 w-6" />
              </div>
            )}
          </Button>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-8 bg-border" />
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em] font-bold">
              Neural Network Analysis Active
            </p>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCheckIn;
