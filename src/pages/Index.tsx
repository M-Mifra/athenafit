import { useState } from "react";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import ReadinessVisual from "@/components/landing/ReadinessVisual";
import AdaptiveRecommendations from "@/components/landing/AdaptiveRecommendations";
import PopulationInsights from "@/components/landing/PopulationInsights";
import ScienceSection from "@/components/landing/ScienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import QuickCheckIn from "@/components/dashboard/QuickCheckIn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection onStart={() => setIsCheckInOpen(true)} />
        <ReadinessVisual assessment={assessmentResult} />
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
            setTimeout(() => setIsCheckInOpen(false), 2000);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
