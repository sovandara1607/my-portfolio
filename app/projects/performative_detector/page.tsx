"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Hand, Music, Camera, Eye, Sparkles, Settings, CheckCircle2, Play, Volume2, VideoOff, Video } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"

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

// Hand landmark indices for finger detection
const FINGER_TIPS = [8, 12, 16, 20] // Index, Middle, Ring, Pinky tips
const FINGER_PIPS = [6, 10, 14, 18] // Index, Middle, Ring, Pinky PIPs (middle joints)

// Check if fingers are curled (holding gesture)
function isHoldingGesture(landmarks: { x: number; y: number; z: number }[]): boolean {
  let curledFingers = 0
  
  for (let i = 0; i < FINGER_TIPS.length; i++) {
    const tipY = landmarks[FINGER_TIPS[i]].y
    const pipY = landmarks[FINGER_PIPS[i]].y
    
    // If fingertip is below PIP (larger y value), finger is curled
    if (tipY > pipY) {
      curledFingers++
    }
  }
  
  // Holding detected if 3+ fingers are curled
  return curledFingers >= 3
}

export default function PerformativeDetectorCaseStudy() {
  const [isHolding, setIsHolding] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [handsDetected, setHandsDetected] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const handsRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)
  const cameraRef = useRef<any>(null)

  // Stop camera
  const stopCamera = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    if (cameraRef.current) {
      try {
        cameraRef.current.stop()
      } catch (e) {
        // Ignore
      }
      cameraRef.current = null
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setCameraActive(false)
    setIsHolding(false)
    setHandsDetected(0)
  }, [])

  // Start camera
  const startCamera = useCallback(async () => {
    setIsLoading(true)
    setCameraError(null)
    
    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported in this browser")
      }
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      })
      
      if (!videoRef.current) {
        stream.getTracks().forEach(track => track.stop())
        throw new Error("Video element not ready")
      }
      
      // Set up video element
      const video = videoRef.current
      video.srcObject = stream
      streamRef.current = stream
      
      // Wait for video to be playable
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Video load timeout"))
        }, 10000)
        
        const onCanPlay = () => {
          clearTimeout(timeout)
          video.removeEventListener('canplay', onCanPlay)
          resolve()
        }
        
        video.addEventListener('canplay', onCanPlay)
        
        if (video.readyState >= 3) {
          clearTimeout(timeout)
          video.removeEventListener('canplay', onCanPlay)
          resolve()
        }
      })
      
      await video.play()
      
      // Dynamically import MediaPipe
      const { Hands } = await import("@mediapipe/hands")
      const { Camera } = await import("@mediapipe/camera_utils")
      
      // Initialize MediaPipe Hands
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
        },
      })
      
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })
      
      hands.onResults((results: any) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        
        if (!canvas || !ctx || !videoRef.current) return
        
        // Set canvas size to match video
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw hand landmarks
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setHandsDetected(results.multiHandLandmarks.length)
          
          let anyHandHolding = false
          
          for (const landmarks of results.multiHandLandmarks) {
            if (isHoldingGesture(landmarks)) {
              anyHandHolding = true
            }
            
            // Draw landmarks
            ctx.fillStyle = anyHandHolding ? "#22d3ee" : "#8b5cf6"
            ctx.strokeStyle = anyHandHolding ? "#22d3ee" : "#8b5cf6"
            ctx.lineWidth = 2
            
            // Draw connections
            const connections = [
              [0, 1], [1, 2], [2, 3], [3, 4],
              [0, 5], [5, 6], [6, 7], [7, 8],
              [0, 9], [9, 10], [10, 11], [11, 12],
              [0, 13], [13, 14], [14, 15], [15, 16],
              [0, 17], [17, 18], [18, 19], [19, 20],
              [5, 9], [9, 13], [13, 17],
            ]
            
            for (const [start, end] of connections) {
              const startPt = landmarks[start]
              const endPt = landmarks[end]
              ctx.beginPath()
              ctx.moveTo(startPt.x * canvas.width, startPt.y * canvas.height)
              ctx.lineTo(endPt.x * canvas.width, endPt.y * canvas.height)
              ctx.stroke()
            }
            
            for (const landmark of landmarks) {
              ctx.beginPath()
              ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 4, 0, 2 * Math.PI)
              ctx.fill()
            }
          }
          
          setIsHolding(anyHandHolding)
        } else {
          setHandsDetected(0)
          setIsHolding(false)
        }
      })
      
      handsRef.current = hands
      
      // Use MediaPipe Camera for frame processing
      const camera = new Camera(video, {
        onFrame: async () => {
          if (handsRef.current) {
            await handsRef.current.send({ image: video })
          }
        },
        width: 640,
        height: 480,
      })
      
      cameraRef.current = camera
      await camera.start()
      
      setCameraActive(true)
    } catch (error: any) {
      console.error("Camera error:", error)
      let errorMessage = error.message || "Failed to access camera"
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        errorMessage = "Camera permission denied. Please allow camera access."
      } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
        errorMessage = "No camera found."
      } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
        errorMessage = "Camera is in use by another app."
      }
      setCameraError(errorMessage)
      stopCamera()
    } finally {
      setIsLoading(false)
    }
  }, [stopCamera])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/sovandara1607/performative_detector" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">View Code</span>
                <span className="sm:hidden">Code</span>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Performative <span className="text-primary text-glow">Detector</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
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
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-primary/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
              <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden glow-cyan">
                {/* Terminal Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground truncate">performative_detector.py — Live</span>
                </div>
                
                {/* Camera View */}
                <div className="aspect-video bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 relative overflow-hidden">
                  {/* Video element (hidden, used for processing) */}
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
                    playsInline
                    muted
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  
                  {/* Canvas for hand landmarks overlay */}
                  <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  
                  {/* Placeholder when camera is off */}
                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      {/* Grid overlay for camera effect */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="w-full h-full" style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }} />
                      </div>
                      
                      {isLoading ? (
                        <div className="flex flex-col items-center gap-4 relative z-20">
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          <p className="text-muted-foreground text-sm">Initializing camera & AI model...</p>
                        </div>
                      ) : cameraError ? (
                        <div className="flex flex-col items-center gap-4 text-center px-4 relative z-20">
                          <VideoOff className="w-16 h-16 text-red-400" />
                          <p className="text-red-400 text-sm">{cameraError}</p>
                          <Button onClick={startCamera} variant="outline" size="sm">
                            Try Again
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4 relative z-20">
                          <Camera className="w-16 h-16 text-muted-foreground/50" />
                          <p className="text-muted-foreground text-sm text-center px-4">
                            Click below to start live hand detection
                          </p>
                          <Button onClick={startCamera} className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                            <Video className="w-4 h-4 mr-2" />
                            Start Camera
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Status overlay */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex items-center justify-between gap-2 pointer-events-none z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${cameraActive ? (isHolding ? 'bg-green-500' : 'bg-yellow-500') : 'bg-red-500'} animate-pulse`} />
                      <span className="text-[10px] sm:text-xs text-white font-mono">
                        {!cameraActive ? 'OFF' : isHolding ? 'DETECTED' : handsDetected > 0 ? 'TRACKING' : 'SCAN'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {cameraActive && (
                        <div className="hidden sm:flex items-center gap-2 bg-black/60 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                          <Hand className="h-3 w-3 text-white" />
                          <span className="text-xs text-white font-mono">{handsDetected}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 sm:gap-2 bg-black/60 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm">
                        <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        <span className="text-[10px] sm:text-xs text-white font-mono">{cameraActive ? 'LIVE' : 'OFF'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main status text */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 pointer-events-none">
                    <div className={`text-center transition-all duration-300 ${isHolding ? 'scale-105' : 'scale-100'}`}>
                      <p className={`text-xl sm:text-3xl font-bold tracking-wider ${isHolding ? 'text-pink-400' : 'text-muted-foreground/60'}`}>
                        {isHolding ? '✨ PERFORMATIVE ✨' : 'not performative'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Music indicator when holding */}
                  {isHolding && (
                    <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm animate-pulse pointer-events-none">
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 fill-green-400" />
                      <span className="text-[10px] sm:text-xs text-green-400 font-medium">Detected!</span>
                      <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    </div>
                  )}
                  
                  {/* Camera control button when active */}
                  {cameraActive && (
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30">
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        size="sm"
                        className="bg-black/60 border-white/20 text-white hover:bg-black/70 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-9 cursor-pointer"
                      >
                        <VideoOff className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Stop
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Demo note */}
              <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
                ↑ Live demo — make a holding/gripping gesture with your hand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// How It Works"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Detection Pipeline</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}
                <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center glow-cyan-hover transition-all duration-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Capabilities"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Features</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-lg sm:rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Hand Detection Logic</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-xl sm:rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground">performative_detector.py</span>
              </div>
              <pre className="p-3 sm:p-6 text-[11px] sm:text-sm overflow-x-auto">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Technical Deep Dive"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Integration"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Spotify Features</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Music className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Playlist Support</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Configure your favorite playlist or individual tracks to play when holding is detected.</p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Shuffle Mode</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Enable shuffle to randomize playback from your configured playlist or track list.</p>
            </div>
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">Free Account Fallback</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">AppleScript fallback for non-Premium accounts, controlling Spotify desktop directly on macOS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Want to Try It?</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Clone the repo and detect your own performative moments! ✨🍵
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
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
          
          {/* Buy Me a Coffee */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Enjoyed this project? Consider supporting my work ☕</p>
              <a
                href="https://link.payway.com.kh/cg4094277"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 cursor-pointer"
              >
                <span>☕</span>
                Buy Me a Coffee
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
