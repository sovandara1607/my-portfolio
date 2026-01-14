"use client"

import { Button } from "@/components/ui/button"
import { CodePreview } from "./code-preview"
import { ResumeDownload } from "./resume-download"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-2">
            <p className="text-primary text-sm tracking-wider">{"// Welcome to my portfolio"}</p>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Hi, I'm <span className="text-primary text-glow">Sovandara Rith</span>
            </h1>
          </div>

          <div className="space-y-2">
            <p className="text-lg lg:text-xl text-muted-foreground">Year 3 Computer Science Student · Web & Mobile Developer</p>
            <p className="text-muted-foreground">Aspiring Software Engineer & Product Engineer</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
              View Projects →
            </Button>
            <ResumeDownload />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <CodePreview />
        </div>
      </div>
    </section>
  )
}
