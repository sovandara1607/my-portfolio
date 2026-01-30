"use client"

import { useLanguage } from "@/lib/language-context"

const toolItems = {
  Adobe: [
    { name: "Adobe Photoshop", proficiency: 70 },
    { name: "Adobe Illustrator", proficiency: 75 },
    { name: "Adobe Lightroom", proficiency: 65 },
    { name: "Adobe Premiere Pro", proficiency: 70 },
    { name: "Adobe After Effects", proficiency: 80 },
  ],
  VectorizeDesign: [
    { name: "Figma", proficiency: 85 },
    { name: "Prototyping", proficiency: 65 },
    { name: "Design Systems", proficiency: 80 },
    { name: "Collaboration", proficiency: 95 },
    { name: "Plugins", proficiency: 75 },
    { name: "Canva", proficiency: 80 },
  ],
  VideoEditing: [
    { name: "Adobe Premiere Pro", proficiency: 70 },
    { name: "Adobe After Effects", proficiency: 80 },
    { name: "Final Cut Pro", proficiency: 60 },
    { name: "DaVinci Resolve", proficiency: 80 },
    { name: "iMovie", proficiency: 90 },

  ],
}

export function ToolsStackSection() {
  const { t } = useLanguage()

  const techCategories = [
    { title: t("tool.adobe"), items: toolItems.Adobe },
    { title: t("tool.vectorizeDesign"), items: toolItems.VectorizeDesign },
    { title: t("tool.videoEditing"), items: toolItems.VideoEditing },
  ]

  return (
    <section id="tool" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-4">{t("tool.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("tool.title")}</h2>
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
