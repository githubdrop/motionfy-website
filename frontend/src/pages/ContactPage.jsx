import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Send, CheckCircle, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const services = ["Brand Strategy", "Digital Marketing", "Scientific Communications", "Regulatory Marketing", "Market Research", "Investor Relations", "Other"];

const contactInfo = [
  { icon: MapPin, title: "Visit Us", details: ["17595 Harvard Ave", "Ste C-831, Irvine, CA 92614"] },
  { icon: Mail, title: "Email Us", details: ["hello@motionfy.com"] },
  { icon: Clock, title: "Office Hours", details: ["Mon-Fri 9am-6pm PST"] }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", service_interest: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleServiceChange = (value) => setFormData(prev => ({ ...prev, service_interest: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({ name: "", email: "", company: "", phone: "", service_interest: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative" data-testid="contact-page">
      <div className="noise-overlay" />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Contact Us</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">Let's Start a <span className="gradient-text">Conversation</span></h1>
            <p className="text-lg text-muted-foreground">Ready to transform your marketing? Tell us about your goals.</p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <Card className="bg-card/50 border-border/30 rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-8">We'll get back to you within 24-48 hours.</p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full" data-testid="send-another-message-btn">Send Another Message</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="name" className="text-sm text-muted-foreground">Full Name *</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" required className="rounded-xl bg-secondary/30 border-border/30 h-12" data-testid="contact-name-input" /></div>
                        <div className="space-y-2"><Label htmlFor="email" className="text-sm text-muted-foreground">Email *</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="rounded-xl bg-secondary/30 border-border/30 h-12" data-testid="contact-email-input" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="company" className="text-sm text-muted-foreground">Company</Label><Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="rounded-xl bg-secondary/30 border-border/30 h-12" data-testid="contact-company-input" /></div>
                        <div className="space-y-2"><Label htmlFor="phone" className="text-sm text-muted-foreground">Phone</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="rounded-xl bg-secondary/30 border-border/30 h-12" data-testid="contact-phone-input" /></div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Service Interest</Label>
                        <Select onValueChange={handleServiceChange} value={formData.service_interest}>
                          <SelectTrigger className="rounded-xl bg-secondary/30 border-border/30 h-12" data-testid="contact-service-select"><SelectValue placeholder="Select a service" /></SelectTrigger>
                          <SelectContent>{services.map((service) => (<SelectItem key={service} value={service}>{service}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label htmlFor="message" className="text-sm text-muted-foreground">Message *</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={5} required className="rounded-xl bg-secondary/30 border-border/30 resize-none" data-testid="contact-message-input" /></div>
                      <Button type="submit" size="lg" className="w-full rounded-full h-14 btn-glow" disabled={isSubmitting} data-testid="contact-submit-button">
                        {isSubmitting ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Sending...</span>) : (<span className="flex items-center gap-2">Send Message<Send className="w-4 h-4" /></span>)}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, i) => (
                <Card key={i} className="bg-card/30 border-border/30 rounded-2xl">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><info.icon className="w-5 h-5 text-primary" /></div>
                    <div><h3 className="font-heading font-semibold text-foreground mb-1">{info.title}</h3>{info.details.map((d, j) => (<p key={j} className="text-muted-foreground text-sm">{d}</p>))}</div>
                  </CardContent>
                </Card>
              ))}
              <Card className="bg-card/30 border-border/30 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    <a href="mailto:hello@motionfy.com" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all" data-testid="contact-email-btn"><Mail className="w-4 h-4" /></a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.7847687896!2d-117.8443!3d33.6846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcdfa1f4cf25e1%3A0x5b7c2a2e72e2d88b!2sIrvine%2C%20CA%2092614!5e0!3m2!1sen!2sus!4v1645556789012!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy" title="Office Location" /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="absolute top-8 left-8 glass-heavy rounded-2xl p-6 max-w-xs">
          <h3 className="font-heading font-semibold text-foreground mb-2">Motionfy HQ</h3>
          <p className="text-muted-foreground text-sm">17595 Harvard Ave, Ste C-831<br />Irvine, CA 92614</p>
        </motion.div>
      </section>
    </div>
  );
}
