import { useEffect, useState } from "react";
import { FileText, MessageSquare, ClipboardList, TrendingUp } from "lucide-react";
import { api } from "@/hooks/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, contacts: 0, quotes: 0 });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, contacts, quotes] = await Promise.all([
          api.get("/api/blog/posts/"),
          api.get("/api/contacts/messages/"),
          api.get("/api/quotes/"),
        ]);
        setStats({
          blogs: blogs.data.count || blogs.data.length || 0,
          contacts: contacts.data.count || contacts.data.length || 0,
          quotes: quotes.data.count || quotes.data.length || 0,
        });
        setRecentContacts((contacts.data.results || contacts.data).slice(0, 5));
        setRecentQuotes((quotes.data.results || quotes.data).slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "from-blue-500 to-cyan-500" },
    { label: "Contact Messages", value: stats.contacts, icon: MessageSquare, color: "from-[#D4AF37] to-yellow-600" },
    { label: "Quote Requests", value: stats.quotes, icon: ClipboardList, color: "from-purple-500 to-pink-500" },
    { label: "Total Interactions", value: stats.contacts + stats.quotes, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-slate-400">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Contacts</h3>
          <div className="space-y-3">
            {recentContacts.length === 0 && <p className="text-slate-400 text-sm">No contacts yet.</p>}
            {recentContacts.map((c: any) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.status === "new" ? "bg-green-500/20 text-green-400" :
                  c.status === "read" ? "bg-blue-500/20 text-blue-400" :
                  "bg-slate-600/50 text-slate-300"
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Quote Requests</h3>
          <div className="space-y-3">
            {recentQuotes.length === 0 && <p className="text-slate-400 text-sm">No quotes yet.</p>}
            {recentQuotes.map((q: any) => (
              <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                <div>
                  <p className="text-sm font-medium text-white">{q.email}</p>
                  <p className="text-xs text-slate-400">{q.origin_country} → {q.destination_country}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  q.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                  q.status === "reviewed" ? "bg-blue-500/20 text-blue-400" :
                  q.status === "accepted" ? "bg-green-500/20 text-green-400" :
                  "bg-slate-600/50 text-slate-300"
                }`}>{q.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
