"use client"

import { useState } from "react"
import {
  Folder, FileText, Globe2, AppWindow, Star, Clock, Network, MapPin,
  TerminalSquare, User, Mail, ChevronRight, Download, ImageIcon, Code2,
} from "lucide-react"
import { useDesktop } from "@/lib/desktop-context"
import { wallpapers as seedWallpapers } from "@/lib/wallpapers-data"

type Item =
  | { kind: "link"; name: string; href: string; icon: typeof Folder; sub?: string }
  | { kind: "app"; name: string; appId: string; icon: typeof Folder; sub?: string }
  | { kind: "file"; name: string; href: string; download?: boolean; icon: typeof Folder; sub?: string }

const PROJECTS: Item[] = [
  { kind: "link", name: "Tos Lift", href: "/projects/fitness-app", icon: Code2, sub: "React · Web" },
  { kind: "link", name: "MyFinance", href: "/projects/myfinance", icon: Code2, sub: "Swift · iOS" },
  { kind: "link", name: "Hand Detector", href: "/projects/hand-detector", icon: Code2, sub: "MediaPipe" },
  { kind: "link", name: "Resume Builder", href: "/projects/resume-builder", icon: Code2, sub: "Laravel" },
  { kind: "link", name: "TaskFlow", href: "/projects/taskflow", icon: Code2, sub: "Flutter" },
  { kind: "link", name: "MyLMS", href: "https://mylms.paragoniu.app/auth/login", icon: Code2, sub: "Go · Next.js" },
  { kind: "link", name: "RAG AI Search", href: "https://rag-search.sovandara.lol/", icon: Code2, sub: "Streamlit" },
]

const WALLPAPERS: Item[] = seedWallpapers.map(w => ({
  kind: "link" as const,
  name: w.title,
  href: `/wallpapers/${w.slug}`,
  icon: ImageIcon,
  sub: w.category,
}))

const APPS: Item[] = [
  { kind: "app", name: "Skills Graph", appId: "graph", icon: Network, sub: "Visualization" },
  { kind: "app", name: "Travel Map", appId: "map", icon: MapPin, sub: "World map" },
  { kind: "app", name: "Terminal", appId: "terminal", icon: TerminalSquare, sub: "CLI" },
  { kind: "app", name: "About Me", appId: "about", icon: User, sub: "Profile" },
  { kind: "app", name: "Contact", appId: "contact", icon: Mail, sub: "Reach out" },
]

const DOCUMENTS: Item[] = [
  { kind: "file", name: "Sovandara_Rith_CV.docx", href: "/Sovandara_Rith_CV.docx", download: true, icon: FileText, sub: "Résumé" },
]

const FOLDERS = [
  { id: "projects", name: "Projects", icon: Folder, items: PROJECTS },
  { id: "wallpapers", name: "Wallpapers", icon: ImageIcon, items: WALLPAPERS },
  { id: "apps", name: "Applications", icon: AppWindow, items: APPS },
  { id: "documents", name: "Documents", icon: FileText, items: DOCUMENTS },
] as const

export function FinderApp() {
  const [active, setActive] = useState<string>("projects")
  const { openApp } = useDesktop()
  const folder = FOLDERS.find(f => f.id === active)!

  const handle = (item: Item) => {
    if (item.kind === "app") openApp(item.appId, appSize(item.appId))
    else if (item.kind === "link") window.open(item.href, "_blank", "noopener,noreferrer")
    else if (item.kind === "file") {
      const a = document.createElement("a")
      a.href = item.href
      if (item.download) a.download = ""
      a.click()
    }
  }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-44 shrink-0 border-r border-border/60 bg-muted/30 p-2 overflow-y-auto scrollbar-hide">
        <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground/60 font-[family-name:var(--font-space-grotesk)]">Favorites</p>
        {[{ name: "Recents", icon: Clock }, { name: "Favorites", icon: Star }].map(s => (
          <div key={s.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground/70 cursor-default">
            <s.icon className="w-3.5 h-3.5" /> {s.name}
          </div>
        ))}
        <p className="px-2 py-1 mt-2 text-[10px] uppercase tracking-wider text-muted-foreground/60 font-[family-name:var(--font-space-grotesk)]">Locations</p>
        {FOLDERS.map(f => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
              active === f.id ? "bg-primary/15 text-foreground" : "text-foreground/70 hover:bg-foreground/5"
            }`}
          >
            <f.icon className={`w-3.5 h-3.5 ${active === f.id ? "text-primary" : ""}`} /> {f.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-1 px-4 h-9 border-b border-border/60 text-xs text-muted-foreground shrink-0">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Sovandara</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{folder.name}</span>
          <span className="ml-auto">{folder.items.length} items</span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
            {folder.items.map(item => (
              <button
                key={item.name}
                onDoubleClick={() => handle(item)}
                onClick={(e) => { if (e.detail === 0) handle(item) }}
                className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-foreground/5 transition-colors text-center"
                title={`Open ${item.name}`}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-card border border-border flex items-center justify-center group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors relative">
                  <item.icon className="w-6 h-6 text-foreground/60 group-hover:text-primary transition-colors" />
                  {item.kind === "file" && item.download && (
                    <Download className="w-3 h-3 absolute bottom-1 right-1 text-muted-foreground" />
                  )}
                </div>
                <span className="text-[11px] text-foreground/80 leading-tight line-clamp-2 max-w-[88px]">{item.name}</span>
                {item.sub && <span className="text-[9px] text-muted-foreground -mt-1">{item.sub}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function appSize(appId: string) {
  if (appId === "graph") return { w: 860, h: 600 }
  if (appId === "map") return { w: 880, h: 600 }
  if (appId === "terminal") return { w: 680, h: 440 }
  if (appId === "about") return { w: 460, h: 560 }
  if (appId === "contact") return { w: 420, h: 480 }
  return { w: 720, h: 480 }
}
