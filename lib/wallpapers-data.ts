import { buildResolutions, cldPreview, cldThumbnail } from "./cloudinary-url"

export type WallpaperCategory = "abstract" | "typography"

export interface WallpaperResolutionOption {
  label: string
  dimensions: string
  // Either a static path (seed data) or a Cloudinary delivery URL (uploads).
  downloadPath: string
}

export interface Wallpaper {
  id: string
  slug: string
  title: string
  description: string
  category: WallpaperCategory
  tags: string[]
  resolutions: WallpaperResolutionOption[]
  imagePath: string
  gradient: string
  accentColor: string
  year: number
  // Present for uploaded (Cloudinary-backed) wallpapers. When set, components
  // render the real image; otherwise they fall back to the gradient.
  imageUrl?: string
  thumbnailUrl?: string
}

// Shape of a row in the Supabase `wallpapers` table.
export interface WallpaperRow {
  id: string
  slug: string
  title: string
  description: string
  category: WallpaperCategory
  tags: string[]
  year: number
  accent_color: string
  image_public_id: string
  image_url: string
  width: number | null
  height: number | null
  created_at: string
}

// Maps a Supabase row to the shared Wallpaper shape used across the UI.
export function rowToWallpaper(row: WallpaperRow): Wallpaper {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    tags: row.tags ?? [],
    year: row.year,
    accentColor: row.accent_color,
    gradient: `linear-gradient(135deg, ${row.accent_color}22 0%, ${row.accent_color}55 100%)`,
    imagePath: row.image_url,
    imageUrl: cldPreview(row.image_public_id),
    thumbnailUrl: cldThumbnail(row.image_public_id),
    resolutions: buildResolutions(row.image_public_id, row.width, row.height).map((r) => ({
      label: r.label,
      dimensions: r.dimensions,
      downloadPath: r.downloadUrl,
    })),
  }
}

