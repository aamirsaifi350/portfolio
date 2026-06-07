import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard, FolderOpen, Puzzle, User, Mail,
  Settings, Image, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const nav = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/components", icon: Puzzle, label: "Components" },
  { href: "/admin/about", icon: User, label: "About" },
  { href: "/admin/messages", icon: Mail, label: "Messages" },
  { href: "/admin/media", icon: Image, label: "Media" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAdminAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: "#080808", color: "#e5e5e5" }}>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col lg:static lg:flex lg:z-auto
          ${sidebarOpen ? "flex" : "hidden lg:flex"}`}
        style={{
          background: "rgba(10,10,10,0.98)",
          borderRight: "1px solid rgba(0,255,157,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(0,255,157,0.08)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] mb-0.5" style={{ color: "#00FF9D" }}>Admin</p>
              <h1 className="font-heading text-xl tracking-widest uppercase">Panel</h1>
            </div>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(({ href, icon: Icon, label }) => {
            const active = location === href;
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}>
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer"
                  style={{
                    background: active ? "rgba(0,255,157,0.08)" : "transparent",
                    color: active ? "#00FF9D" : "#888",
                  }}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium tracking-wide">{label}</span>
                  {active && <ChevronRight size={12} className="ml-auto" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(0,255,157,0.08)" }}>
          <p className="text-xs text-gray-500 mb-3 truncate px-1">{user?.email}</p>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
          style={{ background: "rgba(8,8,8,0.9)", borderBottom: "1px solid rgba(0,255,157,0.06)", backdropFilter: "blur(12px)" }}
        >
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF9D" }} />
            <span className="text-xs text-gray-500 uppercase tracking-wider">Live</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
