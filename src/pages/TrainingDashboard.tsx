import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { WeeklyWorkoutPlan } from "@/components/dashboard/WeeklyWorkoutPlan";
import { 
  Activity, 
  Brain, 
  Zap, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainingDashboard = () => {
  const navigate = useNavigate();
  const [readinessScore, setReadinessScore] = useState(88);

  const stats = [
    { label: "Neural Load", value: "Optimal", icon: <Brain className="w-4 h-4" />, color: "text-cyan-400" },
    { label: "HRV Baseline", value: "64ms", icon: <Activity className="w-4 h-4" />, color: "text-purple-400" },
    { label: "CNS Recovery", value: "High", icon: <Zap className="w-4 h-4" />, color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Daily Readiness Overview
            </h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Last bio-sync: 12 minutes ago
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/insights')} className="bg-white/5 border-white/10 hover:bg-white/10">
              <TrendingUp className="w-4 h-4 mr-2" /> Analytics
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">
              Perform Check-in
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Readiness Score</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Physiological capacity for training today</p>
              </div>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                Peak Performance
              </Badge>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-end gap-6">
                <div className="text-7xl font-bold tracking-tighter text-white">
                  {readinessScore}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Biological Reserve</span>
                    <span className="text-cyan-400">88%</span>
                  </div>
                  <Progress value={88} className="h-2 bg-white/5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                    <div className={`p-2 rounded-md bg-white/5 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                      <p className="text-sm font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-600/10 to-transparent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                Adaptation Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-semibold text-cyan-400 mb-2">Supra-maximal Loading Enabled</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Your HRV baseline and CNS markers indicate extreme resilience today. Ideal for high-intensity neuromuscular work or PR attempts.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                <Info className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className="text-sm text-yellow-200/70">
                  Focus on eccentrics: biological data suggests muscular repair is at its peak metabolic efficiency.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <WeeklyWorkoutPlan />
      </div>
    </div>
  );
};

export default TrainingDashboard;
