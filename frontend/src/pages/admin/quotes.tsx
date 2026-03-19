import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";
import { api } from "@/hooks/api";
import { toast } from "sonner";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchQuotes = async () => {
    try {
      const res = await api.get("/api/quotes/");
      setQuotes(res.data.results || res.data);
    } catch { toast.error("Failed to load quotes"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this quote request?")) return;
    try {
      await api.delete(`/api/quotes/${id}/`);
      toast.success("Deleted successfully");
      fetchQuotes();
    } catch { toast.error("Failed to delete"); }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await api.patch(`/api/quotes/${id}/`, { status });
      toast.success("Status updated");
      fetchQuotes();
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch { toast.error("Failed to update status"); }
  };

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    reviewed: "bg-blue-500/20 text-blue-400",
    quoted: "bg-purple-500/20 text-purple-400",
    accepted: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Quote Requests</h2>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Route</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Cargo</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Weight</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-slate-400">No quote requests found</td></tr>
                )}
                {quotes.map((q) => (
                  <tr key={q.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3 text-white">{q.email}</td>
                    <td className="px-4 py-3 text-slate-300">{q.origin_country} → {q.destination_country}</td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{q.cargo_type}</td>
                    <td className="px-4 py-3 text-slate-300">{q.weight} kg</td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className="bg-slate-700 text-white text-xs rounded-lg px-2 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="quoted">Quoted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(q)} className="p-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(q.id)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
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
            <h3 className="text-lg font-bold text-white mb-4">Quote Request Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-slate-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-slate-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              {selected.company_name && <div><span className="text-slate-400">Company:</span> <span className="text-white ml-2">{selected.company_name}</span></div>}
              <div><span className="text-slate-400">Route:</span> <span className="text-white ml-2">{selected.origin_country} → {selected.destination_country}</span></div>
              <div><span className="text-slate-400">Cargo Type:</span> <span className="text-white ml-2 capitalize">{selected.cargo_type}</span></div>
              <div><span className="text-slate-400">Weight:</span> <span className="text-white ml-2">{selected.weight} kg</span></div>
              <div>
                <span className="text-slate-400">Status:</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[selected.status] || ""}`}>{selected.status}</span>
              </div>
              {selected.additional_info && (
                <div>
                  <span className="text-slate-400">Additional Info:</span>
                  <p className="text-white mt-2 bg-slate-900/50 rounded-lg p-3">{selected.additional_info}</p>
                </div>
              )}
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
