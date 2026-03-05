import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, PenTool, Microscope, ShieldCheck, Globe, BarChart3, FileText, Megaphone, Users, Lightbulb, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const services = [
  { id: "brand-strategy", icon: Target, title: "Brand Strategy", subtitle: "Position Your Science", description: "Strategic positioning that differentiates your science in competitive markets.", features: ["Brand positioning & messaging", "Competitive analysis", "Value proposition", "Go-to-market strategy"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
  { id: "digital-marketing", icon: PenTool, title: "Digital Marketing", subtitle: "Engage Your Audiences", description: "Data-driven campaigns that connect with HCPs, patients, and investors.", features: ["Omnichannel campaigns", "SEO & content marketing", "Social media strategy", "Marketing automation"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { id: "scientific-communications", icon: Microscope, title: "Scientific Comms", subtitle: "Translate Complexity", description: "Medical writing that makes complex data accessible and compelling.", features: ["Medical writing", "Scientific storytelling", "KOL engagement", "Congress support"], image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80" },
  { id: "regulatory-marketing", icon: ShieldCheck, title: "Regulatory", subtitle: "Navigate with Confidence", description: "Compliant strategies that maximize impact while meeting requirements.", features: ["Promotional review", "Claims substantiation", "Risk communication", "Compliance training"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" }
];

const additionalServices = [
  { icon: Globe, title: "Global Expansion", description: "International market entry" },
  { icon: BarChart3, title: "Market Research", description: "Actionable insights" },
  { icon: FileText, title: "Investor Relations", description: "Build investor confidence" },
  { icon: Megaphone, title: "Public Relations", description: "Media & thought leadership" },
  { icon: Users, title: "Patient Engagement", description: "Support patient journeys" },
  { icon: Lightbulb, title: "Creative Services", description: "Award-winning design" }
];

export default function ServicesPage() {
  return (
    <div className="relative" data-testid="services-page">
      <div className="noise-overlay" />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">What We Do</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">Full-Service <span className="gradient-text">Life Sciences</span> Marketing</h1>
            <p className="text-lg text-muted-foreground">From strategy to execution, we provide comprehensive solutions for the unique challenges of healthcare and life sciences.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-32" data-testid="main-services">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {services.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><service.icon className="w-7 h-7 text-primary" /></div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-primary" /></div><span className="text-foreground">{feature}</span></li>
                    ))}
                  </ul>
                  <Link to="/contact"><Button className="rounded-full px-6 btn-glow" data-testid={`service-cta-${service.id}`}>Learn More <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                </div>
                <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl overflow-hidden tracing-border"><img src={service.image} alt={service.title} className="w-full h-[450px] object-cover" /></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-32 relative" data-testid="additional-services">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">More Capabilities</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4 mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Specialized services to support every aspect of your marketing needs.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="premium-card h-full bg-card/30 border-border/30 rounded-2xl group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"><service.icon className="w-6 h-6 text-primary" /></div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Approach</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4">How We Work</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Deep dive into your science and goals" },
              { step: "02", title: "Strategy", desc: "Develop tailored approach" },
              { step: "03", title: "Execution", desc: "Launch with precision" },
              { step: "04", title: "Optimize", desc: "Measure and improve" }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-6xl font-heading font-bold gradient-text opacity-30 mb-4">{item.step}</div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to <span className="gradient-text">Transform</span> Your Marketing?</h2>
            <p className="text-muted-foreground text-lg mb-10">Let's discuss how our services can help achieve your objectives.</p>
            <Link to="/contact"><Button size="lg" className="rounded-full px-10 h-14 btn-glow" data-testid="services-cta-button">Start Your Project <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
