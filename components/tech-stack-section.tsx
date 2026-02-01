"use client"

import { useLanguage } from "@/lib/language-context"

const techItems = {
  languages: [
    { name: "C++", proficiency: 75 },
    { name: "Python", proficiency: 75 },
    { name: "PHP", proficiency: 65 },
    { name: "JavaScript", proficiency: 70 },
    { name: "TypeScript", proficiency: 80 },
    { name: "Dart", proficiency: 50 },
  ],
  frameworks: [
    { name: "Expo", proficiency: 85 },
    { name: "Flutter", proficiency: 65 },
    { name: "Docker", proficiency: 80 },
    { name: "Git", proficiency: 90 },
    { name: "MySQL", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 75 },
  ],
  other: [
    { name: "Convex", proficiency: 80 },
    // { name: "ESP32", proficiency: 50 },
    { name: "REST APIs", proficiency: 90 },
    { name: "DigitalOcean", proficiency: 80 },
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
    <section id="tech" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("tech.label")}</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground font-pixel">{t("tech.title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-base font-semibold text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group relative bg-gradient-to-b from-card to-card/90 border-2 border-t-border/30 border-l-border/30 border-b-border/60 border-r-border/60 p-3 text-center text-sm text-foreground transition-all duration-300 hover:border-primary/50 overflow-hidden shadow-[3px_3px_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_rgba(0,0,0,0.15),0_0_15px_rgba(93,155,53,0.1)]"
                  >
                    <span className="relative z-10 group-hover:text-primary transition-colors">{item.name}</span>
                    
                    {/* Minecraft XP bar style progress on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-b from-secondary to-secondary/80 border-t border-border">
                      <div 
                        className="h-full bg-gradient-to-b from-primary via-primary/80 to-primary/60 transition-all duration-500 ease-out origin-left md:scale-x-0 md:group-hover:scale-x-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
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
