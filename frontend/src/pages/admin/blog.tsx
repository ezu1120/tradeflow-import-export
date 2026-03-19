import { useEffect, useState } from "react";
import { Trash2, Plus, Edit2, X } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";

const emptyForm = { title: "", excerpt: "", content: "", author: "", image: "", read_time: "5 min read", is_featured: false, is_published: true, category: "" };

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    try {
      const [postsRes, catsRes] = await Promise.all([
        api.get("/api/blog/posts/"),
        api.get("/api/blog/categories/"),
      ]);
      setPosts(postsRes.data.results || postsRes.data);
      setCategories(catsRes.data.results || catsRes.data);
    } catch { toast.error("Failed to load blog data"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/api/blog/posts/${slug}/`);
      toast.success("Post deleted");
      fetchData();
    } catch { toast.error("Failed to delete"); }
  };

  const openEdit = (post: any) => {
    setEditing(post);
    setForm({ ...post, category: post.category?.id || post.category || "" });
    setShowForm(true);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/api/blog/posts/${editing.slug}/`, form);
        toast.success("Post updated");
      } else {
        await api.post("/api/blog/posts/", form);
        toast.success("Post created");
      }
      setShowForm(false);
      fetchData();
    } catch { toast.error("Failed to save post"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#D4AF37] text-[#101828] font-bold px-4 py-2 rounded-xl hover:bg-[#D4AF37]/90 transition-colors text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Title</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Author</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Featured</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Published</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-slate-400">No posts found</td></tr>
                )}
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-white font-medium max-w-[200px] truncate">{p.title}</td>
                    <td className="px-4 py-3 text-slate-300">{p.author}</td>
                    <td className="px-4 py-3 text-slate-300">{p.category?.name || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.is_featured ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-slate-700 text-slate-400"}`}>
                        {p.is_featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.is_published ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {p.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.slug)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editing ? "Edit Post" : "New Post"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 mb-1 block">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Read Time</label>
                  <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 mb-1 block">Excerpt</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 mb-1 block">Content</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-[#D4AF37]" />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-[#D4AF37]" />
                    Published
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-700 text-white font-medium py-2.5 rounded-xl hover:bg-slate-600 transition-colors text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl hover:bg-[#D4AF37]/90 transition-colors text-sm">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
