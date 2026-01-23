"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Zap, Target, Lightbulb, Code2, Smartphone, Server, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const techStack = [
  { name: "TypeScript", category: "Language" },
  { name: "React Native", category: "Framework" },
  { name: "Expo", category: "Platform" },
  { name: "Redux Toolkit", category: "State" },
  { name: "React Query", category: "Data" },
  { name: "Tailwind CSS", category: "Styling" },
]

const features = [
  "Real-time workout tracking with GPS",
  "Customizable workout plans",
  "Progress analytics dashboard",
  "Social features & challenges",
  "Apple Health & Google Fit sync",
  "Offline-first architecture",
]

const challenges = [
  {
    title: "Battery Optimization",
    problem: "GPS tracking was draining battery quickly during long workouts",
    solution: "Implemented adaptive location polling based on activity type and optimized background tasks",
    icon: Zap,
  },
  {
    title: "Real-time Sync",
    problem: "Keeping workout data synchronized across devices without data loss",
    solution: "Built a conflict resolution system with optimistic updates and queue-based syncing",
    icon: Server,
  },
  {
    title: "Smooth Animations",
    problem: "Complex chart animations were causing frame drops on older devices",
    solution: "Used Reanimated 2 with worklets and optimized render cycles with useMemo",
    icon: Smartphone,
  },
]

const timeline = [
  { phase: "Research & Planning", duration: "2 weeks", status: "completed" },
  { phase: "UI/UX Design", duration: "3 weeks", status: "completed" },
  { phase: "Core Development", duration: "8 weeks", status: "completed" },
  { phase: "Testing & QA", duration: "2 weeks", status: "completed" },
  { phase: "Launch & Iteration", duration: "Ongoing", status: "active" },
]

export default function FitnessAppCaseStudy() {
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
            <Button variant="outline" size="sm" className="border-border bg-transparent text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">View Code</span>
              <span className="sm:hidden">Code</span>
            </Button>
            <a href="https://track-your-fitness-beta.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
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
                Track Your <span className="text-primary text-glow">Fitness</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                A comprehensive fitness tracking app focused on usability, performance, and clean UI. Built with modern React Native technologies.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span>2025 - Present</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span>~15 weeks</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span>Solo Project</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="bg-secondary text-xs sm:text-sm">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* App Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <div className="relative">
                {/* Desktop: iPhone frame with embedded iframe */}
                <div className="hidden md:block">
                  <div className="relative max-w-[400px] mx-auto">
                    {/* Outer titanium frame */}
                    <div className="relative rounded-[3.5rem] p-[14px] shadow-2xl bg-gradient-to-b from-[#4a4a4a] via-[#2d2d2d] to-[#1a1a1a] border-2 border-[#5a5a5a]">
                      {/* Side buttons - Silent switch */}
                      <div className="absolute -left-[5px] top-[100px] w-[5px] h-8 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Volume up */}
                      <div className="absolute -left-[5px] top-[145px] w-[5px] h-12 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Volume down */}
                      <div className="absolute -left-[5px] top-[210px] w-[5px] h-12 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                      {/* Power button */}
                      <div className="absolute -right-[5px] top-[165px] w-[5px] h-16 bg-gradient-to-l from-[#3a3a3a] to-[#5a5a5a] rounded-r-sm shadow-md" />
                      
                      {/* Inner screen area */}
                      <div className="relative bg-black rounded-[2.8rem] overflow-hidden ring-1 ring-black/50">
                        {/* Dynamic Island */}
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[120px] h-[36px] bg-black rounded-full z-20 shadow-inner" />
                        
                        {/* Screen content - iframe */}
                        <div className="aspect-[9/19.5] bg-secondary/50 overflow-hidden">
                          <iframe
                            src="https://track-your-fitness-beta.vercel.app/"
                            className="w-full h-full border-0"
                            title="Track Your Fitness App Preview"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Home indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-white/40 rounded-full z-20" />
                      </div>
                    </div>
                    
                    {/* Reflection highlight on frame */}
                    <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>
                </div>
                
                {/* Mobile: Interactive preview card with iPhone frame */}
                <div className="md:hidden">
                  <a 
                    href="https://track-your-fitness-beta.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* iPhone Frame */}
                    <div className="relative max-w-[280px] mx-auto">
                      {/* Outer titanium frame */}
                      <div className="relative rounded-[3rem] p-[12px] shadow-2xl bg-gradient-to-b from-[#4a4a4a] via-[#2d2d2d] to-[#1a1a1a] border-2 border-[#5a5a5a]">
                        {/* Side buttons - Silent switch */}
                        <div className="absolute -left-[4px] top-[80px] w-[4px] h-6 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Volume up */}
                        <div className="absolute -left-[4px] top-[115px] w-[4px] h-10 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Volume down */}
                        <div className="absolute -left-[4px] top-[165px] w-[4px] h-10 bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] rounded-l-sm shadow-md" />
                        {/* Power button */}
                        <div className="absolute -right-[4px] top-[130px] w-[4px] h-14 bg-gradient-to-l from-[#3a3a3a] to-[#5a5a5a] rounded-r-sm shadow-md" />
                        
                        {/* Inner screen area */}
                        <div className="relative bg-black rounded-[2.3rem] overflow-hidden ring-1 ring-black/50">
                          {/* Dynamic Island */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-20 shadow-inner" />
                          
                          {/* Screen content */}
                          <div className="aspect-[9/19.5] bg-gradient-to-b from-secondary to-secondary/60 flex flex-col items-center justify-center p-6 active:opacity-90 transition-opacity">
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                              <Smartphone className="h-8 w-8 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold text-foreground mb-2 text-center">Track Your Fitness</h4>
                            <p className="text-sm text-muted-foreground text-center mb-6">Tap to open the live app preview</p>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg">
                              <ExternalLink className="h-4 w-4" />
                              Open App
                            </Button>
                          </div>
                          
                          {/* Home indicator */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/40 rounded-full" />
                        </div>
                      </div>
                      
                      {/* Reflection highlight on frame */}
                      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Goal</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create a fitness app that doesn't overwhelm users with features while still providing comprehensive tracking capabilities.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Approach</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                User-centered design with iterative development. Started with core features and expanded based on user feedback.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">The Stack</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                React Native with Expo for rapid development, TypeScript for type safety, and modern state management solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-xs sm:text-sm tracking-wider mb-2">{"// Key Features"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">What Makes It Special</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-xs sm:text-sm tracking-wider mb-2">{"// Technical Deep Dive"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 sm:p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-red-400">Problem</p>
                        <p className="text-sm sm:text-base text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-green-400">Solution</p>
                        <p className="text-sm sm:text-base text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className="text-primary text-xs sm:text-sm tracking-wider mb-2">{"// Project Timeline"}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Development Journey</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4 sm:space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-6 pl-4">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full z-10 ${
                    phase.status === "completed" ? "bg-green-500" :
                    phase.status === "active" ? "bg-primary animate-pulse" :
                    "bg-muted"
                  }`} />
                  <div className="flex-1 flex items-center justify-between gap-2 bg-card border border-border rounded-xl p-3 sm:p-4">
                    <span className="font-medium text-sm sm:text-base text-foreground">{phase.phase}</span>
                    <Badge variant={phase.status === "active" ? "default" : "secondary"} className="text-xs sm:text-sm whitespace-nowrap">
                      {phase.duration}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Interested in Working Together?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            I'm always open to discussing new projects and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/#contact">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto border-border bg-transparent">
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
