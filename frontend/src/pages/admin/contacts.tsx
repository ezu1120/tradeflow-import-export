import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/api/contacts/messages/");
      setContacts(res.data.results || res.data);
    } catch { toast.error("Failed to load contacts"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/api/contacts/messages/${id}/`);
      toast.success("Deleted successfully");
      fetchContacts();
    } catch { toast.error("Failed to delete"); }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await api.patch(`/api/contacts/messages/${id}/`, { status });
      toast.success("Status updated");
      fetchContacts();
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch { toast.error("Failed to update status"); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Contact Messages</h2>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Subject</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-slate-400">No messages found</td></tr>
                )}
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-slate-300">{c.email}</td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{c.subject}</td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="bg-slate-700 text-white text-xs rounded-lg px-2 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(c)} className="p-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold text-white mb-4">Message from {selected.name}</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-slate-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              {selected.phone && <div><span className="text-slate-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>}
              {selected.company && <div><span className="text-slate-400">Company:</span> <span className="text-white ml-2">{selected.company}</span></div>}
              <div><span className="text-slate-400">Subject:</span> <span className="text-white ml-2 capitalize">{selected.subject}</span></div>
              <div>
                <span className="text-slate-400">Message:</span>
                <p className="text-white mt-2 bg-slate-900/50 rounded-lg p-3 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full bg-[#D4AF37] text-[#101828] font-bold py-2.5 rounded-xl hover:bg-[#D4AF37]/90 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
