import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Heart, Shield, ArrowRight, Linkedin, Award, Users, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const values = [
  { icon: Target, title: "Scientific Rigor", description: "Every strategy grounded in evidence-based insights." },
  { icon: Lightbulb, title: "Creative Excellence", description: "Breakthrough science deserves breakthrough creative." },
  { icon: Heart, title: "Client Partnership", description: "We're an extension of your team, invested in your success." },
  { icon: Shield, title: "Regulatory Integrity", description: "Highest standards of FDA, EMA compliance." }
];

const milestones = [
  { year: "2015", event: "Founded in California" },
  { year: "2017", event: "First major client launch" },
  { year: "2019", event: "Expanded service offerings" },
  { year: "2021", event: "50+ client milestone" },
  { year: "2023", event: "Industry recognition award" },
  { year: "2024", event: "AI-powered marketing tools" }
];

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/team`).then(r => { setTeam(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative" data-testid="about-page">
      <div className="noise-overlay" />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About Motionfy</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
              Pioneering Life Sciences Marketing <span className="gradient-text">Since 2015</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with the world's most innovative biotech, pharmaceutical, and medical device companies to transform breakthrough science into market success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Founded in 2015 in California, Motionfy was built on a simple premise: life sciences companies deserve marketing partners who understand both the science and the business.</p>
                <p>Our team of specialists, strategists, and creatives share a common vision—to help innovative healthcare companies connect with their audiences in meaningful ways.</p>
                <p>Today, we serve clients across the US, helping them achieve excellence and sustained growth. Our dedicated team is committed to delivering personalized marketing solutions that drive real results.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden tracing-border">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team" className="w-full h-[450px] object-cover" />
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute -bottom-6 -right-6 glass-heavy p-5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><Calendar className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-2xl font-heading font-bold text-foreground stat-glow">10+</p><p className="text-xs text-muted-foreground">Years of Excellence</p></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Values</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4">What Drives Us</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="premium-card h-full bg-card/30 border-border/30 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"><v.icon className="w-8 h-8 text-primary" /></div>
                    <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Journey</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4">Key Milestones</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card/30 border-border/30 rounded-2xl hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <span className="text-3xl font-heading font-bold gradient-text">{m.year}</span>
                    <p className="text-foreground mt-2">{m.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 relative" id="team" data-testid="team-section">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Leadership</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4 mb-4">Meet Our Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Decades of experience from the world's leading pharmaceutical companies, consultancies, and agencies.</p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (<div key={i} className="animate-pulse rounded-2xl overflow-hidden"><div className="bg-secondary h-72" /><div className="p-6 space-y-3"><div className="bg-secondary h-5 w-2/3 rounded" /><div className="bg-secondary h-4 w-1/2 rounded" /></div></div>))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="premium-card overflow-hidden bg-card/30 border-border/30 rounded-2xl group">
                    <div className="relative h-72 overflow-hidden">
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`team-linkedin-${member.id}`}>
                          <Linkedin className="w-5 h-5 text-primary-foreground" />
                        </a>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-lg text-foreground">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "20+", label: "Team Members" },
              { icon: Award, value: "10+", label: "Years Experience" },
              { icon: Target, value: "50+", label: "Clients Served" },
              { icon: Lightbulb, value: "200+", label: "Campaigns" }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-heading text-3xl font-bold gradient-text">{s.value}</p>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to Work Together?</h2>
            <p className="text-muted-foreground text-lg mb-10">Let's discuss how Motionfy can help accelerate your commercial success.</p>
            <Link to="/contact"><Button size="lg" className="rounded-full px-10 h-14 btn-glow" data-testid="about-cta">Get in Touch <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
