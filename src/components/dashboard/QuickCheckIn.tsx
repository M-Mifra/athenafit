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
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const result = calculateReadiness(data);
    
    setIsSubmitted(true);
    
    if (onResult) {
      onResult(result);
    }
    
    toast.success("Readiness assessment complete!");
    setLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-3xl p-12 text-center animate-fade-up border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-success to-primary flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(var(--success),0.5)]">
          <Check className="h-10 w-10 text-white" />
        </div>
        <h3 className="font-serif text-3xl font-bold mb-4">Assessment Complete</h3>
        <p className="text-muted-foreground max-w-xs mx-auto text-lg">
          Your biological readiness has been analyzed. Generating your optimal training path...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 rounded-3xl p-8 animate-fade-up border border-white/10 shadow-2xl backdrop-blur-xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-tight">Daily Biological Check-in</h3>
            <p className="text-sm text-muted-foreground font-medium">Calibrate your training to your current state</p>
          </div>
        </div>

        <div className="space-y-6">
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

        <div className="mt-10">
          <Button 
            variant="hero" 
            className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                Generate Personalized Strategy
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest font-bold">
            Powered by AthenaFit Intelligence Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickCheckIn;
