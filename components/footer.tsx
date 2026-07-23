"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Lock } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/sovandara1607",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sovandararith-b55abb3a5",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:rithsovandara83@gmail.com",
    icon: Mail,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Sovandara Rith
          </p>

          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#experiences" className="hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <Link href="/now" className="hover:text-foreground transition-colors">
              Now
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
            <Link
              href="/admin/wallpapers"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Admin"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
