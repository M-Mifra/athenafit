import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, AlertTriangle, Moon, Zap, Clock } from "lucide-react";

export default function App() {
  const [formData, setFormData] = useState({
    sleep_hours: 8,
    stress_level: 5,
    fatigue_level: 5,
    muscle_soreness: 5,
    available_time: 45
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to FastAPI backend
    setTimeout(() => {
      // Mocking the rule-based engine logic for frontend demonstration
      const sleepScore = Math.min(Math.max((formData.sleep_hours - 5) / 3 * 40, 0), 40);
      const stressScore = (10 - formData.stress_level) * 2;
      const fatigueScore = (10 - formData.fatigue_level) * 2;
      const sorenessScore = (10 - formData.muscle_soreness) * 2;
      const score = Math.round(sleepScore + stressScore + fatigueScore + sorenessScore);
      
      let decision = "TRAIN";
      let reasons: any = {};
      
      if (formData.sleep_hours < 5) {
        decision = "REST";
        reasons.sleep = "Sleep is critically low. Rest is mandatory for safety.";
      } else if (score < 40) {
        decision = "REST";
        reasons.overall = "Readiness score is too low.";
      } else if (score < 65 || formData.available_time < 30) {
        decision = "ACTIVE_RECOVERY";
        reasons.overall = score < 65 ? "Moderate readiness detected." : "Limited time available.";
      } else {
        reasons.overall = "You are in great shape to train today!";
      }

      setResult({
        readiness_score: score,
        decision: decision,
        explanation: reasons
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            ADAPTIVE RECOVERY
          </h1>
          <p className="text-slate-400 text-sm">AI-Assisted Exercise Personalization</p>
        </header>

        {!result ? (
          <Card className="bg-slate-900 border-slate-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Daily Check-in
              </CardTitle>
              <CardDescription className="text-slate-400">
                How is your body feeling today?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2">
                      <Moon className="w-4 h-4" /> Sleep (Hours)
                    </Label>
                    <span className="text-sm font-bold text-blue-400">{formData.sleep_hours}h</span>
                  </div>
                  <Slider 
                    value={[formData.sleep_hours]} 
                    min={3} max={12} step={0.5} 
                    onValueChange={([v]) => setFormData({...formData, sleep_hours: v})}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <Label>Stress Level (1-10)</Label>
                      <Input 
                        type="number" min="1" max="10" 
                        value={formData.stress_level}
                        onChange={(e) => setFormData({...formData, stress_level: parseInt(e.target.value)})}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Fatigue Level (1-10)</Label>
                      <Input 
                        type="number" min="1" max="10" 
                        value={formData.fatigue_level}
                        onChange={(e) => setFormData({...formData, fatigue_level: parseInt(e.target.value)})}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Available Time
                      </Label>
                      <span className="text-sm font-bold text-emerald-400">{formData.available_time} min</span>
                    </div>
                    <Slider 
                      value={[formData.available_time]} 
                      min={10} max={120} step={5} 
                      onValueChange={([v]) => setFormData({...formData, available_time: v})}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-all"
                >
                  {loading ? "Analyzing Body Readiness..." : "Get Today's Workout Decision"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className={`border-2 ${
              result.decision === 'TRAIN' ? 'border-emerald-500 bg-emerald-950/20' : 
              result.decision === 'REST' ? 'border-rose-500 bg-rose-950/20' : 
              'border-amber-500 bg-amber-950/20'
            }`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-800 bg-slate-900 shadow-inner">
                    <span className="text-4xl font-black">{result.readiness_score}</span>
                    <span className="absolute -bottom-2 px-2 py-0.5 bg-slate-800 text-[10px] rounded uppercase tracking-widest font-bold">Score</span>
                  </div>
                </div>
                <CardTitle className="text-3xl font-black uppercase tracking-tighter italic">
                  Today's Verdict: {result.decision}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-slate-900/50 border-slate-800">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertTitle className="text-slate-100 font-bold">Why this decision?</AlertTitle>
                  <AlertDescription className="text-slate-400 mt-2">
                    <ul className="list-disc list-inside space-y-1">
                      {Object.values(result.explanation).map((reason: any, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={() => setResult(null)}
                  variant="outline"
                  className="w-full border-slate-800 hover:bg-slate-800 text-slate-300"
                >
                  Log Another Session
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Injury Risk</p>
                  <p className="text-lg font-bold">{result.readiness_score > 60 ? 'Low' : result.readiness_score > 40 ? 'Moderate' : 'High'}</p>
               </div>
               <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <Moon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Sleep Quality</p>
                  <p className="text-lg font-bold">{formData.sleep_hours >= 7 ? 'Optimal' : 'Sub-optimal'}</p>
               </div>
               <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Capacity</p>
                  <p className="text-lg font-bold">{formData.available_time}m</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
