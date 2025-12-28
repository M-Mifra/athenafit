import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ReadinessResult } from "@/lib/readinessEngine";

interface ReadinessVisualProps {
  assessment?: ReadinessResult | null;
}

const ReadinessVisual = ({ assessment }: ReadinessVisualProps) => {
  const [progress, setProgress] = useState(0);
  const targetValue = assessment?.readiness_score || 78;

  useEffect(() => {
    setProgress(0);
    const timer = setTimeout(() => {
      setProgress(targetValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [targetValue]);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getDecisionLabel = (decision: string) => {
    switch (decision) {
      case "TRAIN": return "Ready to Train";
      case "ACTIVE_RECOVERY": return "Active Recovery";
      case "REST": return "Rest Day";
      default: return "Ready to train";
    }
  };

  const metrics = assessment ? [
    { label: "Sleep Hours", value: `${assessment.sleep_hours.toFixed(1)}h`, subtext: "Logged today" },
    { label: "Recovery", value: `${assessment.readiness_score}%`, subtext: getDecisionLabel(assessment.decision) },
    { label: "Stress", value: assessment.stress_level > 7 ? "High" : assessment.stress_level > 4 ? "Moderate" : "Low", subtext: "Reported" },
    { label: "Capacity", value: `${assessment.available_time}m`, subtext: "Available today" },
  ] : [
    { label: "Sleep Quality", value: "7.5h", subtext: "Deep sleep: 1.8h" },
    { label: "Recovery", value: "82%", subtext: "Above baseline" },
    { label: "HRV Score", value: "65ms", subtext: "+8% from avg" },
    { label: "Strain Load", value: "Optimal", subtext: "Ready for intensity" },
  ];

  return (
    <section id="assessment" className="section-padding subtle-gradient relative min-h-[80vh] flex flex-col justify-center">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
              Readiness Analysis
            </p>
            <h2 className="font-serif text-headline mb-6">
              Your body speaks.
              <br />
              <span className="italic">We help you listen.</span>
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Every morning, a simple check-in captures your sleep quality, stress levels, muscle soreness, and available time. Our AI synthesizes these signals into a single, actionable readiness score.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="p-5 editorial-card rounded-lg group hover:bg-white/5 transition-colors cursor-default">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {metric.label}
                  </p>
                  <p className="text-xl font-medium mb-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <svg className="w-72 h-72 md:w-80 md:h-80 -rotate-90" viewBox="0 0 280 280">
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="1"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 2000ms ease-out" }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-6xl md:text-7xl">{progress}</span>
                <span className="text-sm text-muted-foreground mt-2">Readiness Score</span>
                <span className="text-xs text-primary mt-4 px-3 py-1 bg-primary/10 rounded-full">
                  {assessment ? getDecisionLabel(assessment.decision) : "Ready to train"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" 
        onClick={() => document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">See Adaptation</span>
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  );
};

export default ReadinessVisual;
