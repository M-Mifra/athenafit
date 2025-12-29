import React from "react";
import { CheckCircle2, Circle, Clock, Flame } from "lucide-react";

interface WorkoutDay {
  day: string;
  type: string;
  intensity: string;
  duration: string;
  completed: boolean;
  isToday?: boolean;
}

const WeeklyWorkoutPlan = () => {
  const days: WorkoutDay[] = [
    { day: "Sun", type: "Active Recovery", intensity: "Low", duration: "30m", completed: true },
    { day: "Mon", type: "Base Endurance", intensity: "Moderate", duration: "45m", completed: true },
    { day: "Tue", type: "Threshold Intervals", intensity: "High", duration: "60m", completed: false, isToday: true },
    { day: "Wed", type: "Recovery Walk", intensity: "Low", duration: "30m", completed: false },
    { day: "Thu", type: "Strength Circuit", intensity: "Moderate", duration: "45m", completed: false },
    { day: "Fri", type: "Tempo Run", intensity: "High", duration: "50m", completed: false },
    { day: "Sat", type: "Long Distance", intensity: "Moderate", duration: "90m", completed: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
      {days.map((day) => (
        <div 
          key={day.day}
          className={`p-4 rounded-2xl border transition-all duration-300 ${
            day.isToday 
              ? "bg-primary/5 border-primary shadow-md scale-[1.02] ring-1 ring-primary/20" 
              : "bg-card border-border/50 opacity-80"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${day.isToday ? "text-primary" : "text-muted-foreground"}`}>
              {day.day}
            </span>
            {day.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground/30" />
            )}
          </div>
          
          <h4 className="font-serif font-semibold text-sm mb-2 leading-tight h-8 line-clamp-2">
            {day.type}
          </h4>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Flame className="h-3 w-3" />
              <span>{day.intensity}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{day.duration}</span>
            </div>
          </div>
          
          {day.isToday && (
            <div className="mt-3 pt-3 border-t border-primary/10">
              <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Current Strategy</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyWorkoutPlan;
