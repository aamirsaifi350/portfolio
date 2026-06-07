import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Upload, Trash2, Copy, Check, Image, RefreshCw } from "lucide-react";

type MediaFile = { name: string; id: string; created_at: string; metadata: { size: number; mimetype: string } };

const BUCKET = "portfolio-media";

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.storage.from(BUCKET).list("", { sortBy: { column: "created_at", order: "desc" } });
    setFiles((data ?? []) as MediaFile[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    await supabase.storage.from(BUCKET).upload(filename, file);
    setUploading(false);
    load();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deleteFile(name: string) {
    if (!confirm("Delete this file?")) return;
    await supabase.storage.from(BUCKET).remove([name]);
    load();
  }

  function getPublicUrl(name: string) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(name);
    return data.publicUrl;
  }

  async function copyUrl(name: string) {
    await navigator.clipboard.writeText(getPublicUrl(name));
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function formatBytes(b: number) {
    if (b < 1024) return `${b}B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)}KB`;
    return `${(b / 1024 / 1024).toFixed(1)}MB`;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-heading uppercase tracking-widest text-white mb-1">Media Library</h2>
          <p className="text-sm text-gray-500">{files.length} files uploaded</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors">
            <RefreshCw size={13} />
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
            style={{ background: "#00FF9D", color: "#080808" }}>
            <Upload size={14} /> {uploading ? "Uploading…" : "Upload File"}
          </motion.button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadFile} />
        </div>
      </div>

      {/* Upload zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all"
        style={{ borderColor: "rgba(0,255,157,0.15)" }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const f = e.dataTransfer.files[0];
          if (f && fileRef.current) {
            const dt = new DataTransfer();
            dt.items.add(f);
            fileRef.current.files = dt.files;
            fileRef.current.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }}
      >
        <Upload size={28} className="mx-auto mb-3" style={{ color: "rgba(0,255,157,0.4)" }} />
        <p className="text-sm text-gray-400">Click to upload or drag & drop</p>
        <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF, WebP — max 50MB</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />)}
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <Image size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No files uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f, i) => (
            <motion.div key={f.id ?? f.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="group relative rounded-xl overflow-hidden aspect-square"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src={getPublicUrl(f.name)} alt={f.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"
                style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
                <div className="flex justify-end gap-1">
                  <button onClick={() => copyUrl(f.name)}
                    className="p-2 rounded-lg text-white transition-colors"
                    style={{ background: copiedId === f.name ? "rgba(0,255,157,0.2)" : "rgba(255,255,255,0.1)" }}>
                    {copiedId === f.name ? <Check size={13} style={{ color: "#00FF9D" }} /> : <Copy size={13} />}
                  </button>
                  <button onClick={() => deleteFile(f.name)}
                    className="p-2 rounded-lg text-white hover:bg-red-400/20 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
                <div>
                  <p className="text-xs text-white truncate font-medium">{f.name}</p>
                  {f.metadata?.size && <p className="text-xs text-gray-400">{formatBytes(f.metadata.size)}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
