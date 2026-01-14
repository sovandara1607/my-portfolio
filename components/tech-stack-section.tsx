const techCategories = [
  {
    title: "Languages",
    items: ["C++", "Python", "PHP", "JavaScript", "TypeScript", "Dart"],
  },
  {
    title: "Frameworks & Tools",
    items: ["Expo", "Flutter", "Docker", "Git", "MySQL", "PostgreSQL"],
  },
  {
    title: "Other",
    items: ["Convex", "ESP32", "REST APIs", "DigitalOcean"],
  },
]

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{"// Tech Stack"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Technologies I Work With</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-card border border-border rounded-lg p-3 text-center text-sm text-foreground glow-cyan-hover transition-all duration-300 hover:border-primary/50"
                  >
                    {item}
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
