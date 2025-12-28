import { Clock, Zap, ArrowRight, ShieldCheck } from "lucide-react";

const TemporalAdaptability = () => {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Clock className="h-3 w-3" />
              Dynamic Scaling
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Training that respects <br />
              <span className="italic">your temporal reality.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              ATHENAFIT doesn't just measure your biology; it respects your schedule. Our engine dynamically scales intensity and volume based on your available window, ensuring every minute contributes to your progress.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="mt-1 p-2 rounded-lg bg-accent/20 text-accent">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Micro-Dose Efficiency</h4>
                  <p className="text-xs text-muted-foreground mt-1">Under 30 minutes? We prioritize high-yield movement patterns that maximize stimulus in minimal time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="mt-1 p-2 rounded-lg bg-success/20 text-success">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Recovery Guardrails</h4>
                  <p className="text-xs text-muted-foreground mt-1">When time is tight but stress is high, we automatically shift to active recovery to prevent burnout.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer" onClick={() => document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20" />
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" 
                alt="Temporal Adaptation" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Resulting Strategy</p>
                    <p className="font-serif text-xl font-bold">Optimized for 30m</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary text-white shadow-lg">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute -top-4 -right-4 bg-accent p-3 rounded-xl shadow-2xl text-white text-[10px] font-bold uppercase tracking-widest animate-bounce">
              Scroll to Strategy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemporalAdaptability;
