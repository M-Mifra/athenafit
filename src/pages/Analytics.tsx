import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, TrendingUp, Calendar, Zap } from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Performance Analytics</h1>
            <p className="text-gray-400">Deep dive into your physiological trends</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">HRV Baseline</CardTitle>
              <Activity className="w-4 h-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">64ms</div>
              <p className="text-xs text-green-500">+4% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recovery Score</CardTitle>
              <Zap className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88/100</div>
              <p className="text-xs text-cyan-500">Optimal for training</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Training Load</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">742</div>
              <p className="text-xs text-gray-400">Target: 800</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10 h-96 flex items-center justify-center">
          <p className="text-gray-500">Long-term Trend Visualization Placeholder</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
