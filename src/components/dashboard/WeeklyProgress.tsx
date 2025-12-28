import { CheckCircle2, Circle, Flame, Target } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DayData {
  day: string;
  completed: boolean;
  type: "workout" | "recovery" | "rest" | "pending";
  score?: number;
}

const weekData: DayData[] = [
  { day: "Mon", completed: true, type: "workout", score: 85 },
  { day: "Tue", completed: true, type: "recovery", score: 72 },
  { day: "Wed", completed: true, type: "workout", score: 88 },
  { day: "Thu", completed: true, type: "rest", score: 65 },
  { day: "Fri", completed: false, type: "pending" },
  { day: "Sat", completed: false, type: "pending" },
  { day: "Sun", completed: false, type: "pending" },
];

const typeColors = {
  workout: "bg-success text-success-foreground",
  recovery: "bg-info text-info-foreground",
  rest: "bg-rest text-primary-foreground",
  pending: "bg-muted text-muted-foreground",
};

const WeeklyProgress = () => {
  const completedDays = weekData.filter((d) => d.completed).length;
  const streak = 4; // Current streak

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg">Weekly Progress</h3>
          <p className="text-sm text-muted-foreground">
            {completedDays} of {weekData.length} days completed
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 text-warning">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-semibold">{streak} day streak</span>
        </div>
      </div>

      {/* Day circles */}
      <div className="flex justify-between gap-2">
        {weekData.map((day, index) => (
          <div
            key={day.day}
            className="flex flex-col items-center gap-2 fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                day.completed
                  ? typeColors[day.type]
                  : "bg-muted/50 border-2 border-dashed border-muted-foreground/30"
              }`}
            >
              {day.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                day.completed ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {day.day}
            </span>
            {day.score && (
              <span className="text-[10px] text-muted-foreground">{day.score}%</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border/50">
        {[
          { type: "workout", label: "Workout" },
          { type: "recovery", label: "Recovery" },
          { type: "rest", label: "Rest" },
        ].map((item) => (
          <div key={item.type} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                typeColors[item.type as keyof typeof typeColors]
              }`}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgress;
