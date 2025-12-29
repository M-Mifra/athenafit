import React from 'react';
import { HeroSection } from "@/components/landing/HeroSection";
import { PopulationInsights } from "@/components/landing/PopulationInsights";
import { MethodologySection } from "@/components/landing/MethodologySection";
import { Navigation } from "@/components/landing/Navigation";
import { ReadinessVisual } from "@/components/landing/ReadinessVisual";
import { TemporalAdaptability } from "@/components/landing/TemporalAdaptability";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { AdaptiveRecommendations } from "@/components/landing/AdaptiveRecommendations";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-cyan-500/30">
      <Navigation />
      <main>
        <HeroSection />
        <ReadinessVisual />
        <MethodologySection />
        <TemporalAdaptability />
        <PopulationInsights />
        <AdaptiveRecommendations />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
