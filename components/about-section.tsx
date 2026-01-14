import { Code, Layers, Lightbulb, Target } from "lucide-react"

const interests = [
  { icon: Layers, label: "Scalable Backend Systems" },
  { icon: Lightbulb, label: "Product Thinking & UX" },
  { icon: Code, label: "System Design" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{"// About Me"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who I Am</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card border border-border rounded-xl p-8 glow-cyan-hover transition-all duration-300">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Passionate about building real-world, user-focused applications. I have experience across full-stack web,
              mobile apps, and IoT development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My focus is on clean UI, solid backend architecture, and maintainability. I believe in writing code that
              not only works but is elegant and scalable.
            </p>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Career Goal</span>
              </div>
              <p className="mt-2 text-foreground">Software Engineer / Product Engineer</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interests</h3>
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg glow-cyan-hover transition-all duration-300"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <interest.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
