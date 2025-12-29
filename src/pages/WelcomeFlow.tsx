import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

const WelcomeFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Bio-Sync Initialization",
      description: "Connect your wearables to establish your physiological baseline.",
      icon: <Brain className="w-12 h-12 text-cyan-400" />
    },
    {
      title: "Performance Goals",
      description: "Define your training objectives and intensity preferences.",
      icon: <Sparkles className="w-12 h-12 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            {steps[step - 1].icon}
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {steps[step - 1].title}
          </CardTitle>
          <p className="text-gray-400 mt-2">
            {steps[step - 1].description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Apple Health</span>
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Oura Ring</span>
                <div className="w-2 h-2 rounded-full bg-gray-500" />
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Whoop</span>
                <div className="w-2 h-2 rounded-full bg-gray-500" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Daily Training Capacity (Hours)</Label>
                <Input type="number" placeholder="1.5" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Primary Focus</Label>
                <select className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option>Hypertrophy</option>
                  <option>Endurance</option>
                  <option>Neuromuscular Power</option>
                  <option>Metabolic Conditioning</option>
                </select>
              </div>
            </div>
          )}

          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white group"
            onClick={() => step < steps.length ? setStep(step + 1) : navigate('/dashboard')}
          >
            {step < steps.length ? 'Continue' : 'Start Training'}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeFlow;
