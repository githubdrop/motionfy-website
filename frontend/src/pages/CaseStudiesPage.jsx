import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, X, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const industries = ["All", "Pharmaceuticals", "Biotechnology", "Medical Devices"];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/case-studies`).then(r => { setCaseStudies(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filteredStudies = selectedIndustry === "All" ? caseStudies : caseStudies.filter(s => s.industry === selectedIndustry);

  return (
    <div className="relative" data-testid="case-studies-page">
      <div className="noise-overlay" />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Work</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">Case Studies</h1>
            <p className="text-lg text-muted-foreground">See how we've helped life sciences companies achieve breakthrough results.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-y border-border/30 sticky top-20 bg-background/80 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button key={industry} variant={selectedIndustry === industry ? "default" : "outline"} size="sm" className={`rounded-full ${selectedIndustry !== industry ? 'border-border/50 hover:border-primary/50' : ''}`} onClick={() => setSelectedIndustry(industry)} data-testid={`filter-${industry.toLowerCase().replace(' ', '-')}`}>
                  {industry}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24" data-testid="case-studies-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[1,2,3,4,5,6].map(i => (<div key={i} className="animate-pulse rounded-2xl"><div className="bg-secondary h-64 rounded-t-2xl" /><div className="p-6 space-y-3 bg-card/30 rounded-b-2xl border border-border/30"><div className="bg-secondary h-4 w-1/3 rounded" /><div className="bg-secondary h-6 w-2/3 rounded" /></div></div>))}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, i) => (
                <motion.div key={study.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} layout>
                  <Card className="premium-card overflow-hidden bg-card/30 border-border/30 rounded-2xl cursor-pointer group" onClick={() => setSelectedStudy(study)} data-testid={`case-study-card-${study.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img src={study.image_url} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 image-overlay" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-primary/20 backdrop-blur-sm text-primary border-none mb-2">{study.industry}</Badge>
                        <h3 className="font-heading font-bold text-lg text-white line-clamp-2">{study.title}</h3>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{study.client}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2">{study.challenge}</p>
                      <div className="flex flex-wrap gap-2 mt-4">{study.tags.slice(0, 2).map((tag, j) => (<span key={j} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{tag}</span>))}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {!loading && filteredStudies.length === 0 && (<div className="text-center py-20"><p className="text-muted-foreground">No case studies found.</p></div>)}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50 flex items-center justify-center p-4" onClick={() => setSelectedStudy(null)} data-testid="case-study-modal">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border/30" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-72">
                <img src={selectedStudy.image_url} alt={selectedStudy.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <button onClick={() => setSelectedStudy(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground hover:bg-secondary transition-colors" data-testid="close-modal-button"><X className="w-5 h-5" /></button>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-primary/20 backdrop-blur-sm text-primary border-none mb-3">{selectedStudy.industry}</Badge>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{selectedStudy.title}</h2>
                  <p className="text-muted-foreground mt-2">{selectedStudy.client}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div><h3 className="font-heading font-semibold text-lg text-foreground mb-3">The Challenge</h3><p className="text-muted-foreground leading-relaxed">{selectedStudy.challenge}</p></div>
                    <div><h3 className="font-heading font-semibold text-lg text-foreground mb-3">Our Solution</h3><p className="text-muted-foreground leading-relaxed">{selectedStudy.solution}</p></div>
                    <div className="flex flex-wrap gap-2 pt-4">{selectedStudy.tags.map((tag, i) => (<span key={i} className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">{tag}</span>))}</div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Key Results</h3>
                    <ul className="space-y-4">{selectedStudy.results.map((result, i) => (<li key={i} className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-primary text-xs font-bold">{i + 1}</span></div><span className="text-foreground text-sm">{result}</span></li>))}</ul>
                    <div className="mt-8"><Link to="/contact" onClick={() => setSelectedStudy(null)}><Button className="w-full rounded-full btn-glow" data-testid="modal-contact-cta">Discuss Your Project <ArrowRight className="ml-2 w-4 h-4" /></Button></Link></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-32 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">Ready to Be Our Next <span className="gradient-text">Success Story</span>?</h2>
            <p className="text-muted-foreground text-lg mb-10">Let's discuss how we can achieve breakthrough results for your organization.</p>
            <Link to="/contact"><Button size="lg" className="rounded-full px-10 h-14 btn-glow" data-testid="case-studies-cta">Start Your Project <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
