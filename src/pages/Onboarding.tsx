import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Onboarding</h1>
        <p className="text-muted-foreground">Welcome to the platform. Let's get you set up.</p>
        <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
      </div>
    </div>
  );
};

export default Onboarding;
