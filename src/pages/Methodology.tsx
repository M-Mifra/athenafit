import React from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import ScienceSection from "@/components/landing/ScienceSection";

const Methodology = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">The Science of Readiness</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AthenaFit synthesizes heart rate variability, circadian biology, and environmental pressure 
              into a single, actionable training vector.
            </p>
          </div>
          <ScienceSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Methodology;
