import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2, History, RefreshCw, BookOpen, Microscope, BrainCircuit, Activity, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BiologicalCheckIn, { BiologicalData } from "@/components/dashboard/BiologicalCheckIn";
import EnvironmentInput from "@/components/dashboard/EnvironmentInput";
import WorkoutRecommendation from "@/components/dashboard/WorkoutRecommendation";
import StrategyInsights from "@/components/dashboard/StrategyInsights";
import { getCombinedReadiness, CombinedResult, EnvironmentInput as EnvironmentInputType } from "@/lib/readinessEngine";

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

  const [livePreview, setLivePreview] = useState<CombinedResult>(getCombinedReadiness(bioData, envData));

  // Sync live preview when inputs change
  useEffect(() => {
    setLivePreview(getCombinedReadiness(bioData, envData));
  }, [bioData, envData]);

  const handleBiologicalChange = (data: BiologicalData) => {
    // State is already updated via setData in BiologicalCheckIn
    // This callback can be used for additional logic if needed
  };

  const handleEnvironmentSubmit = (data: Omit<EnvironmentInputType, "user_id">) => {
    setEnvData(data as EnvironmentInputType);
    toast.success("Environment conditions updated");
  };

  const handleGenerateRecommendation = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const combinedResult = getCombinedReadiness(bioData, envData);
      setResult(combinedResult);
      setShowLivePreview(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-background text-foreground">
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
            <span className="font-serif text-xl tracking-tight">ATHENAFIT</span>
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

      <main className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Daily Readiness & Strategy</h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Precision training through biological synthesis and environmental intelligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Inputs */}
            <div className="lg:col-span-7 space-y-8">
              <BiologicalCheckIn 
                onDataChange={handleBiologicalChange}
                data={bioData}
                setData={setBioData}
              />
              
              <EnvironmentInput 
                onSubmit={handleEnvironmentSubmit}
                loading={false}
                data={envData}
                setData={setEnvData}
              />

              <div className="pt-4">
                <Button
                  onClick={handleGenerateRecommendation}
                  disabled={loading}
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x hover:scale-[1.01] active:scale-[0.98] transition-all rounded-2xl shadow-xl shadow-primary/20 border-t border-white/20"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Generate Training Strategy
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4 italic">
                  Algorithm combines biological state with environmental & policy constraints
                </p>
              </div>
            </div>

            {/* Right Column: Preview/Result */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              {result ? (
                <WorkoutRecommendation result={result} />
              ) : (
                <div className="space-y-6">
                  {/* Live Preview Header */}
                  <div className={`p-5 rounded-2xl border ${getDecisionBg(livePreview.final_decision)} transition-all duration-500 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getDecisionBg(livePreview.final_decision)}`}>
                          <Activity className={`h-5 w-5 ${getDecisionColor(livePreview.final_decision)}`} />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Live Assessment</p>
                          <p className={`font-serif text-xl font-semibold ${getDecisionColor(livePreview.final_decision)}`}>
                            {livePreview.final_decision.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Readiness</p>
                        <p className="font-mono text-3xl font-black tabular-nums">{livePreview.readiness_score}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <PreviewStat label="Max Intensity" value={`${livePreview.constraints.max_intensity_percent}%`} />
                      <PreviewStat label="Max Duration" value={`${livePreview.constraints.max_duration_minutes}m`} />
                    </div>
                  </div>

                  {/* Strategy Preview */}
                  <div className="editorial-card rounded-2xl overflow-hidden border border-border/50">
                    <div className="bg-muted/50 p-4 border-b border-border/50 flex items-center justify-between">
                      <h3 className="font-serif text-lg flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Resulting Strategy
                      </h3>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Live Preview</span>
                    </div>
                    <div className="p-0">
                      <StrategyInsights 
                        decision={livePreview.final_decision} 
                        score={livePreview.readiness_score}
                        constraints={livePreview.constraints}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Science & Methodology Section */}
          <section className="mt-24 pt-16 border-t border-border/50">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-serif text-4xl mb-6">Science & Methodology</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Athenafit utilizes a multi-layered synthesis engine that merges biological readiness with real-time environmental and policy intelligence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <ScienceCard 
                icon={<BrainCircuit className="h-7 w-7" />}
                title="Biological Synthesis"
                description="Weighting sleep architecture (40%), autonomic stress (20%), and metabolic fatigue (40%) to determine baseline capacity."
                color="primary"
                points={[
                  "Sleep quality as primary injury predictor",
                  "CNS fatigue detection through energy metrics",
                  "Peripheral recovery via soreness assessment"
                ]}
              />
              
              <ScienceCard 
                icon={<Microscope className="h-7 w-7" />}
                title="Environmental Load"
                description="Processing PM2.5 concentration, heat index, and metabolic efficiency variables based on WHO health standards."
                color="accent"
                points={[
                  "AQI-based intensity caps",
                  "Thermal stress duration modifiers",
                  "Hazardous condition lockdowns"
                ]}
              />

              <ScienceCard 
                icon={<BookOpen className="h-7 w-7" />}
                title="Policy Constraints"
                description="Hard-coded legal and safety constraints based on local ordinances, lockdowns, and major social events."
                color="primary"
                points={[
                  "Automatic location re-routing",
                  "Movement restriction compliance",
                  "Crowd-avoidance safety logic"
                ]}
              />
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-muted/50 to-muted border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="h-6 w-6 text-primary" />
                <h4 className="font-serif text-2xl">Algorithm Architecture</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Readiness Function</p>
                    <div className="bg-background p-4 rounded-xl font-mono text-sm border border-border/50 shadow-inner">
                      R = Σ(S*0.4, ST*0.2, F*0.2, MS*0.2)
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xl font-black">65+</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Train</p>
                    </div>
                    <div className="text-center border-x border-border/50 px-4">
                      <p className="text-xl font-black">40-65</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Recovery</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-black">&lt;40</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Rest</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Priority Adjusters</p>
                  <div className="space-y-3">
                    <AdjusterItem label="Sleep < 5h" effect="Force REST" severity="critical" />
                    <AdjusterItem label="AQI > 150" effect="Indoor Only" severity="high" />
                    <AdjusterItem label="Heatwave" effect="Cap Intensity 50%" severity="high" />
                    <AdjusterItem label="Lockdown" effect="Home Workouts" severity="critical" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const PreviewStat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-background/40 backdrop-blur-sm p-3 rounded-xl border border-border/30">
    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter mb-1">{label}</p>
    <p className="font-mono text-lg font-bold">{value}</p>
  </div>
);

const ScienceCard = ({ icon, title, description, color, points }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: "primary" | "accent";
  points: string[];
}) => (
  <div className="group space-y-5">
    <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="font-serif text-2xl tracking-tight">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
    <ul className="space-y-2.5 pt-4 border-t border-border/50">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
          <div className={`w-1.5 h-1.5 rounded-full bg-${color} mt-1.5 flex-shrink-0`} />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const AdjusterItem = ({ label, effect, severity }: { label: string; effect: string; severity: "critical" | "high" }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30">
    <span className="text-xs font-medium">{label}</span>
    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
      severity === 'critical' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
    }`}>
      {effect}
    </span>
  </div>
);

export default Dashboard;
