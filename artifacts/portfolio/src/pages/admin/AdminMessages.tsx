import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase, Message } from "@/lib/supabase";
import { Mail, Trash2, Eye, EyeOff, Search, RefreshCw } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string, read: boolean) {
    await supabase.from("messages").update({ read }).eq("id", id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read } : m));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read } : null);
  }

  async function deleteMsg(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const filtered = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Messages</h2>
          <p className="text-sm text-gray-500">{unreadCount} unread · {messages.length} total</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
        {(["all", "unread", "read"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2.5 rounded-lg text-sm capitalize font-medium transition-all"
            style={{
              background: filter === f ? "rgba(0,255,157,0.1)" : "rgba(255,255,255,0.03)",
              color: filter === f ? "#00FF9D" : "#666",
              border: filter === f ? "1px solid rgba(0,255,157,0.2)" : "1px solid rgba(255,255,255,0.06)",
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
        {/* List */}
        <div className="space-y-2 lg:max-h-[600px] lg:overflow-y-auto">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />
            ))
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-600">
              <Mail size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No messages found.</p>
            </div>
          ) : filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              onClick={() => { setSelected(m); if (!m.read) markRead(m.id, true); }}
              className="flex items-start gap-3 px-4 py-4 rounded-xl cursor-pointer transition-all"
              style={{
                background: selected?.id === m.id ? "rgba(0,255,157,0.06)" : "rgba(255,255,255,0.02)",
                border: selected?.id === m.id ? "1px solid rgba(0,255,157,0.15)" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: "rgba(0,255,157,0.08)", color: "#00FF9D" }}>
                {m.name[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white truncate">{m.name}</p>
                  {!m.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00FF9D" }} />}
                </div>
                <p className="text-xs text-gray-500 truncate mb-1">{m.email}</p>
                <p className="text-xs text-gray-600 truncate">{m.message}</p>
              </div>
              <span className="text-xs text-gray-700 flex-shrink-0">{new Date(m.created_at).toLocaleDateString()}</span>
            </motion.div>
          ))}
        </div>

        {/* Detail */}
        <div className="rounded-xl lg:max-h-[600px] overflow-auto" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {!selected ? (
            <div className="h-full flex items-center justify-center p-8 text-center text-gray-600">
              <div>
                <Mail size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a message to read</p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-0.5">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm hover:underline" style={{ color: "#00FF9D" }}>{selected.email}</a>
                  <p className="text-xs text-gray-600 mt-1">{new Date(selected.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => markRead(selected.id, !selected.read)}
                    className="p-2.5 rounded-lg text-gray-500 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)" }} title={selected.read ? "Mark unread" : "Mark read"}>
                    {selected.read ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button onClick={() => deleteMsg(selected.id)}
                    className="p-2.5 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <div className="mt-6">
                <a href={`mailto:${selected.email}?subject=Re: Your Message`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold"
                  style={{ background: "#00FF9D", color: "#080808" }}>
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
