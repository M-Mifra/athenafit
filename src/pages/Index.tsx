import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import ReadinessVisual from "@/components/landing/ReadinessVisual";
import AdaptiveRecommendations from "@/components/landing/AdaptiveRecommendations";
import PopulationInsights from "@/components/landing/PopulationInsights";
import ScienceSection from "@/components/landing/ScienceSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ReadinessVisual />
        <AdaptiveRecommendations />
        <PopulationInsights />
        <ScienceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
