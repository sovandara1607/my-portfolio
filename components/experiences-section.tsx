"use client"

import { Briefcase, Camera, Video, Palette, Code, MoreHorizontal } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Experience {
  category: string
  icon: React.ReactNode
  items: {
    title: string
    subtitle: string
    period: string
    description: string
  }[]
}

export function ExperiencesSection() {
  const { language } = useLanguage()

  const experiences: Experience[] = [
    {
      category: language === "kh" ? "ការងារ" : "Work",
      icon: <Briefcase className="w-4 h-4" />,
      items: [
        {
          title: "Your Role Title",
          subtitle: "Company / Organization",
          period: "2024 - Present",
          description: "Describe your responsibilities and achievements here.",
        },
      ],
    },
    {
      category: language === "kh" ? "កូដ" : "Development",
      icon: <Code className="w-4 h-4" />,
      items: [
        {
          title: "Your Dev Role",
          subtitle: "Project / Company",
          period: "2024 - Present",
          description: "Describe your development work here.",
        },
      ],
    },
    {
      category: language === "kh" ? "ថតរូប" : "Photography",
      icon: <Camera className="w-4 h-4" />,
      items: [
        {
          title: "Your Photography Role",
          subtitle: "Studio / Freelance",
          period: "2024 - Present",
          description: "Describe your photography experience here.",
        },
      ],
    },
    {
      category: language === "kh" ? "វីដេអូ" : "Videography",
      icon: <Video className="w-4 h-4" />,
      items: [
        {
          title: "Your Videography Role",
          subtitle: "Studio / Freelance",
          period: "2024 - Present",
          description: "Describe your videography experience here.",
        },
      ],
    },
    {
      category: language === "kh" ? "ការរចនា" : "Design",
      icon: <Palette className="w-4 h-4" />,
      items: [
        {
          title: "Your Design Role",
          subtitle: "Agency / Freelance",
          period: "2024 - Present",
          description: "Describe your design experience here.",
        },
      ],
    },
    {
      category: language === "kh" ? "ផ្សេងៗ" : "More",
      icon: <MoreHorizontal className="w-4 h-4" />,
      items: [
        {
          title: "Other Experience",
          subtitle: "Organization",
          period: "2024 - Present",
          description: "Describe other experiences here.",
        },
      ],
    },
  ]

  return (
    <section id="experiences" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-white/40 text-sm tracking-wider uppercase mb-2">
            {language === "kh" ? "// បទពិសោធន៍" : "// Experiences"}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {language === "kh" ? "អ្វីដែលខ្ញុំបានធ្វើ" : "What I've Done"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="group relative">
              <div className="relative glass-card overflow-hidden transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/10">
                  <span className="text-white/50">{exp.icon}</span>
                  <span className="text-sm font-medium text-foreground">{exp.category}</span>
                </div>

                {/* Experience Items */}
                <div className="p-4 space-y-4">
                  {exp.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-primary/80">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground/60">{item.period}</p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
