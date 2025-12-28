import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Platform", "Science", "For Organizations", "Insights"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-xl tracking-tight">ATHENAFIT</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 line-reveal"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = "/auth"}>
            Sign in
          </Button>
          <Button size="sm" onClick={() => window.location.href = "/auth"}>
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
                key={item}
                href="#"
                className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">
                Sign in
              </Button>
              <Button className="w-full">
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
