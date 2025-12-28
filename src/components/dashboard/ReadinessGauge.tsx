import { useEffect, useState } from "react";

interface ReadinessGaugeProps {
  value: number;
  label: string;
  status: "ready" | "recovery" | "rest" | "risk";
}

const statusColors = {
  ready: "from-success to-primary",
  recovery: "from-info to-primary",
  rest: "from-rest to-info",
  risk: "from-warning to-destructive",
};

const statusLabels = {
  ready: "Ready to Train",
  recovery: "Light Activity",
  rest: "Rest Day",
  risk: "Caution Advised",
};

const ReadinessGauge = ({ value, label, status }: ReadinessGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--info))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-display font-bold gradient-text">
            {animatedValue}
          </span>
          <span className="text-sm text-muted-foreground font-medium mt-1">
            {label}
          </span>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-4 rounded-full bg-gradient-to-br ${statusColors[status]} opacity-10 blur-xl`} />
      </div>

      {/* Status badge */}
      <div className={`mt-4 px-4 py-2 rounded-full bg-gradient-to-r ${statusColors[status]} text-primary-foreground text-sm font-semibold shadow-soft`}>
        {statusLabels[status]}
      </div>
    </div>
  );
};

export default ReadinessGauge;
