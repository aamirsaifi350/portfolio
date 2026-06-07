import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, Component } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Search, Puzzle } from "lucide-react";

const emptyComp: Omit<Component, "id" | "created_at"> = {
  name: "", category: "UI", description: "", preview: "", html: "", css: "", js: "", react: "",
};

const categories = ["UI", "Layout", "Navigation", "Forms", "Cards", "Animation", "Other"];

function CompModal({ comp, onClose, onSave }: {
  comp: Partial<Component> | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState<Omit<Component, "id" | "created_at">>(
    comp ? { name: comp.name ?? "", category: comp.category ?? "UI", description: comp.description ?? "", preview: comp.preview ?? "", html: comp.html ?? "", css: comp.css ?? "", js: comp.js ?? "", react: comp.react ?? "" }
    : { ...emptyComp }
  );
  const [tab, setTab] = useState<"info" | "html" | "css" | "js" | "react">("info");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!form.name.trim()) { setError("Component name is required."); return; }
    setSaving(true);
    setError("");
    if (comp?.id) {
      const { error } = await supabase.from("components").update(form).eq("id", comp.id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("components").insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    setSaving(false);
    onSave();
    onClose();
  }

  const codeTabs: Array<{ key: "html" | "css" | "js" | "react"; label: string; placeholder: string }> = [
    { key: "html", label: "HTML", placeholder: "<div class='card'>…</div>" },
    { key: "css", label: "CSS", placeholder: ".card { … }" },
    { key: "js", label: "JavaScript", placeholder: "document.querySelector(…)" },
    { key: "react", label: "React", placeholder: "export function Card() { … }" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{ background: "#0e0e0e", border: "1px solid rgba(0,255,157,0.12)" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 z-10" style={{ background: "#0e0e0e", borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            {comp?.id ? "Edit Component" : "Add Component"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
          {[{ key: "info", label: "Info" }, ...codeTabs].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all"
              style={{
                background: tab === t.key ? "rgba(0,255,157,0.1)" : "transparent",
                color: tab === t.key ? "#00FF9D" : "#555",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {error && <p className="text-sm text-red-400 px-4 py-3 rounded-lg" style={{ background: "rgba(255,59,48,0.08)" }}>{error}</p>}

          {tab === "info" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Component Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-white/[0.08] outline-none"
                    style={{ background: "#141414" }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Preview Image URL</label>
                <input value={form.preview} onChange={e => setForm(f => ({ ...f, preview: e.target.value }))}
                  placeholder="https://…" className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
              </div>
            </>
          )}

          {codeTabs.map(t => tab === t.key && (
            <div key={t.key}>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.label} Code</label>
              <textarea
                rows={18}
                value={form[t.key]}
                onChange={e => setForm(f => ({ ...f, [t.key]: e.target.value }))}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 rounded-lg text-sm text-green-300 bg-black/40 border border-white/[0.08] outline-none resize-y"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.6 }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
            style={{ background: "#00FF9D", color: "#080808" }}>
            {saving ? "Saving…" : "Save Component"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminComponents() {
  const [comps, setComps] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalComp, setModalComp] = useState<Partial<Component> | null | undefined>(undefined);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("components").select("*").order("created_at", { ascending: false });
    setComps(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function deleteComp(id: string) {
    if (!confirm("Delete this component?")) return;
    await supabase.from("components").delete().eq("id", id);
    load();
  }

  const filtered = comps.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Components</h2>
          <p className="text-sm text-gray-500">{comps.length} total components</p>
        </div>
        <button onClick={() => setModalComp(null)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: "#00FF9D", color: "#080808" }}>
          <Plus size={15} /> Add Component
        </button>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search components…"
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <Puzzle size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{search ? "No components match." : "No components yet."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-4 rounded-xl group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,59,48,0.08)" }}>
                <Puzzle size={16} style={{ color: "#FF3B30" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{c.name}</p>
                <p className="text-xs text-gray-600">{c.category} · {c.description?.slice(0, 60)}…</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModalComp(c)} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5"><Pencil size={14} /></button>
                <button onClick={() => deleteComp(c.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/5"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalComp !== undefined && (
          <CompModal comp={modalComp} onClose={() => setModalComp(undefined)} onSave={load} />
        )}
      </AnimatePresence>
    </div>
  );
}
