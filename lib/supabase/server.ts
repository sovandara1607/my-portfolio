import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config"

// Server-side Supabase client (App Router). Reads/writes the auth cookies so
// server components, route handlers and middleware share the same session.
// Returns null when Supabase isn't configured.
export async function createClient() {
  if (!isSupabaseConfigured) return null

  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from a Server Component — safe to ignore, the session is
          // refreshed in middleware instead.
        }
      },
    },
  })
}
