import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Save, CheckCircle, Github, Linkedin, Twitter, Mail, Link, FileText, LucideIcon } from "lucide-react";

type Settings = {
  github: string; linkedin: string; twitter: string; email: string;
  resume: string; phone: string; location: string; hire_email: string;
};

const defaultSettings: Settings = {
  github: "", linkedin: "", twitter: "", email: "",
  resume: "", phone: "", location: "", hire_email: "",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("key, value");
      if (data) {
        const obj: Partial<Settings> = {};
        for (const { key, value } of data) {
          if (key in defaultSettings) (obj as Record<string, string>)[key] = value;
        }
        setSettings(prev => ({ ...prev, ...obj }));
      }
      setLoading(false);
    }
    load();
  }, []);

  async function saveSettings() {
    setSaving(true);
    const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await supabase.from("settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function set(key: keyof Settings, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500 text-sm">Loading…</div>;

  const Field = ({ label, icon: Icon, settingKey, placeholder, type = "text" }: {
    label: string; icon: LucideIcon; settingKey: keyof Settings; placeholder: string; type?: string;
  }) => (
    <div>
      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <div className="relative">
        <Icon size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        <input type={type} value={settings[settingKey]} onChange={e => set(settingKey, e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white bg-white/[0.04] border border-white/[0.08] outline-none focus:border-emerald-500/40 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Settings</h2>
          <p className="text-sm text-gray-500">Manage social links, contact info, and site settings.</p>
        </div>
        <motion.button onClick={saveSettings} disabled={saving}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
          style={{ background: saved ? "rgba(0,255,157,0.2)" : "#00FF9D", color: saved ? "#00FF9D" : "#080808", border: saved ? "1px solid rgba(0,255,157,0.4)" : "none" }}>
          {saved ? <><CheckCircle size={14} /> Saved!</> : saving ? "Saving…" : <><Save size={14} /> Save Settings</>}
        </motion.button>
      </div>

      {/* Social Links */}
      <section className="rounded-xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#00FF9D" }}>Social Links</h3>
        <Field label="GitHub" icon={Github} settingKey="github" placeholder="https://github.com/username" />
        <Field label="LinkedIn" icon={Linkedin} settingKey="linkedin" placeholder="https://linkedin.com/in/username" />
        <Field label="Twitter / X" icon={Twitter} settingKey="twitter" placeholder="https://twitter.com/username" />
      </section>

      {/* Contact */}
      <section className="rounded-xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#00FF9D" }}>Contact Information</h3>
        <Field label="Public Email" icon={Mail} settingKey="email" placeholder="you@example.com" type="email" />
        <Field label="Hire Me Email" icon={Mail} settingKey="hire_email" placeholder="hire@example.com" type="email" />
        <Field label="Phone" icon={Link} settingKey="phone" placeholder="+91 00000 00000" />
        <Field label="Location" icon={Link} settingKey="location" placeholder="New Delhi, India" />
      </section>

      {/* Resume */}
      <section className="rounded-xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "#00FF9D" }}>Resume</h3>
        <Field label="Resume Link" icon={FileText} settingKey="resume" placeholder="https://drive.google.com/…" />
        <p className="text-xs text-gray-600">Link to your resume PDF (Google Drive, Dropbox, etc.)</p>
      </section>
    </div>
  );
}
