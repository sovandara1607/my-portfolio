"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X, Search, Languages } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

// NavLink component with click animation
function NavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Create ripple effect
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { id: Date.now(), x, y }
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }
    
    onClick()
  }

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative px-4 py-2 rounded-full text-sm font-medium overflow-hidden
        transition-all duration-300 ease-out
        ${isActive 
          ? "text-white bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
          : "text-gray-300 hover:text-white hover:bg-white/10"
        }
        ${isPressed ? "scale-95" : "scale-100"}
        active:scale-95
      `}
      style={{
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-cyan-400/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      )}
      
      <span className="relative z-10">{label}</span>
    </a>
  )
}

// Mobile NavLink component
function MobileNavLink({ href, label, isActive, onClick, delay }: { href: string; label: string; isActive: boolean; onClick: () => void; delay: number }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        block px-4 py-3 rounded-xl text-base font-medium
        transition-all duration-200 ease-out
        ${isActive 
          ? "text-cyan-400 bg-cyan-500/10" 
          : "text-gray-300 hover:text-white hover:bg-white/10"
        }
        ${isPressed ? "scale-[0.98] bg-white/15" : "scale-100"}
        active:scale-[0.98]
      `}
    >
      <span className="flex items-center gap-3">
        {isActive && <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />}
        {label}
      </span>
    </a>
  )
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { href: "#about", label: t("nav.about"), keywords: ["about", "me", "bio", "introduction", "who", "អំពី"] },
    { href: "#tech", label: t("nav.tech"), keywords: ["tech", "stack", "skills", "technologies", "programming", "បច្ចេកវិទ្យា"] },
    { href: "#projects", label: t("nav.projects"), keywords: ["projects", "work", "portfolio", "apps", "គម្រោង"] },
    { href: "#contact", label: t("nav.contact"), keywords: ["contact", "email", "message", "ទំនាក់ទំនង"] },
  ]

  const allSections = [
    { href: "#", label: language === "kh" ? "ទំព័រដើម" : "Home", keywords: ["home", "top", "ដើម"] },
    ...navLinks,
    { href: "#github", label: "GitHub Stats", keywords: ["github", "stats", "contributions"] },
    { href: "#achievements", label: language === "kh" ? "សមិទ្ធិផល" : "Achievements", keywords: ["achievements", "awards"] },
    { href: "#resume", label: "Resume", keywords: ["resume", "cv", "download"] },
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
      
      // Track active section based on scroll position
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
      
      // If at top, no active section
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

  // Close search on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
      // Open search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleTheme = useCallback(() => {
    setIsFlashing(true)
    setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, 150)
    setTimeout(() => {
      setIsFlashing(false)
    }, 600)
  }, [resolvedTheme, setTheme])

  const handleSearch = (href: string) => {
    setIsSearchOpen(false)
    setSearchQuery("")
    setIsMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Lightning Flash Overlay for Theme Transition */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none ${
          isFlashing ? "lightning-flash" : "opacity-0"
        }`}
      >
        {/* Main flash */}
        <div 
          className={`absolute inset-0 ${isFlashing ? "animate-lightning" : ""}`}
          style={{
            background: resolvedTheme === "dark" 
              ? "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(200,230,255,0.6) 20%, rgba(100,180,255,0.3) 40%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7) 0%, rgba(20,30,50,0.5) 20%, rgba(10,20,40,0.2) 40%, transparent 70%)"
          }}
        />
        {/* Secondary flash burst */}
        <div 
          className={`absolute inset-0 ${isFlashing ? "animate-flash-burst" : ""}`}
          style={{
            background: resolvedTheme === "dark"
              ? "conic-gradient(from 0deg at 50% 40%, transparent 0deg, rgba(255,255,255,0.4) 30deg, transparent 60deg, rgba(200,240,255,0.3) 120deg, transparent 180deg, rgba(255,255,255,0.2) 240deg, transparent 300deg)"
              : "conic-gradient(from 0deg at 50% 40%, transparent 0deg, rgba(0,0,0,0.3) 30deg, transparent 60deg, rgba(20,30,60,0.2) 120deg, transparent 180deg, rgba(0,0,0,0.15) 240deg, transparent 300deg)"
          }}
        />
      </div>
      
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div
          className="max-w-6xl mx-auto border bg-zinc-800/95 backdrop-blur-xl border-white/15 shadow-lg shadow-black/20 rounded-2xl overflow-hidden"
        >
          <div className="px-4 md:px-6 py-3 flex items-center justify-between">
            {/* Logo with Profile Picture */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors duration-300">
                <Image
                  src="/profile.PNG"
                  alt="Sovandara Rith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
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
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="relative w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={`relative w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white ${
                    isFlashing ? "scale-125 rotate-12" : "scale-100 rotate-0"
                  }`}
                  aria-label="Toggle theme"
                >
                  <div className="relative w-5 h-5">
                    <Sun 
                      className={`absolute inset-0 w-5 h-5 transition-all duration-500 ease-in-out theme-crossfade text-yellow-400 ${
                        resolvedTheme === "dark" 
                          ? "opacity-0 rotate-90 scale-0" 
                          : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                    <Moon 
                      className={`absolute inset-0 w-5 h-5 transition-all duration-500 ease-in-out theme-crossfade text-cyan-400 ${
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
                className="relative w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
                aria-label="Toggle language"
              >
                <span className="text-xs font-bold">
                  {language === "en" ? "KH" : "EN"}
                </span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <Menu 
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X 
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown - Inside the navbar */}
          <div
            className="md:hidden"
            style={{
              display: 'grid',
              gridTemplateRows: isMobileMenuOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows 450ms cubic-bezier(0.33, 1, 0.68, 1)'
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div 
                className="border-t border-white/10 px-4 py-4 space-y-1"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 400ms ease-out, transform 400ms ease-out',
                  transitionDelay: isMobileMenuOpen ? '50ms' : '0ms'
                }}
              >
                {navLinks.map((link, index) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={activeSection === link.href}
                    onClick={() => {
                      setActiveSection(link.href)
                      setIsMobileMenuOpen(false)
                    }}
                    delay={index * 30}
                  />
                ))}
                
                {/* CTA Button */}
                <Button 
                  className="w-full mt-3 py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    window.location.href = "#contact"
                  }}
                >
                  {t("nav.getInTouch")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-zinc-800/70 backdrop-blur-sm"
          onClick={() => {
            setIsSearchOpen(false)
            setSearchQuery("")
          }}
        />
        
        {/* Search Container */}
        <div className="relative max-w-xl mx-auto mt-24 px-4">
          <div
            className={`bg-zinc-800 border border-white/15 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
            }`}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t("nav.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
              />
              <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-gray-500 bg-white/5 rounded border border-white/10">
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
                        className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
                      >
                        <span className="text-cyan-400">#</span>
                        <span>{section.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    {t("nav.noResults")} "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            {/* Quick Links when empty */}
            {!searchQuery.trim() && (
              <div className="py-2">
                <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">Quick Navigation</p>
                {allSections.slice(0, 5).map((section) => (
                  <button
                    key={section.href}
                    onClick={() => handleSearch(section.href)}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
                  >
                    <span className="text-cyan-400">#</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-white/5 rounded border border-white/10">⌘K</kbd> to open search anytime
          </p>
        </div>
      </div>
    </>
  )
}
