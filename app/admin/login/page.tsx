"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!supabase) {
      setError("Authentication is not configured yet. Add your Supabase env vars first.")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    const redirect = searchParams.get("redirect") || "/admin/wallpapers"
    router.replace(redirect)
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-2">
            Admin Access
          </p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Wallpaper Studio</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-[family-name:var(--font-space-grotesk)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-background/50 border border-border rounded-md text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-[family-name:var(--font-space-grotesk)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 bg-background/50 border border-border rounded-md text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-space-grotesk)] text-xs tracking-wider uppercase"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground/60 mt-6 font-mono">
          Authorized personnel only
        </p>
      </div>
    </main>
  )
}
