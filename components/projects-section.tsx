"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t("projects.fitnessTitle"),
      description: t("projects.fitnessDesc"),
      tech: ["TypeScript", "React Native", "Expo"],
      pinned: true,
      github: "https://github.com/sovandara1607/Track-Your-Fitness",
      demo: "https://track-your-fitness-beta.vercel.app/",
      caseStudy: "/projects/fitness-app",
      filename: "fitness-app.tsx",
      code: [
        { text: "const FitnessApp = () => {", color: "text-primary" },
        { text: "  const features = [", color: "text-foreground" },
        { text: '    "workout-tracking",', color: "text-muted-foreground" },
        { text: '    "progress-analytics",', color: "text-muted-foreground" },
        { text: '    "social-challenges"', color: "text-muted-foreground" },
        { text: "  ];", color: "text-foreground" },
        { text: "", color: "text-foreground" },
        { text: "  return <App features={features} />;", color: "text-foreground" },
        { text: "};", color: "text-primary" },
      ],
    },
    {
      title: "Performative Detector",
      description: "A fun Python project using MediaPipe and computer vision to detect when you're holding a cup and plays music on Spotify.",
      tech: ["Python", "MediaPipe", "OpenCV", "Spotify API"],
      pinned: false,
      github: "https://github.com/sovandara1607/performative_detector",
      demo: "https://youtu.be/dQw4w9WgXcQ",
      caseStudy: "/projects/performative_detector",
      filename: "performative_detector.py",
      code: [
        { text: "def detect_holding(self):", color: "text-primary" },
        { text: "  hands = self.mp_hands.process(frame)", color: "text-foreground" },
        { text: "  if hands.multi_hand_landmarks:", color: "text-foreground" },
        { text: "    is_holding = self.check_grip()", color: "text-foreground" },
        { text: "    if is_holding:", color: "text-foreground" },
        { text: '      self.display("PERFORMATIVE")', color: "text-muted-foreground" },
        { text: "      self.spotify.play()", color: "text-foreground" },
        { text: "  return is_holding", color: "text-foreground" },
      ],
    },
  ]

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{t("projects.label")}</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground font-pixel">{t("projects.title")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-primary/6 blur-xl opacity-50 group-hover:opacity-100 group-hover:bg-primary/12 transition-all duration-500" />
              
              <div className="relative bg-gradient-to-b from-card to-card/95 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[4px_4px_0_rgba(93,155,53,0.3),0_0_20px_rgba(128,255,32,0.12)]">
                {/* Terminal Header - Minecraft style */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-secondary/55 to-secondary/35 border-b-3 border-b-[rgba(0,0,0,0.2)]">
                  <div className="w-3 h-3 bg-[#D93A3A] border border-[#A82C2C]" />
                  <div className="w-3 h-3 bg-[#FCDB00] border border-[#C4A800]" />
                  <div className="w-3 h-3 bg-[#5D9B35] border border-[#4A7D2A]" />
                  <span className="ml-4 text-xs text-muted-foreground">{project.filename}</span>
                  {project.pinned && (
                    <span className="ml-auto text-[10px] text-[#80FF20] drop-shadow-[0_0_4px_rgba(128,255,32,0.5)]">{t("projects.pinned")}</span>
                  )}
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm glass-subtle">
                  {project.code.map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-6">
                      <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                        {String(lineIndex + 1).padStart(2, "0")}
                      </span>
                      <span className={line.color}>{line.text}</span>
                    </div>
                  ))}
                  <div className="mt-1">
                    <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                      {String(project.code.length + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-block w-2 h-4 bg-[#80FF20] terminal-cursor" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 space-y-4 border-t-3 border-t-[rgba(0,0,0,0.2)]">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-[#80FF20] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs text-muted-foreground bg-gradient-to-b from-secondary/70 to-secondary/50 px-2 py-1 border-2 border-t-[rgba(255,255,255,0.08)] border-l-[rgba(255,255,255,0.08)] border-b-[rgba(0,0,0,0.2)] border-r-[rgba(0,0,0,0.2)]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary bg-transparent h-8 text-xs"
                      >
                        {t("projects.code")}
                      </Button>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs">
                        {t("projects.demo")}
                      </Button>
                    </a>
                    <Link href={project.caseStudy}>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 h-8 text-xs">
                        {t("projects.caseStudy")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Me a Coffee */}
        <div className="mt-12 bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.35)] glow-mc text-center max-w-md mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="text-3xl">☕</div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {t("contact.buyMeCoffee")}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {t("contact.buyMeCoffeeDesc")}
              </p>
            </div>
            <a
              href="https://link.payway.com.kh/cg4094277"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold">
                <span>☕</span>
                {t("contact.buyMeCoffeeButton")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
