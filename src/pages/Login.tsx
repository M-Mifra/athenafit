import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-10 h-10 text-cyan-500" />
          </div>
          <CardTitle className="text-2xl font-bold">{isLogin ? 'Secure Access' : 'Begin Journey'}</CardTitle>
          <p className="text-gray-400 text-sm mt-2">Precision training requires precision data.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Work/Personal Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <Input id="email" type="email" placeholder="name@example.com" className="bg-white/5 border-white/10 pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <Input id="password" type="password" className="bg-white/5 border-white/10 pl-10" />
            </div>
          </div>
          <Button 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
            onClick={() => navigate('/onboarding')}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-center mt-4">
            <button 
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
