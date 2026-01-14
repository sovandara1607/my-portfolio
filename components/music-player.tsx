"use client"

import { useState } from "react"
import { Volume2, VolumeX, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusic } from "@/lib/music-context"

export function MusicPlayer() {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const { isPlaying, volume, togglePlay, setVolume, toggleMute } = useMusic()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <>
      {/* Floating Music Control */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Volume Slider - shows on hover */}
        <div 
          className={`flex items-center gap-2 bg-zinc-800/95 backdrop-blur-xl border border-white/15 rounded-full px-3 py-2 transition-all duration-300 ${
            showVolumeSlider ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:bg-green-500
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-125"
          />
        </div>

        {/* Sound Wave Bars - visible when playing */}
        {isPlaying && (
          <div className="flex items-end gap-[3px] h-8 px-3 py-2 bg-zinc-800/95 backdrop-blur-xl border border-white/15 rounded-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-[3px] bg-green-500 rounded-full sound-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          size="icon"
          className={`relative w-14 h-14 rounded-full transition-all duration-300 shadow-lg ${
            isPlaying 
              ? "bg-green-500 hover:bg-green-400 hover:scale-105 text-black" 
              : "bg-zinc-800/95 hover:bg-zinc-700 hover:scale-105 text-white border border-white/15"
          }`}
        >
          {/* Pulsing ring when playing */}
          {isPlaying && (
            <span className="absolute inset-[-3px] rounded-full border-2 border-green-400/60 animate-pulse" />
          )}
          
          <div className="relative z-10">
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </div>
        </Button>
      </div>
    </>
  )
}
