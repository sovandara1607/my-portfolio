"use client"

import Image from "next/image"
import { profile } from "@/lib/profile"
import { MapPin, GraduationCap, Globe } from "lucide-react"

export function AboutApp() {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      {/* Banner */}
      <div className="relative h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20">
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-background shadow-lg relative">
            <Image src="/profile.PNG" alt={profile.name} fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="px-6 pt-12 pb-6">
        <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
        <p className="text-sm text-primary font-[family-name:var(--font-space-grotesk)]">{profile.title}</p>

        <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Dangkao, Phnom Penh, Cambodia</span>
          <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {profile.education[0].school}</span>
          <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {profile.languages.join(" · ")}</span>
        </div>

        <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{profile.bio}</p>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-2">Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map(i => (
              <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-muted text-foreground/75 border border-border">{i}</span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: "Projects", value: profile.academicProjects.length + profile.personalProjects.length },
            { label: "Skills", value: Object.values(profile.skills).flat().length },
            { label: "Years coding", value: "3+" },
          ].map(s => (
            <div key={s.label} className="glass-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-[family-name:var(--font-space-grotesk)]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
