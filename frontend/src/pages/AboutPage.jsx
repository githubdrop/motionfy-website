import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Heart, Shield, ArrowRight, Linkedin, Award, Users, Calendar, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const values = [
  { icon: Target, title: "Scientific Rigor", description: "Every strategy is grounded in scientific accuracy and evidence-based insights." },
  { icon: Lightbulb, title: "Creative Excellence", description: "Breakthrough science deserves breakthrough creative that captivates and inspires." },
  { icon: Heart, title: "Client Partnership", description: "We operate as an extension of your team, fully invested in your success." },
  { icon: Shield, title: "Regulatory Integrity", description: "We uphold the highest standards of compliance across FDA, EMA, and global requirements." }
];

const milestones = [
  { year: "2015", event: "Founded in Boston's Innovation District" },
  { year: "2017", event: "Expanded into pharmaceutical sector" },
  { year: "2019", event: "Opened London office for European expansion" },
  { year: "2021", event: "Reached 100 life sciences clients milestone" },
  { year: "2023", event: "Named Best Healthcare Agency by MM&M Awards" },
  { year: "2024", event: "Launched AI-powered marketing insights platform" }
];

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API}/team`);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="overflow-hidden" data-testid="about-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">About Motionfy</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Pioneering Life Sciences Marketing Since 2015</h1>
            <p className="text-lg text-muted-foreground">For nearly a decade, Motionfy has partnered with the world's most innovative biotech, pharmaceutical, and medical device companies to transform breakthrough science into market success.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Motionfy was founded in 2015 by Dr. Alexandra Reid, a former VP of Global Marketing at Pfizer, who recognized a critical gap: life sciences companies needed marketing partners who truly understood both the science and the business.</p>
                <p>After leading eight blockbuster drug launches, Alexandra assembled a team of scientists-turned-marketers, former FDA reviewers, and award-winning creative professionals who shared her vision.</p>
                <p>Today, Motionfy serves over 150 clients across 12 global markets. Our team of 85+ specialists has contributed to therapies that have helped millions of patients worldwide.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Motionfy team" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 glass-heavy p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"><Calendar className="w-6 h-6 text-primary" /></div>
                  <div><p className="text-2xl font-heading font-bold text-foreground">10+</p><p className="text-sm text-muted-foreground">Years of Excellence</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-muted/30" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Values</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"><value.icon className="w-8 h-8 text-primary" /></div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Journey</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Key Milestones</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <span className="text-primary font-heading font-bold text-2xl">{milestone.year}</span>
                    <p className="text-foreground mt-2">{milestone.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-muted/30" id="team" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Leadership Team</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our leadership team combines decades of experience from the world's leading pharmaceutical companies, consultancies, and creative agencies.</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-72 rounded-t-xl" />
                  <div className="p-6 space-y-3 bg-card rounded-b-xl border border-border">
                    <div className="bg-muted h-5 w-2/3 rounded" />
                    <div className="bg-muted h-4 w-1/2 rounded" />
                    <div className="bg-muted h-16 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="overflow-hidden group border-border/50 hover:shadow-xl transition-all duration-500">
                    <div className="relative h-72 overflow-hidden">
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white" data-testid={`team-linkedin-${member.id}`}>
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg text-foreground">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm line-clamp-3">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><Users className="w-8 h-8 text-primary mx-auto mb-3" /><p className="font-heading text-3xl font-bold">85+</p><p className="text-white/70 text-sm">Team Members</p></div>
            <div><Award className="w-8 h-8 text-primary mx-auto mb-3" /><p className="font-heading text-3xl font-bold">25</p><p className="text-white/70 text-sm">Industry Awards</p></div>
            <div><Target className="w-8 h-8 text-primary mx-auto mb-3" /><p className="font-heading text-3xl font-bold">150+</p><p className="text-white/70 text-sm">Clients Served</p></div>
            <div><Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" /><p className="font-heading text-3xl font-bold">500+</p><p className="text-white/70 text-sm">Campaigns Launched</p></div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Global Presence</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Our Offices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50"><CardContent className="p-8"><h3 className="font-heading font-semibold text-xl text-foreground mb-2">Boston (Headquarters)</h3><p className="text-muted-foreground mb-4">100 Innovation Drive<br />Seaport District<br />Boston, MA 02210</p><p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Phone:</span> +1 (617) 555-0100</p></CardContent></Card>
            <Card className="border-border/50"><CardContent className="p-8"><h3 className="font-heading font-semibold text-xl text-foreground mb-2">London</h3><p className="text-muted-foreground mb-4">25 Old Broad Street<br />City of London<br />London EC2N 1HN, UK</p><p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Phone:</span> +44 20 7946 0958</p></CardContent></Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to Work Together?</h2>
          <p className="text-muted-foreground text-lg mb-8">Let's discuss how Motionfy can help accelerate your commercial success.</p>
          <Link to="/contact"><Button size="lg" className="rounded-full px-8 btn-glow" data-testid="about-cta">Get in Touch <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
