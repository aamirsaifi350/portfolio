import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing — admin features will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder"
);

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
