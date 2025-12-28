import { useState } from "react";
import { Moon, Battery, Brain, Clock, Zap, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckInSlider from "./CheckInSlider";

interface CheckInData {
  sleep: number;
  energy: number;
  stress: number;
  soreness: number;
  timeAvailable: number;
}

const QuickCheckIn = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<CheckInData>({
    sleep: 4,
    energy: 3,
    stress: 3,
    soreness: 2,
    timeAvailable: 3,
  });

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center slide-up">
        <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-success" />
        </div>
        <h3 className="font-display font-bold text-xl">Check-in Complete!</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Your personalized plan is being generated...
        </p>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full glass-card-hover rounded-2xl p-6 text-left group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-info text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Daily Check-in</h3>
              <p className="text-sm text-muted-foreground">
                Quick 30-second readiness assessment
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </button>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-info text-primary-foreground">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg">How are you feeling today?</h3>
          <p className="text-sm text-muted-foreground">Rate each factor from 1-5</p>
        </div>
      </div>

      <div className="space-y-4">
        <CheckInSlider
          icon={Moon}
          label="Sleep Quality"
          description="How well did you sleep last night?"
          value={data.sleep}
          onChange={(v) => setData({ ...data, sleep: v })}
        />
        <CheckInSlider
          icon={Battery}
          label="Energy Level"
          description="How energized do you feel right now?"
          value={data.energy}
          onChange={(v) => setData({ ...data, energy: v })}
        />
        <CheckInSlider
          icon={Brain}
          label="Mental Stress"
          description="How stressed or overwhelmed are you?"
          value={data.stress}
          onChange={(v) => setData({ ...data, stress: v })}
          labels={["Very High", "High", "Moderate", "Low", "None"]}
        />
        <CheckInSlider
          icon={Zap}
          label="Muscle Soreness"
          description="Any muscle soreness or fatigue?"
          value={data.soreness}
          onChange={(v) => setData({ ...data, soreness: v })}
          labels={["Severe", "High", "Moderate", "Mild", "None"]}
        />
        <CheckInSlider
          icon={Clock}
          label="Time Available"
          description="How much time do you have today?"
          value={data.timeAvailable}
          onChange={(v) => setData({ ...data, timeAvailable: v })}
          labels={["15min", "30min", "45min", "60min", "90min+"]}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setIsExpanded(false)}
        >
          Cancel
        </Button>
        <Button variant="hero" className="flex-1" onClick={handleSubmit}>
          Get My Plan
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickCheckIn;
