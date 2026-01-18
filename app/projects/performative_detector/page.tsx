"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Hand, Music, Camera, Eye, Sparkles, Settings, CheckCircle2, Play, Volume2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const techStack = [
  { name: "Python", category: "Language" },
  { name: "MediaPipe", category: "ML Framework" },
  { name: "OpenCV", category: "Computer Vision" },
  { name: "Spotify API", category: "Integration" },
  { name: "Spotipy", category: "Library" },
  { name: "NumPy", category: "Computing" },
]

const features = [
  "Real-time camera input processing",
  "Hand gesture detection using MediaPipe",
  "Spotify integration for music playback",
  "Live video display with text overlays",
  "Two-hand and single-hand detection modes",
  "Customizable playlists and tracks",
]

const challenges = [
  {
    title: "Hand Detection Accuracy",
    problem: "Distinguishing between casual hand movements and intentional cup-holding gestures",
    solution: "Implemented multi-point finger curl detection and two-hand proximity checking for reliable grip recognition",
    icon: Hand,
  },
  {
    title: "Spotify Integration",
    problem: "Handling authentication flow and managing playback across different devices",
    solution: "Built OAuth flow with token caching, added AppleScript fallback for non-Premium accounts on macOS",
    icon: Music,
  },
  {
    title: "Real-time Performance",
    problem: "Processing video frames fast enough while running ML models",
    solution: "Optimized frame processing with adaptive confidence thresholds and efficient NumPy operations",
    icon: Camera,
  },
]

const howItWorks = [
  { step: "1", title: "Camera Capture", description: "Captures real-time video from your webcam" },
  { step: "2", title: "Hand Detection", description: "MediaPipe identifies hand landmarks in each frame" },
  { step: "3", title: "Grip Analysis", description: "Analyzes finger positions to detect holding gesture" },
  { step: "4", title: "Trigger Action", description: "Plays music and displays 'PERFORMATIVE' overlay" },
]

