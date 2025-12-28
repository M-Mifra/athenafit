import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding subtle-gradient">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-headline mb-6">
            Ready to train smarter?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands who've discovered the power of readiness-based training. Your body has a story to tell.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl">
              Begin Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="xl">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-10">
            Free 14-day trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
