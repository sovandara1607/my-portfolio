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
          className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-500 ease-in-out bg-black/90 backdrop-blur-xl border-white/10 ${
            isScrolled ? "shadow-lg shadow-black/20" : ""
          } ${isMobileMenuOpen ? "rounded-2xl" : "rounded-full"}`}
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

          {/* Mobile Menu Dropdown - Inside the navbar */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-white/10 px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-base font-medium ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {/* CTA Button */}
              <Button 
                className="w-full mt-3 py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all duration-300"
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
      </nav>
    </>
  )
}
