import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, 
  Lightbulb, 
  Heart, 
  Shield,
  ArrowRight,
  Linkedin,
  Award,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const values = [
  {
    icon: Target,
    title: "Scientific Rigor",
    description: "We ground every strategy in scientific accuracy and evidence-based insights."
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "We believe great science deserves great storytelling that captivates and inspires."
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "We work as an extension of your team, invested in your success as our own."
  },
  {
    icon: Shield,
    title: "Ethical Standards",
    description: "We uphold the highest standards of integrity and regulatory compliance."
  }
];

const milestones = [
  { year: "2015", event: "BioLumina founded in Boston" },
  { year: "2017", event: "Expanded to pharmaceutical sector" },
  { year: "2019", event: "Opened European operations" },
  { year: "2021", event: "100th client milestone" },
  { year: "2023", event: "Best Healthcare Agency award" },
  { year: "2024", event: "Launched AI-powered insights platform" }
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API}/team`);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="overflow-hidden" data-testid="about-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span 
              variants={fadeUpVariant}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              About Us
            </motion.span>
            <motion.h1 
              variants={fadeUpVariant}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Pioneering Life Sciences Marketing
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-lg text-muted-foreground"
            >
              For over a decade, BioLumina has been at the forefront of life sciences marketing, 
              helping biotech, pharmaceutical, and medical device companies tell their stories and achieve their goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BioLumina was founded in 2015 by Dr. Alexandra Reid, a former pharmaceutical 
                  marketing executive with a vision to bridge the gap between scientific innovation 
                  and effective market communication.
                </p>
                <p>
                  Recognizing that life sciences companies faced unique challenges in communicating 
                  complex science to diverse audiences, she assembled a team of scientists, 
                  marketers, and creative professionals who shared her passion for the industry.
                </p>
                <p>
                  Today, BioLumina is a full-service marketing agency serving over 150 clients 
                  globally, from early-stage biotech startups to established pharmaceutical leaders. 
                  Our team of 80+ specialists combines deep scientific expertise with creative 
                  excellence to deliver results that matter.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1758873269035-aae0e1fd3422?w=800"
                  alt="BioLumina team"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass-heavy p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">10+</p>
                    <p className="text-sm text-muted-foreground">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-muted/30" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              What Drives Us
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, i) => (
              <motion.div key={i} variants={fadeUpVariant}>
                <Card className="h-full border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Key Milestones
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-heavy rounded-xl p-6 inline-block">
                      <span className="text-primary font-heading font-bold text-xl">{milestone.year}</span>
                      <p className="text-foreground mt-2">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary relative z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-muted/30" id="team" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Leadership
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in life sciences, 
              marketing, and creative strategy.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, i) => (
              <motion.div key={member.id} variants={fadeUpVariant}>
                <Card className="overflow-hidden group border-border/50 hover:shadow-xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
                        data-testid={`team-linkedin-${member.id}`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold">80+</p>
              <p className="text-white/70 text-sm">Team Members</p>
            </div>
            <div>
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold">25+</p>
              <p className="text-white/70 text-sm">Industry Awards</p>
            </div>
            <div>
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold">150+</p>
              <p className="text-white/70 text-sm">Clients Served</p>
            </div>
            <div>
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold">500+</p>
              <p className="text-white/70 text-sm">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We're always looking for talented individuals who share our passion for life sciences and marketing excellence.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="rounded-full px-8 btn-glow"
              data-testid="careers-cta"
            >
              Explore Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
