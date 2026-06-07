import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { signIn } = useAdminAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate("/admin");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#080808" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "#00FF9D" }}>Portfolio</p>
          <h1 className="font-heading text-4xl uppercase tracking-widest text-white">Admin</h1>
          <div className="mt-3 h-px w-16 mx-auto" style={{ background: "linear-gradient(to right, transparent, #00FF9D, transparent)" }} />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,157,0.10)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(0,255,157,0.04)",
          }}
        >
          <p className="text-sm text-gray-400 mb-8 text-center">Sign in to manage your portfolio</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 px-4 py-3 rounded-lg"
              style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", color: "#ff6b6b" }}
            >
              <AlertCircle size={14} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,255,157,0.4)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,255,157,0.4)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest mt-2 transition-all disabled:opacity-50"
              style={{ background: "#00FF9D", color: "#080808" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Protected area — portfolio admin only
        </p>
      </motion.div>
    </div>
  );
}
