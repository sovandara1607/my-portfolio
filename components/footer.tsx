"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/sovandara",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sovandara",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:contact@sovandara.dev",
    icon: Mail,
  },
]

export function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t-4 border-t-primary/30 bg-gradient-to-b from-card to-background">
      {/* Pixel border top decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 border-2 border-t-primary/60 border-l-primary/60 border-b-primary/120 border-r-primary/120 shadow-[2px_2px_0_rgba(0,0,0,0.25)]" />
              <span className="font-bold text-lg text-foreground">Sovandara</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === "kh" 
                ? "អ្នកអភិវឌ្ឍន៍កម្មវិធីដែលចូលចិត្តបង្កើតបទពិសោធន៍អ្នកប្រើប្រាស់ស្អាតៗ។"
                : "A developer passionate about crafting beautiful user experiences and clean code."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
              {language === "kh" ? "តំណភ្ជាប់រហ័ស" : "Quick Links"}
            </h3>
            <nav className="flex flex-col gap-2">
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {language === "kh" ? "អំពីខ្ញុំ" : "About"}
              </a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {language === "kh" ? "គម្រោង" : "Projects"}
              </a>
              <a href="#tech" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {language === "kh" ? "បច្ចេកវិទ្យា" : "Tech Stack"}
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {language === "kh" ? "ទំនាក់ទំនង" : "Contact"}
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
              {language === "kh" ? "បណ្ដាញសង្គម" : "Connect"}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-b from-secondary to-secondary/80 border-2 border-t-border/30 border-l-border/30 border-b-border/70 border-r-border/70 shadow-[2px_2px_0_rgba(0,0,0,0.2)] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:shadow-[1px_1px_0_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px]"
                  aria-label={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Sovandara Rith. {language === "kh" ? "រក្សាសិទ្ធិគ្រប់យ៉ាង។" : "All rights reserved."}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {language === "kh" ? "បង្កើតដោយ" : "Built with"}
              <Heart className="w-3 h-3 text-destructive fill-destructive animate-pulse" />
              {language === "kh" ? "និង" : "&"}
              <span className="text-primary">Next.js</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom pixels */}
      <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-30" />
    </footer>
  )
}
