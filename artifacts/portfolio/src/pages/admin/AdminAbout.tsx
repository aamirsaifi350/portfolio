import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Trash2, X, CheckCircle } from "lucide-react";

type Timeline = { id: string; year: string; title: string; description: string; order: number };

export default function AdminAbout() {
  const [form, setForm] = useState({ name: "", title: "", bio: "", profile_image: "", skills: [] as string[] });
  const [skillInput, setSkillInput] = useState("");
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aboutId, setAboutId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [about, tl] = await Promise.all([
        supabase.from("about").select("*").single(),
        supabase.from("timeline").select("*").order("order"),
      ]);
      if (about.data) {
        setAboutId(about.data.id);
        setForm({ name: about.data.name, title: about.data.title, bio: about.data.bio, profile_image: about.data.profile_image, skills: about.data.skills ?? [] });
      }
      setTimeline(tl.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function saveAbout() {
    setSaving(true);
    if (aboutId) {
      await supabase.from("about").update({ ...form, updated_at: new Date().toISOString() }).eq("id", aboutId);
    } else {
      const { data } = await supabase.from("about").insert({ ...form }).select().single();
      if (data) setAboutId(data.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function addTimeline() {
    const newEntry = { year: new Date().getFullYear().toString(), title: "New Entry", description: "", order: timeline.length };
    const { data } = await supabase.from("timeline").insert(newEntry).select().single();
    if (data) setTimeline(prev => [...prev, data]);
  }

  async function updateTimeline(id: string, field: string, value: string) {
    setTimeline(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    await supabase.from("timeline").update({ [field]: value }).eq("id", id);
  }

  async function deleteTimeline(id: string) {
    await supabase.from("timeline").delete().eq("id", id);
    setTimeline(prev => prev.filter(t => t.id !== id));
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500 text-sm">Loading…</div>;

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">About</h2>
          <p className="text-sm text-gray-500">Edit your personal info and timeline.</p>
        </div>
        <motion.button
          onClick={saveAbout}
          disabled={saving}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
          style={{ background: saved ? "rgba(0,255,157,0.2)" : "#00FF9D", color: saved ? "#00FF9D" : "#080808", border: saved ? "1px solid rgba(0,255,157,0.4)" : "none" }}
        >
          {saved ? <><CheckCircle size={14} /> Saved!</> : saving ? "Saving…" : <><Save size={14} /> Save Changes</>}
        </motion.button>
      </div>

      {/* Profile */}
      <section className="rounded-xl p-6 space-y-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#00FF9D" }}>Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Frontend Developer"
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Profile Image URL</label>
          <input value={form.profile_image} onChange={e => setForm(f => ({ ...f, profile_image: e.target.value }))}
            placeholder="https://…"
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Bio</label>
          <textarea rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40 resize-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Skills</label>
          <div className="flex gap-2 mb-3">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), skillInput.trim() && (setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] })), setSkillInput("")))}
              placeholder="React, TypeScript…"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none" />
            <button onClick={() => { if (skillInput.trim()) { setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] })); setSkillInput(""); } }}
              className="px-4 py-2.5 rounded-lg text-sm font-bold" style={{ background: "rgba(0,255,157,0.1)", color: "#00FF9D" }}>Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.skills.map(s => (
              <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(0,255,157,0.08)", color: "#00FF9D" }}>
                {s}
                <button onClick={() => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }))} className="hover:text-white"><X size={10} /></button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="rounded-xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#00FF9D" }}>Timeline</h3>
          <button onClick={addTimeline} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: "rgba(0,255,157,0.08)", color: "#00FF9D" }}>
            <Plus size={12} /> Add Entry
          </button>
        </div>
        {timeline.map((entry, i) => (
          <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-[80px_1fr_auto] gap-3 items-start">
            <input value={entry.year} onChange={e => updateTimeline(entry.id, "year", e.target.value)}
              className="px-3 py-2 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none text-center" />
            <div className="space-y-2">
              <input value={entry.title} onChange={e => updateTimeline(entry.id, "title", e.target.value)}
                placeholder="Title" className="w-full px-3 py-2 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none" />
              <input value={entry.description} onChange={e => updateTimeline(entry.id, "description", e.target.value)}
                placeholder="Description" className="w-full px-3 py-2 rounded-lg text-sm text-gray-400 bg-white/[0.04] border border-white/[0.08] outline-none" />
            </div>
            <button onClick={() => deleteTimeline(entry.id)} className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/5 mt-0.5">
              <Trash2 size={13} />
            </button>
          </motion.div>
        ))}
        {timeline.length === 0 && <p className="text-sm text-gray-600 py-2">No timeline entries yet.</p>}
      </section>
    </div>
  );
}
