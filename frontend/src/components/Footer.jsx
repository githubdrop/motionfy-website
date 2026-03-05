import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

// Molecule M Logo - Bold & Iconic
const MotionfyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M8 30L8 10L20 22L32 10L32 30"
      stroke="url(#footerMoleculeGrad)" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="8" cy="10" r="3.5" fill="hsl(172, 66%, 50%)"/>
    <circle cx="20" cy="22" r="4" fill="hsl(174, 100%, 45%)"/>
    <circle cx="32" cy="10" r="3.5" fill="hsl(172, 66%, 50%)"/>
    <circle cx="8" cy="30" r="2.5" fill="hsl(172, 66%, 40%)" opacity="0.8"/>
    <circle cx="32" cy="30" r="2.5" fill="hsl(172, 66%, 40%)" opacity="0.8"/>
    <circle cx="20" cy="22" r="6" fill="hsl(174, 100%, 45%)" opacity="0.2"/>
    <defs>
      <linearGradient id="footerMoleculeGrad" x1="8" y1="10" x2="32" y2="30">
        <stop stopColor="hsl(172, 66%, 55%)" />
        <stop offset="0.5" stopColor="hsl(175, 80%, 50%)" />
        <stop offset="1" stopColor="hsl(174, 100%, 45%)" />
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
