import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, PenTool, Microscope, ShieldCheck, Globe, BarChart3, FileText, Megaphone, Users, Lightbulb, ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const services = [
  { id: "brand-strategy", icon: Target, title: "Brand Strategy", subtitle: "Position Your Science for Success", description: "We develop compelling brand strategies that differentiate your science in competitive markets and resonate with your target audiences.", features: ["Brand positioning & messaging", "Competitive landscape analysis", "Value proposition development", "Brand architecture design", "Go-to-market strategy"], color: "bg-primary", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
  { id: "digital-marketing", icon: PenTool, title: "Digital Marketing", subtitle: "Reach & Engage Your Audiences", description: "Data-driven digital campaigns that connect with HCPs, patients, investors, and other key stakeholders across all channels.", features: ["Omnichannel campaign development", "SEO & content marketing", "Social media strategy", "Paid media management", "Marketing automation"], color: "bg-tech-cyan", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { id: "scientific-communications", icon: Microscope, title: "Scientific Communications", subtitle: "Translate Complex Science", description: "Expert medical writing and scientific content that makes complex data accessible and compelling to diverse audiences.", features: ["Medical writing & publications", "Scientific storytelling", "KOL engagement programs", "Congress & event support", "Educational content development"], color: "bg-bio-green", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80" },
  { id: "regulatory-marketing", icon: ShieldCheck, title: "Regulatory Marketing", subtitle: "Navigate Compliance with Confidence", description: "Compliant marketing strategies that maximize impact while navigating complex FDA, EMA, and global regulatory requirements.", features: ["Promotional review support", "Claims substantiation", "Risk communication", "Label optimization", "Compliance training"], color: "bg-primary", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" }
];

const additionalServices = [
  { icon: Globe, title: "Global Expansion", description: "Market entry strategies for international markets" },
  { icon: BarChart3, title: "Market Research", description: "Actionable insights from primary & secondary research" },
  { icon: FileText, title: "Investor Relations", description: "Communications that build investor confidence" },
  { icon: Megaphone, title: "Public Relations", description: "Media relations and thought leadership" },
  { icon: Users, title: "Patient Engagement", description: "Programs that support the patient journey" },
  { icon: Lightbulb, title: "Creative Services", description: "Award-winning design and visual storytelling" }
];

export default function ServicesPage() {
  return (
    <div className="overflow-hidden" data-testid="services-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">Our Services</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Full-Service Life Sciences Marketing</h1>
            <p className="text-lg text-muted-foreground">From strategy to execution, we provide comprehensive marketing solutions designed specifically for the unique challenges of the life sciences industry.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 md:py-32" data-testid="main-services">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6`}><service.icon className="w-8 h-8 text-white" /></div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-primary" /></div><span className="text-foreground">{feature}</span></li>
                    ))}
                  </ul>
                  <Link to="/contact"><Button className="rounded-full px-6" data-testid={`service-cta-${service.id}`}>Learn More <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                </div>
                <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl overflow-hidden shadow-xl"><img src={service.image} alt={service.title} className="w-full h-[400px] object-cover" /></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10" />
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-tech-cyan/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 md:py-32 bg-muted/30" data-testid="additional-services">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">More Capabilities</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We offer a full range of specialized services to support your marketing needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><service.icon className="w-6 h-6 text-primary" /></div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Our Approach</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">How We Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Deep dive into your science, market, and goals" },
              { step: "02", title: "Strategy", desc: "Develop tailored approach and messaging framework" },
              { step: "03", title: "Execution", desc: "Create and launch campaigns with precision" },
              { step: "04", title: "Optimize", desc: "Measure, learn, and continuously improve" }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-5xl font-heading font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
          <p className="text-white/80 text-lg mb-8">Let's discuss how our services can help achieve your business objectives.</p>
          <Link to="/contact"><Button size="lg" className="rounded-full px-10 bg-primary hover:bg-primary/90 btn-glow" data-testid="services-cta-button">Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
