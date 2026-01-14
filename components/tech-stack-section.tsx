"use client"

import { useLanguage } from "@/lib/language-context"

const techItems = {
  languages: [
    { name: "C++", proficiency: 75 },
    { name: "Python", proficiency: 85 },
    { name: "PHP", proficiency: 60 },
    { name: "JavaScript", proficiency: 90 },
    { name: "TypeScript", proficiency: 88 },
    { name: "Dart", proficiency: 70 },
  ],
  frameworks: [
    { name: "Expo", proficiency: 85 },
    { name: "Flutter", proficiency: 75 },
    { name: "Docker", proficiency: 65 },
    { name: "Git", proficiency: 90 },
    { name: "MySQL", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 75 },
  ],
  other: [
    { name: "Convex", proficiency: 70 },
    { name: "ESP32", proficiency: 80 },
    { name: "REST APIs", proficiency: 90 },
    { name: "DigitalOcean", proficiency: 65 },
  ],
}

export function TechStackSection() {
  const { t } = useLanguage()

  const techCategories = [
    { title: t("tech.languages"), items: techItems.languages },
    { title: t("tech.frameworks"), items: techItems.frameworks },
    { title: t("tech.other"), items: techItems.other },
  ]

  return (
    <section id="tech" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("tech.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("tech.title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-base font-semibold text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group relative bg-card border border-border rounded-lg p-3 text-center text-sm text-foreground glow-cyan-hover transition-all duration-300 hover:border-primary/50 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-primary transition-colors">{item.name}</span>
                    
                    {/* Progress bar on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50">
                      <div 
                        className="h-full bg-primary/60 transition-all duration-500 ease-out origin-left md:scale-x-0 md:group-hover:scale-x-100"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                    
                    {/* Proficiency percentage - always visible on mobile, hover on desktop */}
                    <span className="absolute top-1 right-1 text-[10px] text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {item.proficiency}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
