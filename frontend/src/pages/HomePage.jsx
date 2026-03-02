import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Microscope, Target, PenTool, ShieldCheck, ChevronRight, Quote, TrendingUp, Users, Award, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = [
  { icon: Target, title: "Brand Strategy", description: "Strategic positioning that differentiates your science in competitive therapeutic markets.", color: "bg-primary/10 text-primary" },
  { icon: PenTool, title: "Digital Marketing", description: "Data-driven omnichannel campaigns that engage HCPs, patients, and investors.", color: "bg-tech-cyan/10 text-tech-cyan" },
  { icon: Microscope, title: "Scientific Communications", description: "Medical writing and content that translates complex data for any audience.", color: "bg-bio-green/10 text-bio-green" },
  { icon: ShieldCheck, title: "Regulatory Marketing", description: "Compliant strategies that navigate FDA, EMA, and global requirements.", color: "bg-primary/10 text-primary" }
];

const stats = [
  { value: "150+", label: "Life Sciences Clients", icon: Users },
  { value: "98%", label: "Client Retention Rate", icon: TrendingUp },
  { value: "25", label: "Industry Awards", icon: Award },
  { value: "12", label: "Global Markets Served", icon: Globe }
];

const testimonials = [
  { quote: "Motionfy's deep understanding of oncology marketing transformed our CAR-T launch. They delivered a campaign that exceeded every KPI we set.", author: "Dr. Katherine Moore", role: "Chief Commercial Officer, Meridian Therapeutics", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" },
  { quote: "Their IPO communications work was exceptional. They articulated our gene therapy platform in a way that resonated with investors. We closed 25% above target.", author: "Robert Chen", role: "CEO, Helix Genomics", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { quote: "We've worked with many agencies, but Motionfy truly understands the medical device space. Their thought leadership program established us as the leader.", author: "Dr. Jennifer Walsh", role: "VP Marketing, Apex Surgical Systems", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" }
];

const clients = [
  { name: "Meridian", sub: "THERAPEUTICS" },
  { name: "HELIX", sub: "GENOMICS" },
  { name: "APEX", sub: "SURGICAL" },
  { name: "Orion", sub: "RARE DISEASE" },
  { name: "CardioVance", sub: "MEDICAL" },
  { name: "PRECISION", sub: "DIAGNOSTICS" }
];

export default function HomePage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${API}/case-studies`);
        setCaseStudies(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <div className="overflow-hidden" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-pattern pt-24">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Life Sciences Marketing Agency
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Where Science Meets <span className="text-gradient">Strategic Growth</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                We partner with biotech, pharmaceutical, and medical device companies to transform breakthrough science into market success. From pre-launch to commercial leadership.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8 btn-glow" data-testid="hero-cta-primary">
                    Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/case-studies">
                  <Button variant="outline" size="lg" className="rounded-full px-8" data-testid="hero-cta-secondary">View Case Studies</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80" alt="Scientists collaborating" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              </div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute -bottom-8 -left-8 glass-heavy p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">47%</p>
                    <p className="text-sm text-muted-foreground">Avg. Engagement Lift</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider">Trusted by leading life sciences companies</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {clients.map((client, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="font-heading font-bold text-xl text-foreground/60 group-hover:text-primary transition-colors">{client.name}</div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground/60 font-medium">{client.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Capabilities</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Full-Service Life Sciences Marketing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From pre-clinical to commercial, we provide end-to-end marketing solutions built specifically for healthcare and life sciences.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="service-card h-full border-border/50 hover:border-primary/30">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    <Link to="/services" className="inline-flex items-center text-primary text-sm font-medium mt-4 hover:gap-2 transition-all">
                      Learn more <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="font-heading text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 md:py-32" data-testid="case-studies-preview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Client Success Stories</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Featured Case Studies</h2>
            </div>
            <Link to="/case-studies">
              <Button variant="outline" className="rounded-full" data-testid="view-all-cases">View All Cases <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-56 rounded-t-xl" />
                  <div className="p-6 space-y-3 bg-card rounded-b-xl border border-border">
                    <div className="bg-muted h-4 w-1/3 rounded" />
                    <div className="bg-muted h-6 w-2/3 rounded" />
                    <div className="bg-muted h-4 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((study, i) => (
                <motion.div key={study.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to="/case-studies">
                    <Card className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-xl transition-all duration-500">
                      <div className="relative h-56 overflow-hidden">
                        <img src={study.image_url} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">{study.industry}</span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-sm text-primary font-medium mb-1">{study.client}</p>
                        <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{study.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{study.results[0]}</p>
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
      <section className="py-24 md:py-32 bg-muted/30" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Client Testimonials</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="testimonial-card rounded-2xl p-8 border border-border/50 bg-card">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed text-sm">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?w=1200&q=80" alt="Laboratory" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/85" />
            <div className="relative z-10 py-20 px-8 md:px-16 text-center">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Accelerate Your Growth?</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">Let's discuss how Motionfy can help transform your marketing strategy and connect you with your target audience.</p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/90 btn-glow" data-testid="cta-contact-button">
                  Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
