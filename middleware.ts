import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Run on admin + auth routes only; everything else stays static/fast.
  matcher: ["/admin/:path*", "/auth/:path*"],
}
