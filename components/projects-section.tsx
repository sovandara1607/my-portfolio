"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"

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
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          kicker={t("projects.label").replace(/^\/\/\s*/, "")}
          title={t("projects.title")}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="relative glass-card overflow-hidden transition-all duration-300">
                {/* Terminal Header - Minecraft style */}
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febd2f]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-4 text-xs text-muted-foreground">{project.filename}</span>
                  {project.pinned && (
                    <span className="ml-auto text-[10px] text-muted-foreground">{t("projects.pinned")}</span>
                  )}
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm">
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
                    <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 space-y-4 border-t border-border">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border font-[family-name:var(--font-space-grotesk)]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground hover:bg-primary/5 bg-transparent h-8 text-xs rounded-full"
                      >
                        {t("projects.code")}
                      </Button>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs rounded-full">
                        {t("projects.demo")}
                      </Button>
                    </a>
                    <Link href={project.caseStudy}>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-primary/5 h-8 text-xs rounded-full">
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
        <div className="mt-12 glass-card p-6 text-center max-w-md mx-auto">
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold">
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
