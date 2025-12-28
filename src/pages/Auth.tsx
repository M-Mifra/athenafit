import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Registration successful! Please check your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-black overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black to-accent/30 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 inline-block mb-8">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-5xl font-bold text-white mb-6 leading-tight">
            Master your <span className="italic">biological</span> potential.
          </h1>
          <p className="text-xl text-white/70 font-medium">
            Join the elite collective using intelligence to redefine the boundaries of performance and recovery.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-24 bg-background">
        <div className="max-w-md w-full mx-auto">
          <Button 
            variant="ghost" 
            className="mb-12 -ml-4 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Platform
          </Button>

          <div className="mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">
              {isRegister ? "Begin Your Journey" : "Welcome Back"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {isRegister 
                ? "Enter your details to create your biological profile." 
                : "Sign in to access your readiness insights."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="h-12 bg-secondary/50 border-white/5 focus:border-primary/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 bg-secondary/50 border-white/5 focus:border-primary/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent shadow-xl shadow-primary/10"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isRegister ? "Create Profile" : "Sign In")}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister 
                ? "Already have a profile? Sign in" 
                : "Don't have a profile? Register now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
