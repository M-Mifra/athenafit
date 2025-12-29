import { useState } from "react";
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

const Index = () => {
  const [assessmentResult, setAssessmentResult] = useState<ReadinessResult | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
          <main>
            <HeroSection />
            <ReadinessVisual assessment={assessmentResult} />
            <TemporalAdaptability />
            <AdaptiveRecommendations assessment={assessmentResult} />
            <PopulationInsights />
            <ScienceSection />
            <CTASection />
          </main>
  
        <Footer />
      </div>
    );
};

export default Index;
