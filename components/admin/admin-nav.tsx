"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Image, Briefcase, FolderKanban } from "lucide-react"
import { cn } from "@/lib/utils"

const ADMIN_LINKS = [
  { href: "/admin/wallpapers", label: "Wallpapers", icon: Image },
  { href: "/admin/experience-photos", label: "Experience Photos", icon: Briefcase },
  { href: "/admin/project-photos", label: "Project Photos", icon: FolderKanban },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {ADMIN_LINKS.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
