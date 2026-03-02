import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Search } from "lucide-react";
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
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  return (
    <div className="overflow-hidden" data-testid="blog-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-pattern">
        <div className="absolute inset-0 hero-glow" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">Resources & Insights</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Blog & Resources</h1>
            <p className="text-lg text-muted-foreground">Stay informed with the latest insights, trends, and best practices in life sciences marketing from our team of experts.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px]">
                <img src={featuredPost.image_url} alt={featuredPost.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4"><Badge className="bg-primary text-white">Featured</Badge></div>
              </div>
              <div>
                <Badge variant="outline" className="mb-4">{featuredPost.category}</Badge>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" />{featuredPost.author}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{featuredPost.read_time}</div>
                </div>
                <Button className="rounded-full" data-testid="featured-post-cta">Read Article <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setSelectedCategory(category)} data-testid={`category-${category.toLowerCase()}`}>{category}</Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-full" data-testid="blog-search-input" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 md:py-32" data-testid="blog-posts-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-t-xl" />
                  <div className="p-6 space-y-3 bg-card rounded-b-xl border border-border">
                    <div className="bg-muted h-4 w-1/3 rounded" />
                    <div className="bg-muted h-6 w-2/3 rounded" />
                    <div className="bg-muted h-4 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} layout>
                  <Card className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-xl transition-all duration-500 h-full" data-testid={`blog-post-card-${post.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4"><Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">{post.category}</Badge></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><User className="w-4 h-4" /><span className="truncate max-w-[100px]">{post.author}</span></div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.read_time}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {!loading && filteredPosts.length === 0 && (<div className="text-center py-20"><p className="text-muted-foreground">No articles found matching your criteria.</p></div>)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32 bg-foreground text-white" id="newsletter" data-testid="newsletter-section">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for the latest insights in life sciences marketing delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full flex-1" data-testid="newsletter-email-input" />
            <Button type="submit" className="rounded-full px-8 bg-primary hover:bg-primary/90" data-testid="newsletter-submit-button">Subscribe</Button>
          </form>
          <p className="text-white/50 text-sm mt-4">By subscribing, you agree to our privacy policy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
