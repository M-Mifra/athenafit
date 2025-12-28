import { Activity, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight">ATHENAFIT</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Readiness Intelligence</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {["Dashboard", "Check-in", "Analytics", "Insights"].map((item, index) => (
            <Button
              key={item}
              variant={index === 0 ? "secondary" : "ghost"}
              size="sm"
              className="font-medium"
            >
              {item}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 py-4">
          <nav className="container flex flex-col gap-2">
            {["Dashboard", "Check-in", "Analytics", "Insights", "Profile"].map((item, index) => (
              <Button
                key={item}
                variant={index === 0 ? "secondary" : "ghost"}
                className="justify-start font-medium"
              >
                {item}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
