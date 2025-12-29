import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";

const Insights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif tracking-tight">Strategy Insights</h1>
          <p className="text-muted-foreground">Deep dives into your training and recovery metrics.</p>
        </div>
        
        <div className="p-8 border border-border/50 rounded-2xl bg-card animate-fade-up">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
          <p className="mb-6">Advanced analytics and historical trends are being calculated. Check back soon for your personalized report.</p>
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

export default Insights;
