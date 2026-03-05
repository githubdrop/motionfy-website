import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

// Bold DNA M - Clean intertwined double helix M
const MotionfyLogo = () => (
  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 L2 28 M2 2 L12 16 L20 28 M38 2 L28 16 L20 28 M38 2 L38 28" stroke="hsl(172, 66%, 55%)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M2 8 Q5 8, 5 12 Q5 16, 2 16 Q5 16, 5 20 Q5 24, 2 24" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
    <path d="M38 8 Q35 8, 35 12 Q35 16, 38 16 Q35 16, 35 20 Q35 24, 38 24" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
    <path d="M12 16 Q20 12, 28 16" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M16 22 Q20 18, 24 22" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    <circle cx="2" cy="2" r="2.5" fill="hsl(172, 66%, 60%)"/>
    <circle cx="38" cy="2" r="2.5" fill="hsl(172, 66%, 60%)"/>
    <circle cx="20" cy="28" r="3" fill="hsl(174, 100%, 50%)"/>
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
