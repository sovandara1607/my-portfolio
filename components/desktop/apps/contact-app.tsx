"use client"

import { profile } from "@/lib/profile"
import { Mail, Github, Globe, Phone, Send } from "lucide-react"

const LINKS = [
  { icon: Mail, label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { icon: Github, label: "GitHub", value: "github.com/sovandara1607", href: "https://github.com/sovandara1607" },
  { icon: Globe, label: "Website", value: profile.contact.website.replace("https://", ""), href: profile.contact.website },
  { icon: Phone, label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}` },
]

export function ContactApp() {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
          <Send className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Get in touch</h2>
          <p className="text-xs text-muted-foreground">Open to internships & collaborations.</p>
        </div>
      </div>

      <div className="space-y-2">
        {LINKS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/[0.04] transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-[family-name:var(--font-space-grotesk)]">{label}</p>
              <p className="text-sm text-foreground truncate">{value}</p>
            </div>
          </a>
        ))}
      </div>

      <a
        href={`mailto:${profile.contact.email}`}
        className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors font-[family-name:var(--font-space-grotesk)]"
      >
        <Mail className="w-4 h-4" /> Send a message
      </a>
    </div>
  )
}
