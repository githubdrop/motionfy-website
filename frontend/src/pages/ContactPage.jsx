import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Linkedin, Twitter } from "lucide-react";
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
  { icon: MapPin, title: "Visit Us", details: ["100 Innovation Drive", "Boston, MA 02110"] },
  { icon: Phone, title: "Call Us", details: ["+1 (617) 555-0123", "Mon-Fri 9am-6pm EST"] },
  { icon: Mail, title: "Email Us", details: ["contact@motionfy.com", "info@motionfy.com"] },
  { icon: Clock, title: "Office Hours", details: ["Monday - Friday", "9:00 AM - 6:00 PM EST"] }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", service_interest: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service_interest: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({ name: "", email: "", company: "", phone: "", service_interest: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden" data-testid="contact-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">Contact Us</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Let's Start a Conversation</h1>
            <p className="text-lg text-muted-foreground">Ready to transform your life sciences marketing? We'd love to hear about your goals and explore how Motionfy can help you achieve them.</p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <Card className="border-border/50 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">Thank you for reaching out. Our team will review your message and get back to you within 24-48 hours.</p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full" data-testid="send-another-message-btn">Send Another Message</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Smith" required className="rounded-lg" data-testid="contact-name-input" /></div>
                        <div className="space-y-2"><Label htmlFor="email">Email Address *</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="rounded-lg" data-testid="contact-email-input" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="rounded-lg" data-testid="contact-company-input" /></div>
                        <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="rounded-lg" data-testid="contact-phone-input" /></div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interest</Label>
                        <Select onValueChange={handleServiceChange} value={formData.service_interest}>
                          <SelectTrigger className="rounded-lg" data-testid="contact-service-select"><SelectValue placeholder="Select a service" /></SelectTrigger>
                          <SelectContent>{services.map((service) => (<SelectItem key={service} value={service}>{service}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project and goals..." rows={5} required className="rounded-lg resize-none" data-testid="contact-message-input" /></div>
                      <Button type="submit" size="lg" className="w-full rounded-full btn-glow" disabled={isSubmitting} data-testid="contact-submit-button">
                        {isSubmitting ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span>) : (<span className="flex items-center gap-2">Send Message<Send className="w-4 h-4" /></span>)}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><info.icon className="w-6 h-6 text-primary" /></div>
                    <div><h3 className="font-heading font-semibold text-foreground mb-1">{info.title}</h3>{info.details.map((detail, j) => (<p key={j} className="text-muted-foreground text-sm">{detail}</p>))}</div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" data-testid="contact-linkedin"><Linkedin className="w-5 h-5" /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" data-testid="contact-twitter"><Twitter className="w-5 h-5" /></a>
                    <a href="mailto:contact@motionfy.com" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" data-testid="contact-email-icon"><Mail className="w-5 h-5" /></a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-muted">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.665671696991!2d-71.05421548453437!3d42.35460407918561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3709e9b53df4d%3A0x6b5b8c6e55e6c3a8!2sBoston%2C%20MA%2002110!5e0!3m2!1sen!2sus!4v1645556789012!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Motionfy Office Location" />
        </div>
        <div className="absolute top-8 left-8 glass-heavy rounded-2xl p-6 shadow-xl max-w-xs">
          <h3 className="font-heading font-semibold text-foreground mb-2">Motionfy Headquarters</h3>
          <p className="text-muted-foreground text-sm">100 Innovation Drive<br />Boston, MA 02110</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "What industries do you specialize in?", a: "We specialize in life sciences including biotechnology, pharmaceuticals, medical devices, diagnostics, and digital health companies." },
              { q: "How long does a typical engagement last?", a: "Engagement length varies based on scope. Projects can range from 3-month campaigns to ongoing retainer relationships spanning multiple years." },
              { q: "Do you work with early-stage companies?", a: "Yes! We work with companies at all stages, from pre-revenue startups preparing for launch to established pharmaceutical leaders." },
              { q: "What's your approach to regulatory compliance?", a: "Compliance is built into our process. Our team includes regulatory experts who ensure all content meets FDA, EMA, and relevant guidelines." }
            ].map((faq, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