export default function PerformativeDetectorCaseStudy() {
  const [isHolding, setIsHolding] = useState(false)
  const [demoFrame, setDemoFrame] = useState(0)

  // Animate demo preview
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoFrame((prev) => (prev + 1) % 100)
      if (demoFrame > 30 && demoFrame < 70) {
        setIsHolding(true)
      } else {
        setIsHolding(false)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [demoFrame])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="https://github.com/sovandara1607/performative_detector" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent">
                <Github className="h-4 w-4 mr-2" />
                View Code
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Performative <span className="text-primary text-glow">Detector</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A fun Python project that uses MediaPipe and computer vision to detect when you&apos;re holding a matcha (or any cup) and plays your favorite songs on Spotify while displaying &quot;PERFORMATIVE&quot; on screen.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>~2 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Personal Project</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="bg-secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Interactive Demo Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden glow-cyan">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-muted-foreground">performative_detector.py — Camera Feed</span>
                </div>
                
                {/* Simulated Camera View */}
                <div className="aspect-video bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 relative overflow-hidden">
                  {/* Grid overlay for camera effect */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  
                  {/* Hand landmarks visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`relative transition-all duration-500 ${isHolding ? 'scale-110' : 'scale-100'}`}>
                      {/* Simulated hand skeleton */}
                      <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80">
                        {/* Palm */}
                        <circle cx="100" cy="120" r="8" className={`${isHolding ? 'fill-primary' : 'fill-muted-foreground'} transition-colors`} />
                        {/* Fingers */}
                        {[
                          { path: "M100,120 L85,80 L80,50", tip: { x: 80, y: 50 } },
                          { path: "M100,120 L95,70 L92,35", tip: { x: 92, y: 35 } },
                          { path: "M100,120 L105,65 L108,30", tip: { x: 108, y: 30 } },
                          { path: "M100,120 L115,75 L125,50", tip: { x: 125, y: 50 } },
                          { path: "M100,120 L125,100 L145,90", tip: { x: 145, y: 90 } },
                        ].map((finger, i) => (
                          <g key={i}>
                            <path
                              d={finger.path}
                              fill="none"
                              strokeWidth="3"
                              className={`${isHolding ? 'stroke-primary' : 'stroke-muted-foreground'} transition-colors`}
                            />
                            <circle
                              cx={finger.tip.x}
                              cy={finger.tip.y}
                              r="5"
                              className={`${isHolding ? 'fill-primary' : 'fill-muted-foreground'} transition-colors`}
                            />
                          </g>
                        ))}
                        {/* Cup indicator */}
                        {isHolding && (
                          <g className="animate-pulse">
                            <ellipse cx="100" cy="90" rx="25" ry="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                            <rect x="80" y="90" width="40" height="50" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                  
                  {/* Status overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                      <div className={`w-2 h-2 rounded-full ${isHolding ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                      <span className="text-xs text-white font-mono">
                        {isHolding ? 'DETECTED' : 'SCANNING...'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                      <Camera className="h-3 w-3 text-white" />
                      <span className="text-xs text-white font-mono">30 FPS</span>
                    </div>
                  </div>
                  
                  {/* Main status text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`text-center transition-all duration-300 ${isHolding ? 'scale-105' : 'scale-100'}`}>
                      <p className={`text-3xl font-bold tracking-wider ${isHolding ? 'text-pink-400' : 'text-muted-foreground/60'}`}>
                        {isHolding ? '✨ PERFORMATIVE ✨' : 'not performative'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Music indicator when holding */}
                  {isHolding && (
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 backdrop-blur-sm animate-pulse">
                      <Play className="h-4 w-4 text-green-400 fill-green-400" />
                      <span className="text-xs text-green-400 font-medium">Playing on Spotify</span>
                      <Volume2 className="h-4 w-4 text-green-400" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Demo note */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                ↑ Interactive demo simulation — actual app uses your webcam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// How It Works"}</p>
            <h2 className="text-3xl font-bold text-foreground">Detection Pipeline</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}
                <div className="bg-card border border-border rounded-xl p-4 text-center glow-cyan-hover transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Capabilities"}</p>
            <h2 className="text-3xl font-bold text-foreground">Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-3xl font-bold text-foreground">Hand Detection Logic</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-muted-foreground">performative_detector.py</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-foreground">{`def is_holding_with_one_hand(self, hand_landmarks) -> bool:
    """
    Detect if a single hand is in a holding/gripping position
    by checking if fingers are curled (bent)
    """
    # Get fingertip and PIP (middle joint) landmarks
    finger_tips = [
        self.mp_hands.HandLandmark.INDEX_FINGER_TIP,
        self.mp_hands.HandLandmark.MIDDLE_FINGER_TIP,
        self.mp_hands.HandLandmark.RING_FINGER_TIP,
        self.mp_hands.HandLandmark.PINKY_TIP,
    ]
    
    finger_pips = [
        self.mp_hands.HandLandmark.INDEX_FINGER_PIP,
        self.mp_hands.HandLandmark.MIDDLE_FINGER_PIP,
        self.mp_hands.HandLandmark.RING_FINGER_PIP,
        self.mp_hands.HandLandmark.PINKY_PIP,
    ]
    
    curled_fingers = 0
    for tip, pip in zip(finger_tips, finger_pips):
        tip_y = hand_landmarks.landmark[tip].y
        pip_y = hand_landmarks.landmark[pip].y
        
        # If fingertip is below PIP, finger is curled
        if tip_y > pip_y:
            curled_fingers += 1
    
    # Holding detected if 3+ fingers are curled
    return curled_fingers >= 3`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Technical Deep Dive"}</p>
            <h2 className="text-3xl font-bold text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-400">Problem</p>
                        <p className="text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-400">Solution</p>
                        <p className="text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotify Integration */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Integration"}</p>
            <h2 className="text-3xl font-bold text-foreground">Spotify Features</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Playlist Support</h3>
              <p className="text-muted-foreground text-sm">Configure your favorite playlist or individual tracks to play when holding is detected.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Shuffle Mode</h3>
              <p className="text-muted-foreground text-sm">Enable shuffle to randomize playback from your configured playlist or track list.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Free Account Fallback</h3>
              <p className="text-muted-foreground text-sm">AppleScript fallback for non-Premium accounts, controlling Spotify desktop directly on macOS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Want to Try It?</h2>
          <p className="text-muted-foreground mb-8">
            Clone the repo and detect your own performative moments! ✨🍵
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://github.com/sovandara1607/performative_detector" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="outline" className="border-border bg-transparent">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
