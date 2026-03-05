import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Search, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categories = ["All", "Regulatory", "Innovation", "Strategy"];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blog`).then(r => { setPosts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  return (
    <div className="relative" data-testid="blog-page">
      <div className="noise-overlay" />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Insights</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">Blog & Resources</h1>
            <p className="text-lg text-muted-foreground">Latest insights, trends, and best practices in life sciences marketing.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && (
        <section className="py-12 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden h-[350px] tracing-border">
                <img src={featuredPost.image_url} alt={featuredPost.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4"><Badge className="bg-primary text-primary-foreground">Featured</Badge></div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">{featuredPost.category}</span>
                <h2 className="font-heading text-3xl font-bold text-foreground mt-3 mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" />{featuredPost.author}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{featuredPost.read_time}</div>
                </div>
                <Button className="rounded-full btn-glow" data-testid="featured-post-cta">Read Article <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter */}
      <section className="py-8 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" className={`rounded-full ${selectedCategory !== category ? 'border-border/50' : ''}`} onClick={() => setSelectedCategory(category)} data-testid={`category-${category.toLowerCase()}`}>{category}</Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-11 rounded-full bg-secondary/30 border-border/30" data-testid="blog-search-input" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24" data-testid="blog-posts-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[1,2,3,4,5,6].map(i => (<div key={i} className="animate-pulse rounded-2xl"><div className="bg-secondary h-48 rounded-t-2xl" /><div className="p-6 space-y-3 bg-card/30 rounded-b-2xl border border-border/30"><div className="bg-secondary h-4 w-1/3 rounded" /><div className="bg-secondary h-6 w-2/3 rounded" /></div></div>))}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} layout>
                  <Card className="premium-card overflow-hidden bg-card/30 border-border/30 rounded-2xl cursor-pointer group" data-testid={`blog-post-card-${post.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4"><Badge className="bg-secondary/80 backdrop-blur-sm text-foreground">{post.category}</Badge></div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight className="w-4 h-4 text-white" /></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2"><User className="w-3 h-3" /><span className="truncate max-w-[100px]">{post.author}</span></div>
                        <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{post.read_time}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {!loading && filteredPosts.length === 0 && (<div className="text-center py-20"><p className="text-muted-foreground">No articles found.</p></div>)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 relative" data-testid="newsletter-section">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4">Stay <span className="gradient-text">Informed</span></h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">Subscribe for the latest insights in life sciences marketing.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-full bg-secondary/30 border-border/30 h-14 flex-1" data-testid="newsletter-email-input" />
              <Button type="submit" className="rounded-full h-14 px-8 btn-glow" data-testid="newsletter-submit-button">Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
