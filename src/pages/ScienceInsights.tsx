import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Microscope, BrainCircuit, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScienceInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Platform
            </Button>
            <div className="h-6 w-px bg-border" />
            <span className="font-serif text-xl tracking-tight">ATHENAFIT</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>Home</Button>
          </div>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
              <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight">Science & Methodology</h1>
              <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
                Our multi-layered synthesis engine merges biological readiness with real-time environmental and policy intelligence to optimize human performance.
              </p>
            </div>

              <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
                <ScienceCard 
                  icon={<BrainCircuit className="h-8 w-8" />}
                  title="Personalization Logic"
                  description="Dynamic volume scaling (DVS) adjusts intensity and duration based on your 24-hour biological delta."
                  color="primary"
                  points={[
                    "Intensity capping (60-100% range)",
                    "Duration optimization (15-120 min)",
                    "CNS-aware volume adjustment"
                  ]}
                />
                
                <ScienceCard 
                  icon={<Microscope className="h-8 w-8" />}
                  title="Readiness Scoring"
                  description="Multi-factor synthesis of sleep architecture, autonomic stress, and metabolic energy reserves."
                  color="accent"
                  points={[
                    "40% Sleep Architecture weight",
                    "20% Autonomic Stress (HRV-proxy)",
                    "40% Metabolic Fatigue index"
                  ]}
                />

                <ScienceCard 
                  icon={<BookOpen className="h-8 w-8" />}
                  title="Safety Framework"
                  description="External policy and environmental overrides that prioritize long-term health over immediate output."
                  color="primary"
                  points={[
                    "AQI-triggered respiratory protection",
                    "Heat-index duration dampening",
                    "Policy-driven movement compliance"
                  ]}
                />
              </div>

            <div className="mt-24 p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl">Algorithm Architecture</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
                  <div className="space-y-10">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Readiness Function</p>
                      <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl font-mono text-xl md:text-2xl border border-border/50 shadow-inner flex items-center justify-center">
                        R = Σ(S*0.4, ST*0.2, F*0.2, MS*0.2)
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">Threshold Mapping</p>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center">
                          <p className="text-3xl font-black text-green-500">65+</p>
                          <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Train</p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
                          <p className="text-3xl font-black text-blue-500">40-65</p>
                          <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Recovery</p>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center">
                          <p className="text-3xl font-black text-purple-500">&lt;40</p>
                          <p className="text-xs text-muted-foreground uppercase font-bold mt-1">Rest</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">Priority Safety Adjusters</p>
                    <div className="space-y-4">
                      <AdjusterItem label="Sleep < 5h" effect="Force REST" severity="critical" />
                      <AdjusterItem label="AQI > 150" effect="Indoor Only" severity="high" />
                      <AdjusterItem label="Heatwave" effect="Cap Intensity 50%" severity="high" />
                      <AdjusterItem label="Lockdown" effect="Home Workouts" severity="critical" />
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-6 leading-relaxed">
                      *Adjusters take precedence over the readiness score. Safety protocols are triggered automatically based on environmental sensor data and policy feeds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 text-center">
              <h3 className="font-serif text-3xl mb-8">Ready to assess your state?</h3>
              <Button 
                size="lg" 
                onClick={() => navigate("/dashboard")}
                className="h-14 px-10 text-lg rounded-full"
              >
                Go to Platform
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const ScienceCard = ({ icon, title, description, color, points }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: "primary" | "accent";
  points: string[];
}) => (
  <div className="group space-y-6 flex flex-col h-full">
    <div className={`w-16 h-16 rounded-3xl bg-${color}/10 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform duration-500 border border-${color}/20 shadow-lg shadow-${color}/5`}>
      {icon}
    </div>
    <div className="space-y-4 flex-grow">
      <h3 className="font-serif text-3xl tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed font-light">
        {description}
      </p>
    </div>
    <ul className="space-y-4 pt-8 border-t border-border/50">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          <div className={`w-2 h-2 rounded-full bg-${color} mt-1.5 flex-shrink-0 shadow-[0_0_10px_rgba(var(--${color}),0.5)]`} />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const AdjusterItem = ({ label, effect, severity }: { label: string; effect: string; severity: "critical" | "high" }) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors group">
    <span className="text-base font-medium">{label}</span>
    <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg tracking-widest ${
      severity === 'critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
    }`}>
      {effect}
    </span>
  </div>
);

export default ScienceInsights;
