import { useState } from "react";
import { Brain, Heart, Zap, Info, ShieldAlert, BookOpen, Dumbbell, Clock, ChevronDown, ChevronUp, Target, Timer, ListChecks } from "lucide-react";
import { TrainingProgram, TRAINING_PROGRAMS, getRecommendedProgram, WorkoutPhase, Exercise } from "@/lib/trainingPrograms";
import { WorkoutConstraints } from "@/lib/readinessEngine";

interface StrategyInsightsProps {
  decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST";
  score: number;
  constraints?: WorkoutConstraints;
}

const StrategyInsights = ({ decision, score, constraints }: StrategyInsightsProps) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);

  const programs = TRAINING_PROGRAMS[decision];
  const defaultConstraints = {
    max_duration_minutes: 90,
    recommended_location: "any",
    max_intensity_percent: 100,
  };
  
  const program = constraints 
    ? getRecommendedProgram(decision, constraints)
    : programs[selectedProgramIndex];

  const getPhaseColor = (index: number) => {
    const colors = [
      "from-amber-500 to-orange-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="editorial-card rounded-2xl p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            Your Training Program
          </h3>
          
          {programs.length > 1 && (
            <div className="flex gap-2">
              {programs.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProgramIndex(i)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    selectedProgramIndex === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard 
            icon={<Target className="h-4 w-4" />} 
            label="Focus" 
            value={program.focus} 
          />
          <MetricCard 
            icon={<Clock className="h-4 w-4" />} 
            label="Duration" 
            value={program.totalDuration} 
          />
          <MetricCard 
            icon={<Zap className="h-4 w-4" />} 
            label="Intensity" 
            value={program.intensity} 
          />
          <MetricCard 
            icon={<ListChecks className="h-4 w-4" />} 
            label="Phases" 
            value={`${program.phases.length} phases`} 
          />
        </div>

        {program.equipment.length > 0 && (
          <div className="mb-6 p-3 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Equipment Needed</p>
            <div className="flex flex-wrap gap-2">
              {program.equipment.map((item, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-md bg-background border border-border">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {program.phases.map((phase, index) => (
            <PhaseCard
              key={index}
              phase={phase}
              index={index}
              isExpanded={expandedPhase === index}
              onToggle={() => setExpandedPhase(expandedPhase === index ? null : index)}
              colorGradient={getPhaseColor(index)}
            />
          ))}
        </div>

        {program.tips.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm font-medium text-amber-600 mb-2 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Pro Tips
            </p>
            <ul className="space-y-1">
              {program.tips.map((tip, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {program.cooldownNotes && (
          <p className="mt-4 text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
            {program.cooldownNotes}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="editorial-card rounded-2xl p-6">
          <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            Science Insight
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getScienceInsight(decision, score)}
          </p>
        </div>
        <div className="editorial-card rounded-2xl p-6">
          <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-orange-500" />
            Safety Protocol
          </h4>
          <ul className="text-xs text-muted-foreground space-y-2">
            {getSafetyProtocol(decision).map((item, i) => (
              <li key={i} className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="editorial-card rounded-2xl p-6 bg-muted/30">
        <h4 className="font-serif text-lg mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          Physiological Markers (Estimated)
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <MarkerItem 
            icon={<Heart className="h-4 w-4" />} 
            label="HRV" 
            value={score > 80 ? "High" : (score > 60 ? "Stable" : "Suppressed")} 
            status={score > 80 ? "good" : (score > 60 ? "moderate" : "low")}
          />
          <MarkerItem 
            icon={<Zap className="h-4 w-4" />} 
            label="CNS" 
            value={score > 75 ? "Optimal" : (score > 50 ? "Fatigued" : "Taxed")} 
            status={score > 75 ? "good" : (score > 50 ? "moderate" : "low")}
          />
          <MarkerItem 
            icon={<Info className="h-4 w-4" />} 
            label="Cortisol" 
            value={score > 70 ? "Normal" : "Elevated"} 
            status={score > 70 ? "good" : "moderate"}
          />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-3 rounded-xl bg-background/50 border border-border/50">
    <div className="flex items-center gap-2 text-muted-foreground mb-1">
      {icon}
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-sm font-medium truncate">{value}</p>
  </div>
);

const PhaseCard = ({ 
  phase, 
  index, 
  isExpanded, 
  onToggle,
  colorGradient 
}: { 
  phase: WorkoutPhase; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  colorGradient: string;
}) => (
  <div className="rounded-xl border border-border/50 overflow-hidden bg-background/50">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorGradient} flex items-center justify-center text-white text-sm font-bold`}>
          {index + 1}
        </div>
        <div className="text-left">
          <p className="font-medium text-sm">{phase.name}</p>
          <p className="text-xs text-muted-foreground">{phase.duration} - {phase.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{phase.exercises.length} exercises</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </button>
    
    {isExpanded && (
      <div className="px-4 pb-4 border-t border-border/50">
        <div className="mt-4 space-y-2">
          {phase.exercises.map((exercise, i) => (
            <ExerciseRow key={i} exercise={exercise} />
          ))}
        </div>
      </div>
    )}
  </div>
);

const ExerciseRow = ({ exercise }: { exercise: Exercise }) => (
  <div className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
    <div className="flex-1">
      <p className="text-sm font-medium">{exercise.name}</p>
      {exercise.notes && (
        <p className="text-xs text-muted-foreground mt-0.5">{exercise.notes}</p>
      )}
    </div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">
        {exercise.sets > 1 ? `${exercise.sets}×${exercise.reps}` : exercise.reps}
      </span>
      {exercise.rest !== "0s" && (
        <span className="flex items-center gap-1">
          <Timer className="h-3 w-3" />
          {exercise.rest}
        </span>
      )}
    </div>
  </div>
);

const MarkerItem = ({ 
  icon, 
  label, 
  value,
  status 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  status: "good" | "moderate" | "low";
}) => {
  const statusColors = {
    good: "text-green-500 bg-green-500/10",
    moderate: "text-yellow-500 bg-yellow-500/10",
    low: "text-red-500 bg-red-500/10",
  };
  
  return (
    <div className="text-center p-3 rounded-xl bg-background/50 border border-border">
      <div className="flex justify-center mb-2 text-muted-foreground">{icon}</div>
      <p className="text-[10px] uppercase text-muted-foreground mb-1">{label}</p>
      <p className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[status]}`}>{value}</p>
    </div>
  );
};

function getScienceInsight(decision: string, score: number): string {
  switch (decision) {
    case "TRAIN":
      return `Your readiness score of ${score} indicates optimal parasympathetic/sympathetic balance. Heart rate variability is likely elevated, glycogen stores are replenished, and your central nervous system is primed for performance. This is the ideal state for progressive overload and strength gains.`;
    case "ACTIVE_RECOVERY":
      return `A score of ${score} suggests moderate fatigue accumulation. Active recovery increases blood flow to muscles, accelerating metabolic waste clearance (lactate, hydrogen ions) without adding systemic load. This preserves training adaptations while promoting recovery.`;
    case "REST":
      return `Your readiness score of ${score} correlates with suppressed immune function and elevated cortisol. Research shows that training in this state significantly increases injury risk and can lead to overtraining syndrome. Rest today is an investment in tomorrow's performance.`;
    default:
      return "";
  }
}

function getSafetyProtocol(decision: string): string[] {
  switch (decision) {
    case "TRAIN":
      return [
        "Complete full warm-up before working sets",
        "Listen to joint pain over muscular burn",
        "Stop if RPE exceeds target by 2+ points",
        "Prioritize movement quality over load",
      ];
    case "ACTIVE_RECOVERY":
      return [
        "Keep heart rate below 70% of max",
        "Stop if you feel any sharp pain",
        "This is NOT a workout - ease into it",
        "Hydrate well throughout",
      ];
    case "REST":
      return [
        "Avoid the temptation to 'just do a light workout'",
        "Focus on sleep quality tonight",
        "Stay lightly mobile - avoid full sedentary day",
        "Use this time for nutrition and meal prep",
      ];
    default:
      return [];
  }
}

export default StrategyInsights;
