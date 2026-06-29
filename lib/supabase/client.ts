"use client"

import { createBrowserClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config"

// Browser-side Supabase client. Returns null when Supabase isn't configured
// so callers can fall back to static data instead of crashing.
export function createClient() {
  if (!isSupabaseConfigured) return null
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
}
