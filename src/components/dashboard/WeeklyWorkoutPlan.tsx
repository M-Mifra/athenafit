import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

export const WeeklyWorkoutPlan = () => {
  const days = [
    { day: "Sun", activity: "Neuromuscular Power", intensity: "95%", status: "current" },
    { day: "Mon", activity: "Metabolic Recovery", intensity: "40%", status: "pending" },
    { day: "Tue", activity: "Hypertrophy: Posterior", intensity: "75%", status: "pending" },
    { day: "Wed", activity: "CNS De-load", intensity: "20%", status: "pending" },
    { day: "Thu", activity: "Threshold Endurance", intensity: "85%", status: "pending" },
    { day: "Fri", activity: "Hypertrophy: Anterior", intensity: "75%", status: "pending" },
    { day: "Sat", activity: "Active Recovery", intensity: "30%", status: "pending" }
  ];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Adaptive Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((item, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border transition-all ${
                item.status === 'current' 
                  ? 'bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/20' 
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  item.status === 'current' ? 'text-cyan-400' : 'text-gray-500'
                }`}>
                  {item.day}
                </span>
                {item.status === 'current' ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-700" />
                )}
              </div>
              <p className="text-sm font-medium mb-1 line-clamp-2 min-h-[40px]">
                {item.activity}
              </p>
              <Badge variant="secondary" className="bg-white/5 text-[10px] h-5">
                {item.intensity} Load
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
