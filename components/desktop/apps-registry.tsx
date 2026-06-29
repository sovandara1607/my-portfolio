"use client"

import dynamic from "next/dynamic"
import { ComponentType } from "react"
import { Compass, User, Network, MapPin, TerminalSquare, Mail, LucideIcon } from "lucide-react"
import { FinderApp } from "./apps/finder-app"
import { AboutApp } from "./apps/about-app"
import { ContactApp } from "./apps/contact-app"
import { TerminalApp } from "./apps/terminal-app"

function AppLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  )
}

// Heavy canvas/map apps are code-split and client-only
const GraphApp = dynamic(() => import("./apps/graph-app").then(m => m.GraphApp), {
  ssr: false,
  loading: AppLoading,
})
const MapApp = dynamic(() => import("./apps/map-app").then(m => m.MapApp), {
  ssr: false,
  loading: AppLoading,
})

export interface AppMeta {
  id: string
  name: string
  Icon: LucideIcon
  tile: string
  size: { w: number; h: number }
  Component: ComponentType
}

export const APPS: AppMeta[] = [
  {
    id: "finder",
    name: "Finder",
    Icon: Compass,
    tile: "from-sky-400 to-blue-500",
    size: { w: 680, h: 460 },
    Component: FinderApp,
  },
  {
    id: "about",
    name: "About Me",
    Icon: User,
    tile: "from-primary to-orange-400",
    size: { w: 460, h: 560 },
    Component: AboutApp,
  },
  {
    id: "graph",
    name: "Skills Graph",
    Icon: Network,
    tile: "from-secondary to-emerald-500",
    size: { w: 860, h: 600 },
    Component: GraphApp,
  },
  {
    id: "map",
    name: "Travel Map",
    Icon: MapPin,
    tile: "from-cyan-500 to-sky-600",
    size: { w: 880, h: 600 },
    Component: MapApp,
  },
  {
    id: "terminal",
    name: "Terminal",
    Icon: TerminalSquare,
    tile: "from-neutral-700 to-neutral-900",
    size: { w: 680, h: 440 },
    Component: TerminalApp,
  },
  {
    id: "contact",
    name: "Contact",
    Icon: Mail,
    tile: "from-orange-400 to-primary",
    size: { w: 420, h: 480 },
    Component: ContactApp,
  },
]

export const APP_MAP: Record<string, AppMeta> = Object.fromEntries(APPS.map(a => [a.id, a]))
