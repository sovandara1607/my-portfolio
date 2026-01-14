"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = useCallback(() => {
    // Trigger flash animation
    setIsFlashing(true)
    
    // Change theme after a small delay for the flash to start
    setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, 150)
    
    // Remove flash after animation completes
    setTimeout(() => {
      setIsFlashing(false)
    }, 600)
  }, [resolvedTheme, setTheme])

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
          className={`max-w-6xl mx-auto rounded-full border transition-all duration-500 ease-in-out bg-black/90 backdrop-blur-xl border-white/10 ${
            isScrolled ? "shadow-lg shadow-black/20" : ""
          }`}
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
              {/* <span className="text-cyan-400 font-bold text-sm hidden sm:block">{"<SR />"}</span> */}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
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
                      isMobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X 
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div
          className={`absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Mobile Logo */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
                <Image
                  src="/profile.PNG"
                  alt="Sovandara Rith"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-white">Sovandara Rith</p>
                <p className="text-xs text-gray-400">Software Developer</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-6 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`block text-2xl font-semibold text-white hover:text-cyan-400 transition-all duration-300 py-3 ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50 + 100}ms` : "0ms" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="px-6 pb-6">
            <Button 
              className="w-full py-6 text-lg rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all duration-300"
              onClick={() => {
                setIsMobileMenuOpen(false)
                window.location.href = "#contact"
              }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
