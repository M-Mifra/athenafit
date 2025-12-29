import React from "react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { TrendingUp, Activity, BarChart3, Clock } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground text-lg mb-12">Your longitudinal readiness synthesis and adaptation trends.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-card border shadow-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-serif font-semibold">Readiness Trends</h3>
              </div>
              <div className="h-48 bg-muted/30 rounded-xl flex items-center justify-center border border-dashed border-border">
                <p className="text-sm text-muted-foreground italic">Historical synthesis visualization loading...</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-card border shadow-sm border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-serif font-semibold">Volume Adaptation</h3>
              </div>
              <div className="h-48 bg-muted/30 rounded-xl flex items-center justify-center border border-dashed border-border">
                <p className="text-sm text-muted-foreground italic">Training load adaptation model loading...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
