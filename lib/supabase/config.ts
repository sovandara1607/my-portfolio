// Centralised check for whether Supabase is configured.
// When the env vars are missing (e.g. before provisioning), the whole
// wallpapers feature gracefully falls back to the static seed data and the
// admin area is effectively disabled, so the site still builds and runs.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
