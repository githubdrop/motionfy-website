import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

// DNA M Logo - M shaped with DNA helix elements
const MotionfyLogo = () => (
  <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left vertical stroke of M - DNA helix style */}
    <path 
      d="M6 30V6"
      stroke="url(#dnaGrad)" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    {/* Left helix twist */}
    <path 
      d="M3 10C6 10, 9 10, 9 10M3 18C6 18, 9 18, 9 18M3 26C6 26, 9 26, 9 26"
      stroke="hsl(172, 66%, 50%)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.5"
    />
    
    {/* Center V of M - double helix intertwining */}
    <path 
      d="M6 6C10 14, 17 22, 21 28"
      stroke="url(#dnaGrad)" 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
    />
    <path 
      d="M36 6C32 14, 25 22, 21 28"
      stroke="url(#dnaGrad2)" 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
    />
    
    {/* DNA base pair connectors on the V */}
    <line x1="10" y1="12" x2="32" y2="12" stroke="hsl(173, 80%, 48%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="14" y1="18" x2="28" y2="18" stroke="hsl(174, 100%, 45%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="18" y1="24" x2="24" y2="24" stroke="hsl(172, 66%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    
    {/* Right vertical stroke of M - DNA helix style */}
    <path 
      d="M36 30V6"
      stroke="url(#dnaGrad2)" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    {/* Right helix twist */}
    <path 
      d="M33 10C36 10, 39 10, 39 10M33 18C36 18, 39 18, 39 18M33 26C36 26, 39 26, 39 26"
      stroke="hsl(174, 100%, 45%)" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.5"
    />
    
    {/* Molecular nodes at key points */}
    <circle cx="6" cy="6" r="2.5" fill="hsl(172, 66%, 55%)"/>
    <circle cx="36" cy="6" r="2.5" fill="hsl(174, 100%, 50%)"/>
    <circle cx="21" cy="28" r="3" fill="hsl(173, 80%, 50%)"/>
    <circle cx="21" cy="28" r="5" fill="hsl(173, 80%, 50%)" opacity="0.2"/>
    
    <defs>
      <linearGradient id="dnaGrad" x1="6" y1="6" x2="21" y2="28">
        <stop stopColor="hsl(172, 66%, 55%)" />
        <stop offset="1" stopColor="hsl(173, 80%, 50%)" />
      </linearGradient>
      <linearGradient id="dnaGrad2" x1="36" y1="6" x2="21" y2="28">
        <stop stopColor="hsl(174, 100%, 50%)" />
        <stop offset="1" stopColor="hsl(173, 80%, 50%)" />
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
