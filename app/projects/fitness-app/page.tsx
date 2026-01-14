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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-border bg-transparent">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
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
                Track Your <span className="text-primary text-glow">Fitness</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A comprehensive fitness tracking app focused on usability, performance, and clean UI. Built with modern React Native technologies.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2024 - Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>~15 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Solo Project</span>
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

            {/* App Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8 glow-cyan">
                <div className="aspect-[9/16] bg-secondary/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">App Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">The Goal</h3>
              <p className="text-muted-foreground">
                Create a fitness app that doesn't overwhelm users with features while still providing comprehensive tracking capabilities.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">The Approach</h3>
              <p className="text-muted-foreground">
                User-centered design with iterative development. Started with core features and expanded based on user feedback.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">The Stack</h3>
              <p className="text-muted-foreground">
                React Native with Expo for rapid development, TypeScript for type safety, and modern state management solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Key Features"}</p>
            <h2 className="text-3xl font-bold text-foreground">What Makes It Special</h2>
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

      {/* Challenges Section */}
      <section className="py-16 px-6 bg-card/50">
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

      {/* Timeline Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Project Timeline"}</p>
            <h2 className="text-3xl font-bold text-foreground">Development Journey</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="flex items-center gap-6 pl-4">
                  <div className={`w-3 h-3 rounded-full z-10 ${
                    phase.status === "completed" ? "bg-green-500" :
                    phase.status === "active" ? "bg-primary animate-pulse" :
                    "bg-muted"
                  }`} />
                  <div className="flex-1 flex items-center justify-between bg-card border border-border rounded-xl p-4">
                    <span className="font-medium text-foreground">{phase.phase}</span>
                    <Badge variant={phase.status === "active" ? "default" : "secondary"}>
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
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Interested in Working Together?</h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new projects and opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/#contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-border bg-transparent">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
