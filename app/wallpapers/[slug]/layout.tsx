import type { Metadata } from "next"
import { getWallpaperBySlug } from "@/lib/wallpapers"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const wallpaper = await getWallpaperBySlug(slug)

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found | Sovandara Rith",
    }
  }

  return {
    title: `${wallpaper.title} — Wallpapers | Sovandara Rith`,
    description: wallpaper.description,
    openGraph: {
      title: `${wallpaper.title} — Wallpapers`,
      description: wallpaper.description,
      images: wallpaper.imageUrl ? [{ url: wallpaper.imageUrl }] : undefined,
    },
  }
}

export default function WallpaperLayout({ children }: { children: React.ReactNode }) {
  return children
}
