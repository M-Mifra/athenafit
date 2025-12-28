import { Activity, MapPin, Clock, TrendingDown, AlertCircle, CheckCircle, Home, Sun } from "lucide-react";
import { CombinedReadinessResponse, WorkoutConstraints, EnvironmentAdjustment } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import StrategyInsights from "./StrategyInsights";

interface WorkoutRecommendationProps {
  result: CombinedReadinessResponse | null;
}

const WorkoutRecommendation = ({ result }: WorkoutRecommendationProps) => {
  if (!result) {
    return (
      <div className="editorial-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <Activity className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl mb-2">No Assessment Yet</h3>
        <p className="text-muted-foreground text-sm">
          Complete your biological check-in and environment input to receive personalized recommendations.
        </p>
      </div>
    );
  }

  const getDecisionConfig = (decision: string) => {
    switch (decision) {
      case "TRAIN":
        return {
          color: "from-green-500 to-emerald-600",
          bgColor: "bg-green-500/10",
          textColor: "text-green-600",
          icon: CheckCircle,
          label: "Ready to Train",
          description: "Your body is well-rested and conditions are favorable for a full workout session.",
        };
      case "ACTIVE_RECOVERY":
        return {
          color: "from-blue-500 to-cyan-600",
          bgColor: "bg-blue-500/10",
          textColor: "text-blue-600",
          icon: Activity,
          label: "Active Recovery",
          description: "Light movement recommended. Focus on mobility, stretching, or low-intensity cardio.",
        };
      case "REST":
        return {
          color: "from-purple-500 to-violet-600",
          bgColor: "bg-purple-500/10",
          textColor: "text-purple-600",
          icon: Sun,
          label: "Rest Day",
          description: "Your body needs recovery. Prioritize sleep, nutrition, and mental restoration.",
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bgColor: "bg-gray-500/10",
          textColor: "text-gray-600",
          icon: Activity,
          label: "Unknown",
          description: "",
        };
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "low":
        return { color: "text-green-500", bg: "bg-green-500/20", label: "Low Risk" };
      case "moderate":
        return { color: "text-yellow-500", bg: "bg-yellow-500/20", label: "Moderate" };
      case "high":
        return { color: "text-orange-500", bg: "bg-orange-500/20", label: "High Risk" };
      case "critical":
        return { color: "text-red-500", bg: "bg-red-500/20", label: "Critical" };
      default:
        return { color: "text-gray-500", bg: "bg-gray-500/20", label: "Unknown" };
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case "home":
        return <Home className="h-4 w-4" />;
      case "indoor":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const decisionConfig = getDecisionConfig(result.final_decision);
  const severityConfig = getSeverityConfig(result.environment_severity);
  const DecisionIcon = decisionConfig.icon;

  const wasDowngraded = result.base_decision !== result.final_decision;

  return (
    <div className="space-y-6">
      <div className={`editorial-card rounded-2xl p-6 bg-gradient-to-br ${decisionConfig.color} text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Today's Recommendation</p>
            <h2 className="font-serif text-3xl font-medium">{decisionConfig.label}</h2>
          </div>
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <DecisionIcon className="h-8 w-8" />
          </div>
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {decisionConfig.description}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-white/20">
          <div className="flex-1">
            <p className="text-white/60 text-xs uppercase mb-1">Readiness Score</p>
            <p className="font-mono text-2xl font-bold">{result.readiness_score}</p>
          </div>
          <div className="flex-1">
            <p className="text-white/60 text-xs uppercase mb-1">Environment</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${severityConfig.bg} text-white`}>
              {severityConfig.label}
            </span>
          </div>
        </div>
      </div>

      {wasDowngraded && (
        <div className="editorial-card rounded-xl p-4 border-l-4 border-orange-500 bg-orange-500/5">
          <div className="flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Decision Adjusted</p>
              <p className="text-muted-foreground text-xs mt-1">
                Original recommendation was <span className="font-medium">{result.base_decision}</span>, 
                adjusted to <span className="font-medium">{result.final_decision}</span> due to environmental factors.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="editorial-card rounded-2xl p-6">
        <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Workout Constraints
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <ConstraintCard
            label="Max Intensity"
            value={`${result.constraints.max_intensity_percent}%`}
            progress={result.constraints.max_intensity_percent}
          />
          <ConstraintCard
            label="Max Duration"
            value={`${result.constraints.max_duration_minutes} min`}
            progress={(result.constraints.max_duration_minutes / 120) * 100}
            icon={<Clock className="h-4 w-4" />}
          />
          <div className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <span className="text-sm text-muted-foreground">Recommended Location</span>
            <span className="flex items-center gap-2 font-medium capitalize">
              {getLocationIcon(result.constraints.recommended_location)}
              {result.constraints.recommended_location}
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <span className="text-sm text-muted-foreground">Outdoor Activities</span>
            <span className={`font-medium ${result.constraints.allow_outdoor ? 'text-green-600' : 'text-red-500'}`}>
              {result.constraints.allow_outdoor ? 'Allowed' : 'Not Recommended'}
            </span>
          </div>
        </div>

        {result.constraints.suggested_workout_types.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Suggested Workout Types</p>
            <div className="flex flex-wrap gap-2">
              {result.constraints.suggested_workout_types.map((type, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {result.constraints.blocked_workout_types.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Avoid These Activities</p>
            <div className="flex flex-wrap gap-2">
              {result.constraints.blocked_workout_types.map((type, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-medium capitalize">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <ExplainabilityPanel 
        readinessExplanation={result.readiness_explanation}
        environmentAdjustments={result.environment_adjustments}
      />

      <StrategyInsights 
        decision={result.final_decision} 
        score={result.readiness_score} 
      />
    </div>
  );
};

const ConstraintCard = ({ 
  label, 
  value, 
  progress,
  icon 
}: { 
  label: string; 
  value: string; 
  progress: number;
  icon?: React.ReactNode;
}) => (
  <div className="p-3 rounded-xl bg-muted/50">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      {icon}
    </div>
    <p className="font-mono text-lg font-bold mb-2">{value}</p>
    <Progress value={progress} className="h-1.5" />
  </div>
);

const ExplainabilityPanel = ({
  readinessExplanation,
  environmentAdjustments,
}: {
  readinessExplanation: Record<string, string>;
  environmentAdjustments: EnvironmentAdjustment[];
}) => (
  <div className="editorial-card rounded-2xl p-6">
    <h3 className="font-serif text-lg mb-4 flex items-center gap-2">
      <AlertCircle className="h-5 w-5 text-muted-foreground" />
      Why This Recommendation?
    </h3>
    
    <div className="space-y-4">
      {Object.entries(readinessExplanation).length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Biological Factors</p>
          <ul className="space-y-2">
            {Object.entries(readinessExplanation).map(([key, reason]) => (
              <li key={key} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground/80">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {environmentAdjustments.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Environmental Factors</p>
          <ul className="space-y-3">
            {environmentAdjustments.map((adj, i) => (
              <li key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{adj.rule_id}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-600">{adj.trigger}</span>
                </div>
                <p className="text-sm text-foreground/80">{adj.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default WorkoutRecommendation;
