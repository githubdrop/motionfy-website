import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

// DNA M Logo - M shaped with DNA helix elements
const MotionfyLogo = () => (
  <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 30V6" stroke="url(#footerDnaGrad)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M3 10C6 10, 9 10, 9 10M3 18C6 18, 9 18, 9 18M3 26C6 26, 9 26, 9 26" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M6 6C10 14, 17 22, 21 28" stroke="url(#footerDnaGrad)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M36 6C32 14, 25 22, 21 28" stroke="url(#footerDnaGrad2)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <line x1="10" y1="12" x2="32" y2="12" stroke="hsl(173, 80%, 48%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="14" y1="18" x2="28" y2="18" stroke="hsl(174, 100%, 45%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="18" y1="24" x2="24" y2="24" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <path d="M36 30V6" stroke="url(#footerDnaGrad2)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M33 10C36 10, 39 10, 39 10M33 18C36 18, 39 18, 39 18M33 26C36 26, 39 26, 39 26" stroke="hsl(174, 100%, 45%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <circle cx="6" cy="6" r="2.5" fill="hsl(172, 66%, 55%)"/>
    <circle cx="36" cy="6" r="2.5" fill="hsl(174, 100%, 50%)"/>
    <circle cx="21" cy="28" r="3" fill="hsl(173, 80%, 50%)"/>
    <circle cx="21" cy="28" r="5" fill="hsl(173, 80%, 50%)" opacity="0.2"/>
    <defs>
      <linearGradient id="footerDnaGrad" x1="6" y1="6" x2="21" y2="28">
        <stop stopColor="hsl(172, 66%, 55%)" />
        <stop offset="1" stopColor="hsl(173, 80%, 50%)" />
      </linearGradient>
      <linearGradient id="footerDnaGrad2" x1="36" y1="6" x2="21" y2="28">
        <stop stopColor="hsl(174, 100%, 50%)" />
        <stop offset="1" stopColor="hsl(173, 80%, 50%)" />
      </linearGradient>
    </defs>
  </svg>
);

const footerLinks = {
  company: [
    { name: "About", path: "/about" },
    { name: "Team", path: "/about#team" },
    { name: "Careers", path: "/contact" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Brand Strategy", path: "/services" },
    { name: "Digital Marketing", path: "/services" },
    { name: "Scientific Comms", path: "/services" },
    { name: "Regulatory", path: "/services" },
  ],
  resources: [
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Insights", path: "/blog" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30">
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6" data-testid="footer-logo">
              <MotionfyLogo />
              <span className="font-heading font-semibold text-xl">
                <span className="text-foreground">Motion</span>
                <span className="text-primary">fy</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              We transform breakthrough science into market leadership. Strategic marketing for life sciences companies.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@motionfy.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                  data-testid={`footer-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>Boston • London</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Motionfy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
