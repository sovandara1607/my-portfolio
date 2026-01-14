"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"

interface MusicContextType {
  isPlaying: boolean
  volume: number
  togglePlay: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  volume: 0.3,
  togglePlay: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  audioRef: { current: null },
})

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [previousVolume, setPreviousVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check if user had music playing before
    const savedVolume = localStorage.getItem("music-volume")
    const savedPlaying = localStorage.getItem("music-playing")
    
    if (savedVolume) {
      setVolumeState(parseFloat(savedVolume))
    }
    if (savedPlaying === "true") {
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    localStorage.setItem("music-volume", volume.toString())
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
    localStorage.setItem("music-playing", isPlaying.toString())
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume)
      setVolumeState(0)
    } else {
      setVolumeState(previousVolume)
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, volume, togglePlay, setVolume, toggleMute, audioRef }}>
      {/* Audio element managed by context */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
