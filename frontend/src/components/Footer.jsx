import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

// DNA Double Helix M Logo Component
const MotionfyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left helix strand */}
    <path 
      d="M8 32 C8 28, 12 26, 12 22 C12 18, 8 16, 8 12 C8 10, 10 8, 12 8"
      stroke="url(#footerHelixGradient1)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Right helix strand */}
    <path 
      d="M32 32 C32 28, 28 26, 28 22 C28 18, 32 16, 32 12 C32 10, 30 8, 28 8"
      stroke="url(#footerHelixGradient1)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Center connecting helix */}
    <path 
      d="M12 8 C14 12, 18 18, 20 22 C22 18, 26 12, 28 8"
      stroke="url(#footerHelixGradient2)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* DNA base pair connectors */}
    <line x1="10" y1="12" x2="14" y2="14" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="10" y1="20" x2="15" y2="20" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <line x1="10" y1="28" x2="14" y2="26" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="30" y1="12" x2="26" y2="14" stroke="hsl(174, 100%, 41%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="30" y1="20" x2="25" y2="20" stroke="hsl(174, 100%, 41%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <line x1="30" y1="28" x2="26" y2="26" stroke="hsl(174, 100%, 41%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <defs>
      <linearGradient id="footerHelixGradient1" x1="8" y1="8" x2="8" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(172, 66%, 50%)" />
        <stop offset="1" stopColor="hsl(174, 100%, 41%)" />
      </linearGradient>
      <linearGradient id="footerHelixGradient2" x1="12" y1="8" x2="28" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(172, 66%, 60%)" />
        <stop offset="0.5" stopColor="hsl(180, 80%, 45%)" />
        <stop offset="1" stopColor="hsl(174, 100%, 41%)" />
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
