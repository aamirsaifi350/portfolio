import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !key) {
    console.warn("Supabase credentials not found. Using offline mode — admin will not connect to database.");
    _supabase = createClient(
      "https://placeholder.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTkxNTYzMDQwMH0.placeholder"
    );
    return _supabase;
  }

  _supabase = createClient(url, key, { auth: { persistSession: true } });
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  category: string;
  live_url: string;
  github_url: string;
  featured: boolean;
  thumbnail: string;
  gallery: string[];
  created_at: string;
};

export type Component = {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  html: string;
  css: string;
  js: string;
  react: string;
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type About = {
  id: string;
  name: string;
  title: string;
  bio: string;
  skills: string[];
  profile_image: string;
  updated_at: string;
};

export type Setting = {
  key: string;
  value: string;
};
