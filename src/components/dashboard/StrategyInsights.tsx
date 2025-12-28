import { Brain, Heart, Zap, Info, ShieldAlert, BookOpen } from "lucide-react";

interface StrategyInsightsProps {
  decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  score: number;
}

const StrategyInsights = ({ decision, score }: StrategyInsightsProps) => {
  const getStrategy = () => {
    switch (decision) {
      case "TRAIN":
        return {
          focus: "Performance & Strength",
          plan: [
            { phase: "Neural Activation", details: "10 min dynamic mobility + 3 sets of explosive jumps/sprints (low volume)." },
            { phase: "Primary Lift", details: "Focus on 80-90% intensity. Compound movements (Squat, Deadlift, Press)." },
            { phase: "Accessory Work", details: "Hypertrophy focused, 8-12 rep range. moderate volume." },
            { phase: "Recovery", details: "Light static stretching + 5 min breathwork to down-regulate CNS." }
          ],
          science: "High readiness score indicates optimal Parasympathetic/Sympathetic balance. Your HRV is likely elevated, and glycogen stores are replenished."
        };
      case "ACTIVE_RECOVERY":
        return {
          focus: "Mobility & Restoration",
          plan: [
            { phase: "Joint Prep", details: "CARS (Controlled Articular Rotations) for major joints." },
            { phase: "Movement", details: "Zone 2 cardio (walking/light cycling) at <130 BPM for 20-30 mins." },
            { phase: "Flexibility", details: "PNF stretching for tight muscle groups identified in check-in." },
            { phase: "Down-regulation", details: "Box breathing (4-4-4-4) for 5 minutes." }
          ],
          science: "Moderate fatigue suggests a need to increase blood flow without adding systemic load. Active recovery speeds up metabolic waste clearance."
        };
      case "REST":
        return {
          focus: "Systemic Recovery",
          plan: [
            { phase: "Morning", details: "Full hydration + light morning walk for circadian alignment." },
            { phase: "Afternoon", details: "20 min nap or NSDR (Non-Sleep Deep Rest) protocol." },
            { phase: "Evening", details: "Magnesium-rich meal + no screens 1 hour before sleep." },
            { phase: "Mental", details: "Zero-intensity day. Focus on cognitive restoration." }
          ],
          science: "Readiness score below 60 typically correlates with suppressed immune response and elevated cortisol. Pushing today would likely lead to injury or overtraining."
        };
      default:
        return null;
    }
  };

  const strategy = getStrategy();
  if (!strategy) return null;

  return (
    <div className="space-y-6 mt-8">
      <div className="editorial-card rounded-2xl p-6 border border-primary/20 bg-primary/5">
        <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Detailed Training Strategy
        </h3>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-background/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-1">Session Focus</p>
            <p className="font-semibold text-lg">{strategy.focus}</p>
          </div>
          <div className="space-y-3">
            {strategy.plan.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
                    {i + 1}
                  </div>
                  {i < strategy.plan.length - 1 && <div className="w-px h-full bg-border my-1" />}
                </div>
                <div className="pb-4">
                  <p className="font-medium text-sm">{item.phase}</p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="editorial-card rounded-2xl p-6">
          <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            Science Insight
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "{strategy.science}"
          </p>
        </div>
        <div className="editorial-card rounded-2xl p-6">
          <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-orange-500" />
            Safety Protocol
          </h4>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              Listen to joint pain over muscular burn.
            </li>
            <li className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              Stop session if RPE exceeds target by 2+ points.
            </li>
            <li className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
              Prioritize movement quality over load today.
            </li>
          </ul>
        </div>
      </div>

      <div className="editorial-card rounded-2xl p-6 bg-muted/30">
        <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          Physiological Markers
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <MarkerItem icon={<Heart className="h-4 w-4" />} label="HRV" value={score > 80 ? "High" : (score > 60 ? "Stable" : "Suppressed")} />
          <MarkerItem icon={<Zap className="h-4 w-4" />} label="CNS" value={score > 75 ? "Optimal" : (score > 50 ? "Fatigued" : "Taxed")} />
          <MarkerItem icon={<Info className="h-4 w-4" />} label="Cortisol" value={score > 70 ? "Normal" : "Elevated"} />
        </div>
      </div>
    </div>
  );
};

const MarkerItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="text-center p-2 rounded-xl bg-background/50 border border-border">
    <div className="flex justify-center mb-1 text-muted-foreground">{icon}</div>
    <p className="text-[10px] uppercase text-muted-foreground mb-1">{label}</p>
    <p className="text-xs font-bold">{value}</p>
  </div>
);

export default StrategyInsights;
