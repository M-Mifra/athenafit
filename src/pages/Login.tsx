import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-serif font-bold tracking-tight">AthenaFit</CardTitle>
          <CardDescription>Enter your credentials to access your training synthesis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Email" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Password" className="rounded-xl" />
          </div>
          <Button onClick={() => navigate("/onboarding")} className="w-full h-12 rounded-xl text-lg font-semibold">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
