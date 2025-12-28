import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2, History, RefreshCw, BookOpen, Microscope, BrainCircuit, Activity, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BiologicalCheckIn, { BiologicalData } from "@/components/dashboard/BiologicalCheckIn";
import EnvironmentInput from "@/components/dashboard/EnvironmentInput";
import WorkoutRecommendation from "@/components/dashboard/WorkoutRecommendation";
import StrategyInsights from "@/components/dashboard/StrategyInsights";
import { getCombinedReadiness, CombinedResult, EnvironmentInput as EnvironmentInputType, calculateReadiness, calculateEnvironmentImpact } from "@/lib/readinessEngine";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CombinedResult | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(true);
  
  const [bioData, setBioData] = useState({
    sleep: 4,
    energy: 3,
    stress: 3,
    soreness: 2,
    timeAvailable: 3,
  });

  const [envData, setEnvData] = useState<EnvironmentInputType>({
    aqi: 50,
    temperature_celsius: 22,
    is_heatwave: false,
    lockdown_status: "none",
    has_local_event: false,
  });

  const livePreview = getCombinedReadiness(bioData, envData);

  const handleBiologicalChange = (data: BiologicalData) => {
  };

  const handleEnvironmentSubmit = (data: Omit<EnvironmentInputType, "user_id">) => {
    setEnvData(data as EnvironmentInputType);
    toast.success("Environment conditions updated");
  };

  const handleGenerateRecommendation = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const combinedResult = getCombinedReadiness(bioData, envData);
      setResult(combinedResult);
      setShowLivePreview(false);
      toast.success("Recommendation generated successfully!");
    } catch (error) {
      console.error("Error calculating readiness:", error);
      toast.error("Failed to generate recommendation");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setShowLivePreview(true);
    setBioData({
      sleep: 4,
      energy: 3,
      stress: 3,
      soreness: 2,
      timeAvailable: 3,
    });
    setEnvData({
      aqi: 50,
      temperature_celsius: 22,
      is_heatwave: false,
      lockdown_status: "none",
      has_local_event: false,
    });
    toast.info("Assessment reset");
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "TRAIN": return "text-green-500";
      case "ACTIVE_RECOVERY": return "text-blue-500";
      case "REST": return "text-purple-500";
      default: return "text-gray-500";
    }
  };

  const getDecisionBg = (decision: string) => {
    switch (decision) {
      case "TRAIN": return "bg-green-500/10 border-green-500/30";
      case "ACTIVE_RECOVERY": return "bg-blue-500/10 border-blue-500/30";
      case "REST": return "bg-purple-500/10 border-purple-500/30";
      default: return "bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <span className="font-serif text-xl">ATHENAFIT</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <History className="h-4 w-4" />
              History
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl mb-2">Daily Readiness Assessment</h1>
            <p className="text-muted-foreground">
              Combine your biological state with environmental conditions for an optimal workout recommendation.
            </p>
          </div>

          {showLivePreview && !result && (
            <div className={`mb-8 p-4 rounded-xl border ${getDecisionBg(livePreview.final_decision)} transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className={`h-5 w-5 ${getDecisionColor(livePreview.final_decision)}`} />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Live Preview</p>
                    <p className={`font-serif text-lg font-medium ${getDecisionColor(livePreview.final_decision)}`}>
                      {livePreview.final_decision.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Readiness Score</p>
                  <p className="font-mono text-2xl font-bold">{livePreview.readiness_score}</p>
                </div>
              </div>
            </div>
          )}

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <BiologicalCheckIn 
                  onDataChange={handleBiologicalChange}
                  data={bioData}
                  setData={setBioData}
                />
                
                <EnvironmentInput 
                  onSubmit={handleEnvironmentSubmit}
                  loading={false}
                />

                <Button
                  onClick={handleGenerateRecommendation}
                  disabled={loading}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x hover:scale-[1.02] active:scale-95 transition-all rounded-xl shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Generate Combined Recommendation
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                {result ? (
                  <WorkoutRecommendation result={result} />
                ) : (
                  <>
                    <div className="editorial-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-serif text-xl">Live Analysis Preview</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                          <p className="text-xs text-muted-foreground uppercase mb-1">Readiness</p>
                          <p className="font-mono text-3xl font-bold">{livePreview.readiness_score}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                          <p className="text-xs text-muted-foreground uppercase mb-1">Decision</p>
                          <p className={`font-serif text-xl font-medium ${getDecisionColor(livePreview.final_decision)}`}>
                            {livePreview.final_decision.replace("_", " ")}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-muted-foreground">Max Intensity</span>
                          <span className="font-mono font-medium">{livePreview.constraints.max_intensity_percent}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-muted-foreground">Max Duration</span>
                          <span className="font-mono font-medium">{livePreview.constraints.max_duration_minutes} min</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-muted-foreground">Location</span>
                          <span className="font-medium capitalize">{livePreview.constraints.recommended_location}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                          <span className="text-sm text-muted-foreground">Environment Risk</span>
                          <span className={`font-medium capitalize ${
                            livePreview.environment_severity === "low" ? "text-green-500" :
                            livePreview.environment_severity === "moderate" ? "text-yellow-500" :
                            livePreview.environment_severity === "high" ? "text-orange-500" : "text-red-500"
                          }`}>{livePreview.environment_severity}</span>
                        </div>
                      </div>
                    </div>

                    <StrategyInsights 
                      decision={livePreview.final_decision} 
                      score={livePreview.readiness_score}
                      constraints={livePreview.constraints}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-border">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl mb-4">Science & Methodology</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Athenafit utilizes a multi-layered algorithm that synthesizes biometric data with real-time environmental and policy constraints.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl">Biological Readiness</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our model weighs sleep quality, autonomic stress indicators, and perceived muscle soreness. Research shows that <span className="text-foreground font-medium">sleep debt</span> is the primary predictor of injury risk in high-performance athletes.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border/50">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      Sleep quality weighted at 40% of total score
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      HRV-based stress assessment (proxy from perceived stress)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      CNS fatigue detection from energy levels
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl">Environmental Load</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    External stressors like <span className="text-foreground font-medium">PM2.5 concentration (AQI)</span> and heat index impact VO2 max and metabolic efficiency. We implement WHO-standard thresholds for hazardous conditions.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border/50">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      AQI &gt; 100: 20% intensity reduction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      AQI &gt; 150: Indoor activities only
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      Heat index &gt; 35°C: Extended rest periods required
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl">Policy Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Local ordinances, lockdowns, and major events are processed as hard constraints to ensure legal and social safety, automatically adjusting your training location and intensity.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border/50">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      Partial lockdown: Home workouts preferred
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      Full lockdown: Home-only, max 60% intensity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      Local events: Avoid crowded outdoor areas
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <h4 className="font-serif text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Algorithm Overview
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Readiness Score Calculation</p>
                    <code className="block text-xs bg-background p-3 rounded-lg font-mono text-muted-foreground">
                      score = sleep_score (40%) + stress_score (20%) + fatigue_score (20%) + soreness_score (20%)
                    </code>
                    <ul className="mt-3 text-xs text-muted-foreground space-y-1">
                      <li>• Score &gt; 65: TRAIN (full intensity)</li>
                      <li>• Score 40-65: ACTIVE_RECOVERY</li>
                      <li>• Score &lt; 40: REST</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Decision Modifiers</p>
                    <ul className="text-xs text-muted-foreground space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-medium">Critical</span>
                        Sleep &lt; 5h → Force REST
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 font-medium">High</span>
                        Fatigue/Soreness &gt; 8 → Downgrade to RECOVERY
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-medium">Moderate</span>
                        Time &lt; 30m → Suggest RECOVERY
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-medium">Environment</span>
                        Critical severity → Cap at RECOVERY
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

};

export default Dashboard;
