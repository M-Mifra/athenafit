import { useEffect, useState } from "react";

interface ReadinessVisualProps {
  assessment?: any;
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

  const metrics = assessment ? [
    { label: "Sleep Hours", value: `${assessment.sleep_hours.toFixed(1)}h`, subtext: "Logged today" },
    { label: "Recovery", value: `${assessment.readiness_score}%`, subtext: assessment.decision },
    { label: "Stress", value: assessment.stress_level > 7 ? "High" : assessment.stress_level > 4 ? "Moderate" : "Low", subtext: "Reported" },
    { label: "Capacity", value: `${assessment.available_time}m`, subtext: "Available today" },
  ] : [
    { label: "Sleep Quality", value: "7.5h", subtext: "Deep sleep: 1.8h" },
    { label: "Recovery", value: "82%", subtext: "Above baseline" },
    { label: "HRV Score", value: "65ms", subtext: "+8% from avg" },
    { label: "Strain Load", value: "Optimal", subtext: "Ready for intensity" },
  ];
                <div key={metric.label} className="p-5 editorial-card rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {metric.label}
                  </p>
                  <p className="text-xl font-medium mb-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Outer ring */}
              <svg className="w-72 h-72 md:w-80 md:h-80 -rotate-90" viewBox="0 0 280 280">
                {/* Background track */}
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="1"
                />
                {/* Progress ring */}
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
                  className="transition-all duration-[2000ms] ease-out"
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-6xl md:text-7xl">{progress}</span>
                <span className="text-sm text-muted-foreground mt-2">Readiness Score</span>
                <span className="text-xs text-primary mt-4 px-3 py-1 bg-primary/10 rounded-full">
                  Ready to train
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadinessVisual;
