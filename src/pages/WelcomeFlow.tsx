import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomeFlow = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-serif tracking-tight">Welcome to AthenaFit</h1>
        <p className="text-muted-foreground text-lg">Let's synthesize your biological markers.</p>
        <Button onClick={() => navigate("/dashboard")} className="rounded-full px-8">Start Synthesis</Button>
      </div>
    </div>
  );
};

export default WelcomeFlow;
