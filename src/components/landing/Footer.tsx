import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Platform: ["Features", "Pricing", "Security", "Enterprise"],
  Company: ["About", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "Research", "Blog", "Support"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-serif text-xl tracking-tight">ATHENAFIT</span>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Readiness intelligence for individuals and organizations. Train smarter, recover better, perform sustainably.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ATHENAFIT. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                {social}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
