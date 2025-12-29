import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onStart?: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Beach Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2000&auto=format&fit=crop" 
          alt="People running on beach" 
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/80 tracking-widest uppercase mb-6 animate-fade-up">
            Readiness Intelligence Platform
          </p>
  
          <h1 className="font-serif text-display text-white mb-8 animate-fade-up-delay-1">
            Know when to push.
            <br />
            <span className="italic">Know when to rest.</span>
          </h1>
  
          <p className="text-body-lg text-white/70 max-w-2xl mx-auto mb-12 animate-fade-up-delay-2">
            ATHENAFIT analyzes your daily readiness to recommend the safest, most effective action—training, recovery, or rest—preventing burnout before it begins.
          </p>
  
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
                  <Button 
                    size="xl" 
                    onClick={() => navigate("/onboarding")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-5px_hsl(var(--primary))] transition-all duration-500 scale-105 hover:scale-110 font-bold"
                  >
                    Begin Your Journey
                    <ArrowRight className="h-4 w-4" />
                  </Button>

              <Button variant="outline" size="xl" onClick={onStart}>
                Quick Check-in
              </Button>
            </div>


          <p className="text-xs text-muted-foreground mt-12 animate-fade-up-delay-4">
            Trusted by 50,000+ individuals and leading health organizations
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;

