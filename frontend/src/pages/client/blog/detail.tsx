import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import { api } from "@/hooks/api";
import PageHeader from "./header";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: { id: number; name: string; slug: string };
  image: string;
  published_date: string;
  read_time: string;
  is_featured: boolean;
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);

    api.get(`/api/blog/posts/${slug}/`)
      .then((res) => {
        setPost(res.data);
        // fetch related posts from same category
        return api.get(`/api/blog/posts/?category=${res.data.category?.slug || ""}`);
      })
      .then((res) => {
        const all = res.data.results || res.data;
        setRelated(all.filter((p: BlogPost) => p.slug !== slug).slice(0, 3));
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (loading) return (
    <main className="min-h-screen bg-slate-900">
      <PageHeader />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    </main>
  );

  if (notFound || !post) return (
    <main className="min-h-screen bg-slate-900">
      <PageHeader />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-slate-400 mb-8">This article doesn't exist or has been removed.</p>
        <Link to="/blog" className="bg-[#D4AF37] text-[#101828] font-bold px-6 py-3 rounded-xl hover:bg-[#D4AF37]/90 transition-colors">
          Back to Blog
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-900">
      <PageHeader />

      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={post.image || "/placeholder.jpg"} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <span className="inline-block bg-[#D4AF37] text-[#101828] text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category?.name}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>{formatDate(post.published_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>{post.read_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D4AF37]" />
              <span>{post.category?.name}</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-slate-300 leading-relaxed mb-8 font-light italic border-l-4 border-[#D4AF37] pl-6">
            {post.excerpt}
          </p>

          {/* Body */}
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </motion.div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all">
                  <div className="h-40 overflow-hidden">
                    <img src={r.image || "/placeholder.jpg"} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#D4AF37] font-semibold">{r.category?.name}</span>
                    <h4 className="text-white font-semibold mt-1 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{r.title}</h4>
                    <p className="text-xs text-slate-400 mt-2">{r.read_time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
