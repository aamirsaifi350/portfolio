import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FolderOpen, Puzzle, Mail, Activity, TrendingUp, Eye, LucideIcon } from "lucide-react";

type Stat = { label: string; value: number; icon: LucideIcon; color: string };

function StatCard({ label, value, icon: Icon, color, delay }: Stat & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl p-6"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg" style={{ background: `${color}12` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <TrendingUp size={14} className="text-gray-600" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, components: 0, messages: 0, unread: 0 });
  const [recentMessages, setRecentMessages] = useState<{ name: string; email: string; created_at: string; read: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [proj, comp, msgs] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("components").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id, name, email, created_at, read").order("created_at", { ascending: false }).limit(5),
      ]);
      const unread = (msgs.data ?? []).filter(m => !m.read).length;
      setStats({ projects: proj.count ?? 0, components: comp.count ?? 0, messages: msgs.data?.length ?? 0, unread });
      setRecentMessages(msgs.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const cards: (Stat & { delay: number })[] = [
    { label: "Total Projects", value: stats.projects, icon: FolderOpen, color: "#00FF9D", delay: 0 },
    { label: "Components", value: stats.components, icon: Puzzle, color: "#FF3B30", delay: 0.1 },
    { label: "Messages", value: stats.messages, icon: Mail, color: "#FFBD2E", delay: 0.2 },
    { label: "Unread", value: stats.unread, icon: Eye, color: "#5B8DEF", delay: 0.3 },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Dashboard</h2>
        <p className="text-sm text-gray-500">Overview of your portfolio content.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl p-6 animate-pulse" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", height: 120 }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => <StatCard key={c.label} {...c} />)}
        </div>
      )}

      {/* Recent messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2 px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Activity size={15} style={{ color: "#00FF9D" }} />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Recent Messages</h3>
        </div>
        {recentMessages.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-600">No messages yet.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {recentMessages.map(m => (
              <div key={m.email + m.created_at} className="flex items-center gap-4 px-6 py-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "rgba(0,255,157,0.1)", color: "#00FF9D" }}>
                  {m.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!m.read && <span className="w-2 h-2 rounded-full" style={{ background: "#00FF9D" }} />}
                  <span className="text-xs text-gray-600">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
