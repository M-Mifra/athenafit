import { Dumbbell, Heart, Moon, Sparkles } from "lucide-react";
import { ReadinessResult } from "@/lib/readinessEngine";

interface AdaptiveRecommendationsProps {
  assessment?: ReadinessResult | null;
}

const AdaptiveRecommendations = ({ assessment }: AdaptiveRecommendationsProps) => {
  const activeDecision = assessment?.decision || "TRAIN";
  const score = assessment?.readiness_score || 78;
  const explanation = assessment?.explanation || {};

  const getExplanationText = () => {
    const reasons = Object.values(explanation);
    if (reasons.length > 0) {
      return reasons.join(" ");
    }
    return "Based on your current metrics, this recommendation optimizes your training outcome.";
  };

  const recommendations = [
    {
      type: "Train",
      decision: "TRAIN",
      icon: Dumbbell,
      title: "Full Training",
      description: "Your body is primed for a productive session. Push with confidence—your metrics support intensity.",
      explanation: assessment 
        ? `With a ${score}% readiness score and ${assessment.available_time} minutes available, your body is ready for full training.`
        : "Based on 78% readiness, quality sleep, and low soreness, today is optimal for strength training.",
    },
    {
      type: "Recover",
      decision: "ACTIVE_RECOVERY",
      icon: Heart,
      title: "Active Recovery",
      description: "Light movement and mobility work. Ideal when readiness is moderate but recovery is incomplete.",
      explanation: assessment
        ? getExplanationText()
        : "When your HRV dips below baseline, we shift focus to recovery-promoting activities.",
    },
    {
      type: "Rest",
      decision: "REST",
      icon: Moon,
      title: "Complete Rest",
      description: "Mental and physical restoration. Sometimes the best training is no training at all.",
      explanation: assessment
        ? getExplanationText()
        : "High fatigue combined with elevated stress signals the need for complete rest.",
    },
  ];

  return (
    <section id="recommendations" className="section-padding">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Adaptive Intelligence
          </p>
          <h2 className="font-serif text-headline mb-6">
            Personalized recommendations.
            <br />
            <span className="italic">Transparent reasoning.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Our AI doesn't just tell you what to do—it explains why. Every recommendation comes with clear reasoning, helping you build intuition about your own body.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            const isActive = rec.decision === activeDecision;
            return (
              <div
                key={rec.type}
                className={`editorial-card rounded-xl overflow-hidden transition-all duration-500 ${
                  isActive 
                    ? "ring-1 ring-foreground/10" 
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className={`h-px ${isActive ? "bg-foreground" : "bg-border"}`} />
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">
                      {rec.type}
                    </span>
                    {isActive && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-serif text-title mb-3">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {rec.description}
                  </p>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Why this plan
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rec.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdaptiveRecommendations;
