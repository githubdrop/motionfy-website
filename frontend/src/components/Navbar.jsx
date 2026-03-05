import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

// Bold DNA M - Clean intertwined double helix M
const MotionfyLogo = () => (
  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* The M is formed by two DNA strands that twist around each other */}
    {/* Strand 1 - goes left-down, twist, center-down */}
    <path 
      d="M2 2 L2 28 M2 2 L12 16 L20 28 M38 2 L28 16 L20 28 M38 2 L38 28"
      stroke="hsl(172, 66%, 55%)" 
      strokeWidth="3.5" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Helix twist overlay on left vertical */}
    <path d="M2 8 Q5 8, 5 12 Q5 16, 2 16 Q5 16, 5 20 Q5 24, 2 24" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
    {/* Helix twist overlay on right vertical */}
    <path d="M38 8 Q35 8, 35 12 Q35 16, 38 16 Q35 16, 35 20 Q35 24, 38 24" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
    {/* Center helix crossing */}
    <path d="M12 16 Q20 12, 28 16" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M16 22 Q20 18, 24 22" stroke="hsl(174, 100%, 50%)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    {/* Molecular accent dots */}
    <circle cx="2" cy="2" r="2.5" fill="hsl(172, 66%, 60%)"/>
    <circle cx="38" cy="2" r="2.5" fill="hsl(172, 66%, 60%)"/>
    <circle cx="20" cy="28" r="3" fill="hsl(174, 100%, 50%)"/>
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
