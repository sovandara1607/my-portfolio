"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X, Search, Languages } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useMusic } from "@/lib/music-context"
import { motion, AnimatePresence } from "framer-motion"

function NavLink({ href, label, index, isActive, onClick }: { href: string; label: string; index: string; isActive: boolean; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
      className={`
        relative px-3 py-2 text-[13px] tracking-wide transition-colors duration-300
        font-[family-name:var(--font-space-grotesk)]
        ${isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
        }
      `}
    >
      <span className="flex items-baseline gap-1.5">
        <span className="text-[10px] text-primary/70 font-mono tabular-nums">{index}</span>
        <span className="relative">
          {label}
          {isActive && (
            <motion.span
              layoutId="activeNav"
              className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </span>
      </span>
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
        block px-4 py-3 text-base font-medium border-l-2 transition-all duration-200
        font-[family-name:var(--font-space-grotesk)]
        ${isActive
          ? "text-foreground border-primary bg-primary/5"
          : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
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
  const [mounted, setMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { isPlaying } = useMusic()

  const navLinks = [
    { href: "#skills", label: language === "kh" ? "បច្ចេកវិទ្យា" : "Skills", keywords: ["skills", "tech", "stack", "បច្ចេកវិទ្យា"] },
    { href: "#projects", label: t("nav.projects"), keywords: ["projects", "apps", "គម្រោង"] },
    { href: "#experiences", label: language === "kh" ? "បទពិសោធន៍" : "Experiences", keywords: ["experiences", "photography", "videography", "design", "បទពិសោធន៍"] },
    { href: "#contact", label: t("nav.contact"), keywords: ["contact", "email", "message", "ទំនាក់ទំនង"] },
  ]

  const allSections = [
    { href: "#", label: language === "kh" ? "ទំព័រដើម" : "Home", keywords: ["home", "top", "ដើម"] },
    ...navLinks,
  ]

  const filteredSections = searchQuery.trim() 
    ? allSections.filter(section => 
        section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.keywords.some(k => k.includes(searchQuery.toLowerCase()))
      )
    : []

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "kh" : "en")
  }

  useEffect(() => {
    setMounted(true)
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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  const handleSearch = (href: string) => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setIsMobileMenuOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-5 left-5 right-5 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`max-w-6xl mx-auto border border-border/60 bg-background/75 backdrop-blur-2xl transition-all duration-500 ${
            isScrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : ""
          }`}
        >
          <div className="px-5 md:px-7 py-3 flex items-center justify-between">
            {/* Logo with Profile Picture and Sound Wave */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                <div className="relative w-8 h-8 overflow-hidden border border-border group-hover:border-primary/40 transition-colors duration-300">
                  <Image
                    src="/profile.PNG"
                    alt="Sovandara Rith"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-[11px] font-mono text-primary/70 tracking-widest">SR—01</span>
                  <span className="text-xs font-semibold tracking-wide text-foreground font-[family-name:var(--font-space-grotesk)]">Sovandara Rith</span>
                </div>
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
            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={String(i + 1).padStart(2, "0")}
                  isActive={activeSection === link.href}
                  onClick={() => setActiveSection(link.href)}
                />
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-none text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-none text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  <div className="relative w-4 h-4">
                    <Sun 
                      className={`absolute inset-0 w-4 h-4 transition-all duration-500 ease-in-out ${
                        resolvedTheme === "dark" 
                          ? "opacity-0 rotate-90 scale-0" 
                          : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                    <Moon 
                      className={`absolute inset-0 w-4 h-4 transition-all duration-500 ease-in-out ${
                        resolvedTheme === "dark" 
                          ? "opacity-100 rotate-0 scale-100" 
                          : "opacity-0 -rotate-90 scale-0"
                      }`}
                    />
                  </div>
                </Button>
              )}

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="w-9 h-9 rounded-none text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
                aria-label="Toggle language"
              >
                <span className="text-xs font-semibold">
                  {language === "en" ? "KH" : "EN"}
                </span>
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
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
                  className="w-full mt-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium tracking-wider uppercase text-xs font-[family-name:var(--font-space-grotesk)] transition-all duration-200"
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

      {/* Search Modal */}
      <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => {
              setIsSearchOpen(false)
              setSearchQuery("")
            }}
          />
          
          <div className="relative max-w-xl mx-auto mt-24 px-4">
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-card overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={t("nav.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-base"
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-muted-foreground bg-muted border border-border rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="max-h-64 overflow-y-auto">
                  {filteredSections.length > 0 ? (
                    <div className="py-2">
                      {filteredSections.map((section) => (
                        <button
                          key={section.href}
                          onClick={() => handleSearch(section.href)}
                          className="w-full px-5 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors duration-200 flex items-center gap-3"
                        >
                          <span className="text-primary/50">#</span>
                          <span>{section.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-5 py-8 text-center text-muted-foreground">
                      {t("nav.noResults")} &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links */}
              {!searchQuery.trim() && (
                <div className="py-2">
                  <p className="px-5 py-2 text-xs text-muted-foreground uppercase tracking-wider font-medium font-[family-name:var(--font-space-grotesk)]">Quick Navigation</p>
                  {allSections.slice(0, 5).map((section) => (
                    <button
                      key={section.href}
                      onClick={() => handleSearch(section.href)}
                      className="w-full px-5 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors duration-200 flex items-center gap-3"
                    >
                      <span className="text-primary/50">#</span>
                      <span>{section.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <p className="text-center text-muted-foreground text-sm mt-4">
              Press <kbd className="px-1.5 py-0.5 text-xs text-muted-foreground bg-muted border border-border rounded-md">⌘K</kbd> to open search anytime
            </p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
