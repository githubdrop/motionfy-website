import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

// DNA Double Helix M Logo Component
const MotionfyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left helix strand - forms left side of M */}
    <path 
      d="M8 32 C8 28, 12 26, 12 22 C12 18, 8 16, 8 12 C8 10, 10 8, 12 8"
      stroke="url(#helixGradient1)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Right helix strand - forms right side of M */}
    <path 
      d="M32 32 C32 28, 28 26, 28 22 C28 18, 32 16, 32 12 C32 10, 30 8, 28 8"
      stroke="url(#helixGradient1)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Center connecting helix - forms middle V of M */}
    <path 
      d="M12 8 C14 12, 18 18, 20 22 C22 18, 26 12, 28 8"
      stroke="url(#helixGradient2)" 
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
      <linearGradient id="helixGradient1" x1="8" y1="8" x2="8" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(172, 66%, 50%)" />
        <stop offset="1" stopColor="hsl(174, 100%, 41%)" />
      </linearGradient>
      <linearGradient id="helixGradient2" x1="12" y1="8" x2="28" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(172, 66%, 60%)" />
        <stop offset="0.5" stopColor="hsl(180, 80%, 45%)" />
        <stop offset="1" stopColor="hsl(174, 100%, 41%)" />
      </linearGradient>
    </defs>
  </svg>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/case-studies" },
  { name: "Insights", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`max-w-6xl mx-auto transition-all duration-500 ${
          scrolled ? "navbar-float rounded-full" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="navbar-logo">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <MotionfyLogo />
            </motion.div>
            <span className="font-heading font-semibold text-xl tracking-tight">
              <span className="text-foreground">Motion</span>
              <span className="text-primary">fy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium transition-all group"
              >
                <span className={`relative z-10 ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <Button className="rounded-full px-6 btn-glow bg-primary text-primary-foreground font-medium" data-testid="nav-cta-button">
                Start Project
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden glass rounded-2xl mx-2 mb-2"
            >
              <div className="p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        location.pathname === link.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <Link to="/contact">
                    <Button className="w-full rounded-full btn-glow">Start Project</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
