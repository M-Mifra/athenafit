import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MethodologySection } from "@/components/landing/MethodologySection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Methodology = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-white/10"
        >
          ← Back to Home
        </Button>
        <MethodologySection />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Data Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                All biological data is encrypted and anonymized. We never sell your personal information.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Research-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Our models are updated monthly based on the latest findings in sports science research.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
