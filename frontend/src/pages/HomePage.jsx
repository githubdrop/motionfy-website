import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Microscope, Target, PenTool, ShieldCheck, ChevronRight, Quote, TrendingUp, Users, Award, Globe, Play, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  { icon: Target, title: "Brand Strategy", description: "Position your science to win in competitive markets.", tag: "Strategy" },
  { icon: PenTool, title: "Digital Marketing", description: "Data-driven campaigns that move the needle.", tag: "Digital" },
  { icon: Microscope, title: "Scientific Comms", description: "Translate complexity into compelling stories.", tag: "Content" },
  { icon: ShieldCheck, title: "Regulatory", description: "Navigate FDA, EMA with confidence.", tag: "Compliance" }
];

const stats = [
  { value: "50+", label: "Clients", suffix: "" },
  { value: "98", label: "Retention", suffix: "%" },
  { value: "10+", label: "Years Experience", suffix: "" },
  { value: "12", label: "Markets", suffix: "" }
];

const testimonials = [
  { quote: "Motionfy transformed our CAR-T launch. They exceeded every KPI and won us an industry award.", author: "Dr. Katherine Moore", role: "CCO, Meridian Therapeutics", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" },
  { quote: "Their IPO communications were exceptional. We closed 25% above our target range.", author: "Robert Chen", role: "CEO, Helix Genomics", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { quote: "The only agency that truly understands both the science and the business.", author: "Dr. Jennifer Walsh", role: "VP Marketing, Apex Surgical", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" }
];

const clients = ["Meridian", "HELIX", "APEX", "Orion", "CardioVance", "PRECISION"];

export default function HomePage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${API}/case-studies`);
        setCaseStudies(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <div className="relative" data-testid="home-page">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="absolute inset-0 grid-lines opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-muted-foreground">Life Sciences Marketing Agency</span>
              </motion.div>

              {/* Headline */}
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                <span className="text-foreground">We make </span>
                <span className="gradient-text">biotech</span>
                <br />
                <span className="text-foreground">brands </span>
                <span className="gradient-text">unforgettable</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Strategic marketing that transforms breakthrough science into market leadership. From pre-launch to commercial dominance.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8 h-14 text-base btn-glow bg-primary text-primary-foreground font-semibold" data-testid="hero-cta-primary">
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-border/50 hover:bg-secondary/50" data-testid="hero-cta-secondary">
                    <Play className="mr-2 w-4 h-4" />
                    View Our Work
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 flex items-center gap-8"
              >
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Trusted by 50+ companies</p>
                  <p className="text-xs text-muted-foreground">Personalized marketing solutions</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.div 
                  style={{ y }}
                  className="relative rounded-3xl overflow-hidden tracing-border"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80"
                    alt="Scientists collaborating"
                    className="w-full h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </motion.div>

                {/* Floating Card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 glass-heavy p-5 rounded-2xl floating"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground stat-glow">+47%</p>
                      <p className="text-xs text-muted-foreground">Avg. Engagement Lift</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 glass-heavy p-4 rounded-2xl floating-delay"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">25 Awards</p>
                      <p className="text-xs text-muted-foreground">Industry Recognition</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border border-border/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Client Logos */}
      <section className="py-20 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-12"
          >
            Trusted by industry leaders
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {clients.map((client, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-heading font-bold text-muted-foreground/30 hover:text-primary/50 transition-colors cursor-default"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 relative" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">What We Do</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Full-Service Marketing<br />for <span className="gradient-text">Life Sciences</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From strategy to execution, we help biotech and pharma companies connect with their audiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="premium-card h-full bg-card/50 border-border/30 rounded-2xl overflow-hidden group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">{service.tag}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    <div className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-5xl md:text-6xl font-bold gradient-text stat-glow">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-muted-foreground text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-32" data-testid="case-studies-preview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Selected Work</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
                Case Studies
              </h2>
            </div>
            <Link to="/case-studies">
              <Button variant="outline" className="rounded-full border-border/50" data-testid="view-all-cases">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl overflow-hidden">
                  <div className="bg-secondary h-64" />
                  <div className="p-6 space-y-3">
                    <div className="bg-secondary h-4 w-1/3 rounded" />
                    <div className="bg-secondary h-6 w-2/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Link to="/case-studies">
                    <Card className="premium-card overflow-hidden bg-card/30 border-border/30 rounded-2xl group cursor-pointer">
                      <div className="relative h-64 overflow-hidden">
                        <img src={study.image_url} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 image-overlay" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs uppercase tracking-wider bg-primary/20 backdrop-blur-sm text-primary px-3 py-1 rounded-full">{study.industry}</span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">{study.client}</p>
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">{study.title}</h3>
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-1">{study.results[0]}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative" data-testid="testimonials-section">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Client Love</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">What They Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="h-full bg-card/30 border-border/30 rounded-2xl testimonial-gradient">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-foreground leading-relaxed mb-8">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.author}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
            <div className="absolute inset-0 grid-lines opacity-20" />
            <div className="relative z-10 py-24 px-8 md:px-16 text-center">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Ready to <span className="gradient-text">stand out</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                Let's build something remarkable together. Schedule a call with our team.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-base btn-glow bg-primary text-primary-foreground font-semibold" data-testid="cta-contact-button">
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
