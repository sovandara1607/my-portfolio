import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary-server"

// Issues a short-lived signature so the browser can upload a file directly to
// Cloudinary (presigned-upload pattern). The large file never passes through
// our server — only this tiny signed payload does. Auth-gated to admins.
export async function POST() {
  if (!isCloudinaryConfigured) {
    return NextResponse.json({ error: "Cloudinary not configured" }, { status: 503 })
  }

  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const folder = "wallpapers"

  // The signed params must exactly match what the browser sends to Cloudinary.
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET as string
  )

  return NextResponse.json({
    timestamp,
    signature,
    folder,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  })
}
