import { ReactNode } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Redirect } from "wouter";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00FF9D", borderTopColor: "transparent" }} />
          <p className="text-xs uppercase tracking-widest text-gray-600">Authenticating…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Redirect to="/admin/login" />;

  return <>{children}</>;
}
