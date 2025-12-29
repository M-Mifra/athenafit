import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif tracking-tight">Welcome to ATHENAFIT</h1>
          <p className="text-muted-foreground">Let's set up your profile to start your readiness journey.</p>
        </div>
        
        <div className="p-8 border border-border/50 rounded-2xl bg-card animate-fade-up">
          <UserPlus className="h-12 w-12 mx-auto mb-4 text-primary" />
          <p className="mb-6">Profile setup is coming soon. Please head to the dashboard to start a quick assessment.</p>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Go to Dashboard
          </Button>
        </div>

        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
