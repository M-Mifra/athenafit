import { useState } from "react";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

    const navItems = [
      { label: "Platform", href: "/dashboard" },
      { label: "Science", href: "/science" },
      { label: "Insights", href: "#" },
    ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-xl tracking-tight">ATHENAFIT</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("/")) {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 line-reveal"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </Button>
          <Button size="sm" onClick={() => navigate("/auth")}>
            Get Started
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/")) {
                      e.preventDefault();
                      navigate(item.href);
                      setIsOpen(false);
                    }
                  }}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full" onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button className="w-full" onClick={() => { navigate("/auth"); setIsOpen(false); }}>
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
    </header>
  );
};

export default Navigation;
