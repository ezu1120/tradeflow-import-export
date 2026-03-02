import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col h-full rounded-lg overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-300">
      {/* Image */}
      <div className="overflow-hidden bg-slate-900 h-48">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wide rounded border border-[#D4AF37]/20">
            {post.category}
          </span>
          <span className="text-xs text-slate-400">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-300 mb-4 flex-1 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-[#D4AF37]" />
            {post.author}
          </div>
        </div>

        {/* Link */}
        <Link
          to="#"
          className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 font-semibold text-sm group/link"
        >
          Read More{" "}
          <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition" />
        </Link>
      </div>
    </article>
  );
}
