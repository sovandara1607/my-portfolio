"use client"

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react"

export interface OpenWindow {
  appId: string
  z: number
  minimized: boolean
  /** initial top-left position */
  x: number
  y: number
  w: number
  h: number
}

interface DesktopValue {
  windows: OpenWindow[]
  activeId: string | null
  openApp: (appId: string, size?: { w: number; h: number }) => void
  closeWindow: (appId: string) => void
  focusWindow: (appId: string) => void
  minimizeWindow: (appId: string) => void
  toggleApp: (appId: string, size?: { w: number; h: number }) => void
  isOpen: (appId: string) => boolean
}

const DesktopContext = createContext<DesktopValue | null>(null)

export function useDesktop() {
  const ctx = useContext(DesktopContext)
  if (!ctx) throw new Error("useDesktop must be used inside <DesktopProvider>")
  return ctx
}

let zCounter = 10

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const cascade = useRef(0)

  const focusWindow = useCallback((appId: string) => {
    zCounter += 1
    setWindows(prev =>
      prev.map(w => (w.appId === appId ? { ...w, z: zCounter, minimized: false } : w))
    )
    setActiveId(appId)
  }, [])

  const openApp = useCallback((appId: string, size?: { w: number; h: number }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId)
      zCounter += 1
      if (existing) {
        return prev.map(w => (w.appId === appId ? { ...w, z: zCounter, minimized: false } : w))
      }
      const w = size?.w ?? 720
      const h = size?.h ?? 480
      // center-ish with a small cascade offset
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280
      const vh = typeof window !== "undefined" ? window.innerHeight : 800
      const offset = (cascade.current % 5) * 28
      cascade.current += 1
      const x = Math.max(24, (vw - w) / 2 - 60 + offset)
      const y = Math.max(44, (vh - h) / 2 - 40 + offset)
      return [...prev, { appId, z: zCounter, minimized: false, x, y, w, h }]
    })
    setActiveId(appId)
  }, [])

  const toggleApp = useCallback((appId: string, size?: { w: number; h: number }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId)
      if (existing && !existing.minimized && activeId === appId) {
        // already focused → minimize
        return prev.map(w => (w.appId === appId ? { ...w, minimized: true } : w))
      }
      zCounter += 1
      if (existing) {
        return prev.map(w => (w.appId === appId ? { ...w, z: zCounter, minimized: false } : w))
      }
      const w = size?.w ?? 720
      const h = size?.h ?? 480
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280
      const vh = typeof window !== "undefined" ? window.innerHeight : 800
      const offset = (cascade.current % 5) * 28
      cascade.current += 1
      const x = Math.max(24, (vw - w) / 2 - 60 + offset)
      const y = Math.max(44, (vh - h) / 2 - 40 + offset)
      return [...prev, { appId, z: zCounter, minimized: false, x, y, w, h }]
    })
    setActiveId(appId)
  }, [activeId])

  const closeWindow = useCallback((appId: string) => {
    setWindows(prev => prev.filter(w => w.appId !== appId))
    setActiveId(prev => (prev === appId ? null : prev))
  }, [])

  const minimizeWindow = useCallback((appId: string) => {
    setWindows(prev => prev.map(w => (w.appId === appId ? { ...w, minimized: true } : w)))
    setActiveId(prev => (prev === appId ? null : prev))
  }, [])

  const isOpen = useCallback(
    (appId: string) => windows.some(w => w.appId === appId),
    [windows]
  )

  return (
    <DesktopContext.Provider
      value={{ windows, activeId, openApp, closeWindow, focusWindow, minimizeWindow, toggleApp, isOpen }}
    >
      {children}
    </DesktopContext.Provider>
  )
}
