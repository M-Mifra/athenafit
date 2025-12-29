import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Zap, BarChart3 } from "lucide-react";

export const MethodologySection = () => {
  const pillars = [
    {
      title: "Biological Feedback",
      description: "Real-time analysis of HRV, sleep quality, and physical fatigue markers.",
      icon: <Activity className="w-8 h-8 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-500/5"
    },
    {
      title: "Neural Readiness",
      description: "Cognitive assessment to determine CNS load and mental fatigue levels.",
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      title: "Adaptive Loading",
      description: "Dynamic adjustment of training volume based on daily recovery scores.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      title: "Science-Backed",
      description: "Algorithms based on peer-reviewed sports science and endocrinology.",
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      color: "from-green-500/20 to-green-500/5"
    }
  ];

  return (
    <section className="py-24 bg-black/50 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Our Methodology
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We combine high-resolution biological data with advanced performance algorithms to deliver precision training.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className={`bg-gradient-to-br ${pillar.color} border-white/5 hover:border-white/20 transition-all duration-300`}>
              <CardHeader>
                <div className="mb-4">{pillar.icon}</div>
                <CardTitle className="text-xl text-white">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
