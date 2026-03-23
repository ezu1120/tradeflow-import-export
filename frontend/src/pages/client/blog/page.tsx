import { ArrowRight, Calendar, User, Search, TrendingUp, BookOpen, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import PageHeader from "./header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { api } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  image: string;
  published_date: string;
  read_time: string;
  is_featured: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useSiteSettings();

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      
      // Fetch all posts
      const postsResponse = await api.get('/api/blog/posts/');
      const allPosts = postsResponse.data.results || [];
      
      // Fetch categories
      const categoriesResponse = await api.get('/api/blog/categories/');
      const allCategories = categoriesResponse.data.results || [];
      
      // Set featured post (first featured post or first post)
      const featured = allPosts.find((post: BlogPost) => post.is_featured) || allPosts[0];
      setFeaturedPost(featured);
      
      // Set regular posts (exclude featured)
      const regularPosts = allPosts.filter((post: BlogPost) => post.id !== featured?.id);
      setBlogPosts(regularPosts);
      
      // Set categories
      setCategories(allCategories);
      
    } catch (error) {
      console.error('Error fetching blog data:', error);
      // Keep empty arrays if API fails
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category.name === selectedCategory);

  // Trending posts (first 3 posts)
  const trendingPosts = blogPosts.slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <PageHeader />

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Loading articles...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-6">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                    {settings.blog_hero_badge}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  {settings.blog_hero_title.split('&')[0]}
                  <span className="block bg-gradient-to-r from-[#D4AF37] to-amber-300 bg-clip-text text-transparent">
                    {settings.blog_hero_title.includes('&') ? '& ' + settings.blog_hero_title.split('&')[1] : ''}
                  </span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                  {settings.blog_hero_subtitle}
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      className="pl-12 h-14 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-700/50 bg-slate-800/30">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wide">
                    Featured Article
                  </h2>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-800 h-[400px] lg:h-[500px] border border-slate-700/50 group">
                    <img
                      src={featuredPost.image || '/placeholder.jpg'}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    
                    {/* Overlay Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-block px-4 py-2 bg-[#D4AF37] text-slate-900 text-sm font-bold rounded-lg">
                        {featuredPost.category.name}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-slate-400">
                        {featuredPost.read_time}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#D4AF37]" />
                        {formatDate(featuredPost.published_date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#D4AF37]" />
                        {featuredPost.author}
                      </div>
                    </div>
                    
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <Button className="gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold h-12 px-8">
                        Read Full Article <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Trending Posts Sidebar */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Category Filter */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Filter className="w-5 h-5 text-[#D4AF37]" />
                      <h3 className="text-lg font-bold text-white">Filter by Category</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedCategory === "All"
                            ? 'bg-[#D4AF37] text-slate-900'
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                        }`}
                      >
                        All ({blogPosts.length})
                      </button>
                      {categories.map((category) => {
                        const count = blogPosts.filter(post => post.category.name === category.name).length;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              selectedCategory === category.name
                                ? 'bg-[#D4AF37] text-slate-900'
                                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                            }`}
                          >
                            {category.name} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Blog Grid */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Latest Articles
                    </h2>
                    <p className="text-slate-300 mb-8">
                      Stay updated with the latest trends and insights
                    </p>
                  </div>

                  {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {filteredPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <BlogCard post={{
                            id: post.id,
                            title: post.title,
                            excerpt: post.excerpt,
                            image: post.image || '/placeholder.jpg',
                            date: formatDate(post.published_date),
                            author: post.author,
                            category: post.category.name,
                            readTime: post.read_time
                          }} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-400 text-lg">No articles found in this category.</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Trending Posts */}
                    {trendingPosts.length > 0 && (
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-6">
                          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                          <h3 className="text-lg font-bold text-white">Trending Now</h3>
                        </div>
                        
                        <div className="space-y-6">
                          {trendingPosts.map((post, index) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="group cursor-pointer"
                            >
                              <Link to={`/blog/${post.slug}`}>
                                <div className="flex gap-4">
                                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700">
                                    <img
                                      src={post.image || '/placeholder.jpg'}
                                      alt={post.title}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                                      {post.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                      <span className="text-[#D4AF37]">{post.category.name}</span>
                                      <span>•</span>
                                      <span>{post.read_time}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Newsletter CTA */}
                    <div className="bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Stay Informed
                      </h3>
                      <p className="text-slate-800 mb-4 text-sm">
                        Get weekly insights delivered to your inbox
                      </p>
                      <Input
                        type="email"
                        placeholder="Your email"
                        className="mb-3 bg-white border-0 text-slate-900"
                      />
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900 border-t border-slate-700/50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {settings.blog_cta_title}
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  {settings.blog_cta_subtitle}
                </p>
                <Link to="/contact">
                  <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold h-12 px-8">
                    Get Started Today
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
