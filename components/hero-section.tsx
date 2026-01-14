"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { CodePreview } from "./code-preview"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-primary text-sm tracking-wider">{"// Welcome to my portfolio"}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Hi, I'm <span className="text-primary text-glow">Sovandara Rith</span>
            </h1>
          </div>

          <div className="space-y-2">
            <p className="text-xl text-muted-foreground">Year 3 Computer Science Student · Web & Mobile Developer</p>
            <p className="text-muted-foreground">Aspiring Software Engineer & Product Engineer</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary hover:text-secondary-foreground bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <CodePreview />
        </div>
      </div>
    </section>
  )
}
