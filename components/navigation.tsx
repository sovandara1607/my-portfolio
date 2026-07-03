"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Search, MonitorPlay } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useMusic } from "@/lib/music-context"
import { motion, AnimatePresence } from "framer-motion"

function NavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
      className={`
        relative px-3.5 py-1.5 text-[13px] rounded-full transition-colors duration-300
        ${isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute inset-0 rounded-full bg-muted"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative">{label}</span>
    </a>
  )
}

function MobileNavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
      className={`
        block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200
        ${isActive
          ? "text-foreground bg-muted"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }
      `}
    >
      {label}
    </a>
  )
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { t } = useLanguage()
  const { isPlaying } = useMusic()

  const navLinks = [
    { href: "#experiences", label: "Experience", keywords: ["experiences", "work", "education", "photography", "videography", "design"] },
    { href: "#projects", label: t("nav.projects"), keywords: ["projects", "apps"] },
    { href: "#skills", label: "Skills", keywords: ["skills", "tech", "stack"] },
    { href: "#terminal", label: "Terminal", keywords: ["terminal", "cli", "commands", "interactive"] },
    { href: "#wallpapers", label: "Wallpapers", keywords: ["wallpapers", "art", "design", "download", "backgrounds"] },
    { href: "#contact", label: t("nav.contact"), keywords: ["contact", "email", "message"] },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = navLinks.map(link => link.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
      
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-5 left-5 right-5 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`max-w-4xl mx-auto rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-500 ${
            isScrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.05)]" : ""
          }`}
        >
          <div className="px-4 md:px-5 py-2.5 flex items-center justify-between">
            {/* Logo with Profile Picture and Sound Wave */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2.5 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-border group-hover:ring-foreground/30 transition-all duration-300">
                  <Image
                    src="/profile.PNG"
                    alt="Sovandara Rith"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="hidden sm:block text-sm font-semibold text-foreground">
                  sovandara<span className="text-sky-400">.</span>
                </span>
              </a>
              
              {/* Sound Wave Visualizer */}
              {isPlaying && (
                <div className="hidden sm:flex items-end gap-[2px] h-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-[2px] bg-primary/60 rounded-full sound-wave-mini"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeSection === link.href}
                  onClick={() => setActiveSection(link.href)}
                />
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-1">
              {/* Search — delegates to the global CommandPalette */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.dispatchEvent(new CustomEvent("cmd-palette:open"))}
                className="w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                aria-label="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Desktop Mode — launches the macOS-inspired experience */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.dispatchEvent(new CustomEvent("enter-desktop"))}
                className="w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                aria-label="Enter Desktop Mode"
                title="Desktop Mode"
              >
                <MonitorPlay className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-4 h-4">
                  <Menu 
                    className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X 
                    className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="border-t border-border px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={activeSection === link.href}
                    onClick={() => {
                      setActiveSection(link.href)
                      setIsMobileMenuOpen(false)
                    }}
                  />
                ))}
                
                <Button
                  className="w-full mt-3 rounded-full bg-foreground text-background hover:bg-foreground/85 font-medium text-sm transition-all duration-200"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {t("nav.getInTouch")}
                </Button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.nav>

    </>
  )
}
