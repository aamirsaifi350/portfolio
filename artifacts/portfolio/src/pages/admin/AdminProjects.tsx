import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, Project } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, Star, ExternalLink, Github, Search } from "lucide-react";

const emptyProject: Omit<Project, "id" | "created_at"> = {
  name: "", description: "", tech: [], category: "Frontend",
  live_url: "", github_url: "", featured: false, thumbnail: "", gallery: [],
};

const categories = ["Frontend", "Full Stack", "Backend", "Mobile", "Design", "Other"];

function ProjectModal({ project, onClose, onSave }: {
  project: Partial<Project> | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState<Omit<Project, "id" | "created_at">>(
    project ? { name: project.name ?? "", description: project.description ?? "", tech: project.tech ?? [], category: project.category ?? "Frontend", live_url: project.live_url ?? "", github_url: project.github_url ?? "", featured: project.featured ?? false, thumbnail: project.thumbnail ?? "", gallery: project.gallery ?? [] }
    : { ...emptyProject }
  );
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function addTech() {
    if (techInput.trim() && !form.tech.includes(techInput.trim())) {
      setForm(f => ({ ...f, tech: [...f.tech, techInput.trim()] }));
    }
    setTechInput("");
  }

  async function handleSave() {
    if (!form.name.trim()) { setError("Project name is required."); return; }
    setSaving(true);
    setError("");
    if (project?.id) {
      const { error } = await supabase.from("projects").update(form).eq("id", project.id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("projects").insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    setSaving(false);
    onSave();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#0e0e0e", border: "1px solid rgba(0,255,157,0.12)" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            {project?.id ? "Edit Project" : "Add Project"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-5">
          {error && <p className="text-sm text-red-400 px-4 py-3 rounded-lg" style={{ background: "rgba(255,59,48,0.08)" }}>{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40"
                style={{ background: "#141414" }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40 resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Live Demo URL</label>
              <input value={form.live_url} onChange={e => setForm(f => ({ ...f, live_url: e.target.value }))}
                placeholder="https://" className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">GitHub URL</label>
              <input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))}
                placeholder="https://github.com/" className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Thumbnail URL</label>
            <input value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}
              placeholder="https://…" className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input value={techInput} onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech())}
                placeholder="React, Tailwind…" className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none" />
              <button onClick={addTech} className="px-4 py-2.5 rounded-lg text-sm font-bold" style={{ background: "rgba(0,255,157,0.1)", color: "#00FF9D" }}>Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tech.map(t => (
                <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(0,255,157,0.08)", color: "#00FF9D" }}>
                  {t}
                  <button onClick={() => setForm(f => ({ ...f, tech: f.tech.filter(x => x !== t) }))} className="hover:text-white"><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
              className="relative w-10 h-6 rounded-full transition-all duration-200 flex-shrink-0"
              style={{ background: form.featured ? "#00FF9D" : "rgba(255,255,255,0.1)" }}
            >
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200"
                style={{ transform: form.featured ? "translateX(16px)" : "translateX(0)" }} />
            </div>
            <span className="text-sm text-gray-300">Featured Project</span>
            <Star size={14} style={{ color: form.featured ? "#FFBD2E" : "#555" }} />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50 transition-all"
            style={{ background: "#00FF9D", color: "#080808" }}>
            {saving ? "Saving…" : "Save Project"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalProject, setModalProject] = useState<Partial<Project> | null | undefined>(undefined);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    load();
  }

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Projects</h2>
          <p className="text-sm text-gray-500">{projects.length} total projects</p>
        </div>
        <button onClick={() => setModalProject(null)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
          style={{ background: "#00FF9D", color: "#080808" }}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{search ? "No projects match your search." : "No projects yet. Add your first project."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-4 rounded-xl group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {p.thumbnail ? (
                <img src={p.thumbnail} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(0,255,157,0.08)" }}>
                  <FolderOpen size={18} style={{ color: "#00FF9D" }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-white truncate">{p.name}</p>
                  {p.featured && <Star size={11} style={{ color: "#FFBD2E", fill: "#FFBD2E" }} />}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 uppercase tracking-wider">{p.category}</span>
                  <span className="text-gray-700">·</span>
                  <div className="flex gap-1.5">
                    {(Array.isArray(p.tech)
  ? p.tech
  : String(p.tech || "")
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)
).slice(0, 3).map(t => (
  <span
    key={t}
    className="text-xs px-1.5 py-0.5 rounded"
    style={{
      background: "rgba(0,255,157,0.06)",
      color: "#00FF9D"
    }}
  >
    {t}
  </span>
))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5"><ExternalLink size={14} /></a>}
                {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5"><Github size={14} /></a>}
                <button onClick={() => setModalProject(p)} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5"><Pencil size={14} /></button>
                <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/5"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalProject !== undefined && (
          <ProjectModal project={modalProject} onClose={() => setModalProject(undefined)} onSave={load} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FolderOpen({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
}