export const wallpapers: Wallpaper[] = [
  {
    id: "01",
    slug: "auroral-gradient",
    title: "Auroral Gradient",
    description:
      "A warm sweep of amber and cream — designed to evoke the last light before dusk. Minimal, atmospheric, and unmistakably warm.",
    category: "abstract",
    tags: ["gradient", "warm", "minimal"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/auroral-gradient-4k.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/auroral-gradient-5k.jpg" },
    ],
    imagePath: "/wallpapers/assets/auroral-gradient.jpg",
    gradient: "linear-gradient(135deg, #fdf1e0 0%, #f38020 55%, #c45a00 100%)",
    accentColor: "#f38020",
    year: 2024,
  },
  {
    id: "02",
    slug: "obsidian-depth",
    title: "Obsidian Depth",
    description:
      "Deep charcoal layers that breathe without shouting. A quiet, confident dark desktop built for focused, distraction-free work.",
    category: "abstract",
    tags: ["dark", "minimal", "charcoal"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/obsidian-depth-4k.jpg" },
      { label: "Ultrawide", dimensions: "3440×1440", downloadPath: "/wallpapers/assets/obsidian-depth-ultrawide.jpg" },
    ],
    imagePath: "/wallpapers/assets/obsidian-depth.jpg",
    gradient: "linear-gradient(160deg, #141414 0%, #1e1a17 45%, #2a2420 100%)",
    accentColor: "#2a2420",
    year: 2024,
  },
  {
    id: "03",
    slug: "warm-sandstone",
    title: "Warm Sandstone",
    description:
      "Inspired by the textures of eroded stone and sun-bleached earth. Neutral warmth that disappears behind your work.",
    category: "abstract",
    tags: ["warm", "neutral", "texture"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/warm-sandstone-4k.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/warm-sandstone-5k.jpg" },
    ],
    imagePath: "/wallpapers/assets/warm-sandstone.jpg",
    gradient: "linear-gradient(120deg, #f5efe6 0%, #dcc4a0 50%, #c2a47e 100%)",
    accentColor: "#c2a47e",
    year: 2024,
  },
  {
    id: "04",
    slug: "void-horizon",
    title: "Void Horizon",
    description:
      "Where light dissolves into nothing. A gradient built from the edge of visibility — composed for dual-monitor setups and ultrawide displays.",
    category: "abstract",
    tags: ["dark", "deep", "horizon"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/void-horizon-4k.jpg" },
      { label: "Ultrawide", dimensions: "3440×1440", downloadPath: "/wallpapers/assets/void-horizon-ultrawide.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/void-horizon-5k.jpg" },
    ],
    imagePath: "/wallpapers/assets/void-horizon.jpg",
    gradient: "linear-gradient(180deg, #0a0a0a 0%, #12100e 35%, #1e1510 100%)",
    accentColor: "#1e1510",
    year: 2025,
  },
  {
    id: "05",
    slug: "type-study-i",
    title: "Type Study I",
    description:
      "A typographic composition exploring the geometry of letterforms at scale. Clean, editorial, and precise — built for designers who think in type.",
    category: "typography",
    tags: ["type", "editorial", "minimal"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/type-study-i-4k.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/type-study-i-5k.jpg" },
    ],
    imagePath: "/wallpapers/assets/type-study-i.jpg",
    gradient: "linear-gradient(135deg, #f9f5ef 0%, #f0e8de 60%, #e8dcce 100%)",
    accentColor: "#313131",
    year: 2024,
  },
  {
    id: "06",
    slug: "manifesto",
    title: "Manifesto",
    description:
      "A wall of words reduced to pure form — black on paper, intention made visible. Designed for readers, writers, and makers.",
    category: "typography",
    tags: ["type", "graphic", "bold"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/manifesto-4k.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/manifesto-5k.jpg" },
    ],
    imagePath: "/wallpapers/assets/manifesto.jpg",
    gradient: "linear-gradient(160deg, #ffffff 0%, #f8f5f0 40%, #f0ebe5 100%)",
    accentColor: "#313131",
    year: 2025,
  },
  {
    id: "07",
    slug: "editorial-grid",
    title: "Editorial Grid",
    description:
      "Structure made beautiful. A typographic grid system lifted from print design and translated into a desktop-scale composition.",
    category: "typography",
    tags: ["grid", "structure", "editorial"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/editorial-grid-4k.jpg" },
      { label: "Ultrawide", dimensions: "3440×1440", downloadPath: "/wallpapers/assets/editorial-grid-ultrawide.jpg" },
    ],
    imagePath: "/wallpapers/assets/editorial-grid.jpg",
    gradient: "linear-gradient(135deg, #ede8e1 0%, #ddd5c5 55%, #cdc0ac 100%)",
    accentColor: "#cdc0ac",
    year: 2025,
  },
  {
    id: "08",
    slug: "logotype",
    title: "Logotype",
    description:
      "When a single letter becomes a landscape. A study in negative space, typographic weight, and the beauty of restraint.",
    category: "typography",
    tags: ["type", "letterform", "minimal"],
    resolutions: [
      { label: "4K", dimensions: "3840×2160", downloadPath: "/wallpapers/assets/logotype-4k.jpg" },
      { label: "5K", dimensions: "5120×2880", downloadPath: "/wallpapers/assets/logotype-5k.jpg" },
      { label: "Desktop", dimensions: "2560×1440", downloadPath: "/wallpapers/assets/logotype-desktop.jpg" },
    ],
    imagePath: "/wallpapers/assets/logotype.jpg",
    gradient: "linear-gradient(120deg, #f8f3ed 0%, #ede4d8 50%, #e2d5c4 100%)",
    accentColor: "#e2d5c4",
    year: 2024,
  },
]

export function getWallpaperBySlug(slug: string): Wallpaper | undefined {
  return wallpapers.find((w) => w.slug === slug)
}

export function getRelatedWallpapers(
  currentSlug: string,
  category: WallpaperCategory,
  limit = 3
): Wallpaper[] {
  return wallpapers.filter((w) => w.slug !== currentSlug && w.category === category).slice(0, limit)
}
