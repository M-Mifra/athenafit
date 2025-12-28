import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2, History, RefreshCw, BookOpen, Microscope, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BiologicalCheckIn, { BiologicalData } from "@/components/dashboard/BiologicalCheckIn";
import EnvironmentInput from "@/components/dashboard/EnvironmentInput";
import WorkoutRecommendation from "@/components/dashboard/WorkoutRecommendation";
import { api, CombinedReadinessResponse, EnvironmentInput as EnvironmentInputType } from "@/lib/api";
import { calculateReadiness } from "@/lib/readinessEngine";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CombinedReadinessResponse | null>(null);
  
  const [bioData, setBioData] = useState({
    sleep: 4,
    energy: 3,
    stress: 3,
    soreness: 2,
    timeAvailable: 3,
  });

  const [biologicalApiData, setBiologicalApiData] = useState<BiologicalData>({
    sleep_hours: 8.5,
    stress_level: 5,
    fatigue_level: 5,
    muscle_soreness: 7,
    available_time: 45,
  });

  const [envData, setEnvData] = useState<Omit<EnvironmentInputType, "user_id">>({
    aqi: 50,
    temperature_celsius: 22,
    is_heatwave: false,
    lockdown_status: "none",
    has_local_event: false,
  });

  const handleBiologicalChange = (data: BiologicalData) => {
    setBiologicalApiData(data);
  };

  const handleEnvironmentSubmit = (data: Omit<EnvironmentInputType, "user_id">) => {
    setEnvData(data);
    toast.success("Environment conditions updated");
  };

  const handleGenerateRecommendation = async () => {
    setLoading(true);
    
    try {
      const combinedData = {
        user_id: 1,
        ...biologicalApiData,
        ...envData,
      };

      const response = await api.getCombinedReadiness(combinedData);
      setResult(response);
      toast.success("Recommendation generated successfully!");
    } catch (error) {
      console.warn("Backend unavailable, using local fallback:", error);
      
      const localResult = calculateReadiness({
        sleep: bioData.sleep,
        energy: bioData.energy,
        stress: bioData.stress,
        soreness: bioData.soreness,
        timeAvailable: bioData.timeAvailable,
      });
      
      const mockResponse: CombinedReadinessResponse = {
        readiness_score: localResult.readiness_score,
        base_decision: localResult.decision as "TRAIN" | "ACTIVE_RECOVERY" | "REST",
        final_decision: localResult.decision as "TRAIN" | "ACTIVE_RECOVERY" | "REST",
        readiness_explanation: localResult.explanation,
        environment_adjustments: envData.aqi > 150 ? [{
          rule_id: "AQI_001",
          trigger: `AQI = ${envData.aqi}`,
          action: "Reduce outdoor activity",
          reason: `Air quality is poor (AQI ${envData.aqi}). Consider indoor alternatives.`
        }] : [],
        constraints: {
          allow_outdoor: envData.aqi <= 150 && !envData.is_heatwave,
          max_intensity_percent: envData.is_heatwave ? 60 : (envData.aqi > 100 ? 70 : 100),
          max_duration_minutes: envData.is_heatwave ? 30 : 90,
          recommended_location: envData.lockdown_status === "full" ? "home" : (envData.aqi > 150 ? "indoor" : "any"),
          blocked_workout_types: envData.aqi > 200 ? ["running", "cycling", "outdoor cardio"] : [],
          suggested_workout_types: envData.lockdown_status === "full" ? ["yoga", "bodyweight", "stretching"] : ["strength", "cardio", "flexibility"],
        },
        environment_severity: envData.aqi > 200 || envData.lockdown_status === "full" ? "critical" : 
                              (envData.aqi > 100 || envData.is_heatwave ? "moderate" : "low"),
      };
      
      setResult(mockResponse);
      toast.info("Using local engine (backend offline)");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
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
                <WorkoutRecommendation result={result} />
                
                {!result && (
                  <div className="editorial-card rounded-2xl p-8 bg-muted/30 border-dashed border-2 border-border flex flex-col items-center justify-center text-center">
                    <Microscope className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-serif text-lg text-muted-foreground">Awaiting Assessment</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2">
                      Enter your biological and environmental metrics to unlock science-based training insights.
                    </p>
                  </div>
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
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl">Environmental Load</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    External stressors like <span className="text-foreground font-medium">PM2.5 concentration (AQI)</span> and heat index impact VO2 max and metabolic efficiency. We implement WHO-standard thresholds for hazardous conditions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl">Policy Integration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Local ordinances, lockdowns, and major events are processed as hard constraints to ensure legal and social safety, automatically adjusting your training location and intensity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );

};

export default Dashboard;
