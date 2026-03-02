import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, X } from "lucide-react";
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
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${API}/case-studies`);
        setCaseStudies(response.data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  const filteredStudies = selectedIndustry === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  return (
    <div className="overflow-hidden" data-testid="case-studies-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Client Success Stories
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Case Studies
            </h1>
            <p className="text-lg text-muted-foreground">
              See how we've helped leading life sciences companies achieve their commercial goals through strategic marketing, creative excellence, and deep industry expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by industry:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedIndustry(industry)}
                  data-testid={`filter-${industry.toLowerCase().replace(' ', '-')}`}
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 md:py-32" data-testid="case-studies-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-56 rounded-t-xl" />
                  <div className="p-6 space-y-3">
                    <div className="bg-muted h-4 w-1/3 rounded" />
                    <div className="bg-muted h-6 w-2/3 rounded" />
                    <div className="bg-muted h-4 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  layout
                >
                  <Card 
                    className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-2xl transition-all duration-500 h-full"
                    onClick={() => setSelectedStudy(study)}
                    data-testid={`case-study-card-${study.id}`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={study.image_url}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-none mb-2">
                          {study.industry}
                        </Badge>
                        <h3 className="font-heading font-semibold text-lg text-white line-clamp-2">
                          {study.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-primary font-medium mb-2">{study.client}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {study.challenge}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {study.tags.slice(0, 3).map((tag, j) => (
                          <Badge key={j} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredStudies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No case studies found for this industry.</p>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudy(null)}
            data-testid="case-study-modal"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedStudy.image_url}
                  alt={selectedStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  data-testid="close-modal-button"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-none mb-3">
                    {selectedStudy.industry}
                  </Badge>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                    {selectedStudy.title}
                  </h2>
                  <p className="text-white/80 mt-2">{selectedStudy.client}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                        The Challenge
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                        Our Solution
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedStudy.solution}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {selectedStudy.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      Key Results
                    </h3>
                    <ul className="space-y-4">
                      {selectedStudy.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary text-xs font-bold">{i + 1}</span>
                          </div>
                          <span className="text-foreground text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link to="/contact" onClick={() => setSelectedStudy(null)}>
                        <Button className="w-full rounded-full" data-testid="modal-contact-cta">
                          Discuss Your Project
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's discuss how BioLumina can help achieve breakthrough results for your organization.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="rounded-full px-10 btn-glow"
              data-testid="case-studies-cta"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
