import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStart?: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6 animate-fade-up">
            Readiness Intelligence Platform
          </p>
  
          {/* Headline */}
          <h1 className="font-serif text-display mb-8 animate-fade-up-delay-1">
            Know when to push.
            <br />
            <span className="italic">Know when to rest.</span>
          </h1>
  
          {/* Subheadline */}
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up-delay-2">
            ATHENAFIT analyzes your daily readiness to recommend the safest, most effective action—training, recovery, or rest—preventing burnout before it begins.
          </p>
  
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
              <Button 
                size="xl" 
                onClick={onStart}
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)] transition-all duration-500 scale-105 hover:scale-110"
              >
                Start Your Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="xl">
                View the Science
              </Button>
            </div>


          {/* Trust indicator */}
          <p className="text-xs text-muted-foreground mt-12 animate-fade-up-delay-4">
            Trusted by 50,000+ individuals and leading health organizations
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
