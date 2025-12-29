import React, { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import ReadinessVisual from "@/components/landing/ReadinessVisual";
import TemporalAdaptability from "@/components/landing/TemporalAdaptability";
import AdaptiveRecommendations from "@/components/landing/AdaptiveRecommendations";
import PopulationInsights from "@/components/landing/PopulationInsights";
import ScienceSection from "@/components/landing/ScienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import QuickCheckIn from "@/components/dashboard/QuickCheckIn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReadinessResult } from "@/lib/readinessEngine";

const Landing = () => {
  const [assessmentResult, setAssessmentResult] = useState<ReadinessResult | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection onStart={() => setIsCheckInOpen(true)} />
        <ReadinessVisual assessment={assessmentResult} />
        <TemporalAdaptability />
        <AdaptiveRecommendations assessment={assessmentResult} />
        <PopulationInsights />
        <ScienceSection />
        <CTASection />
      </main>

      <Footer />

      <Dialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 bg-transparent border-none">
          <QuickCheckIn onResult={(res) => {
            setAssessmentResult(res);
            setTimeout(() => {
              setIsCheckInOpen(false);
              document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
