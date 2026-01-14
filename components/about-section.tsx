const interests = [
  "Scalable Backend Systems",
  "Product Thinking & UX",
  "System Design",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{"// About Me"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who I Am</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 glow-cyan-hover transition-all duration-300">
            <div className="glass-subtle rounded-lg p-4 -m-4 mb-4">
              <p className="text-muted-foreground leading-relaxed">
                Passionate about building real-world, user-focused applications. I have experience across full-stack web,
                mobile apps, and IoT development.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              My focus is on clean UI, solid backend architecture, and maintainability. I believe in writing code that
              not only works but is elegant and scalable.
            </p>
            <div className="pt-4 border-t border-border">
              <span className="text-sm text-primary font-medium">Career Goal</span>
              <p className="mt-2 text-foreground">Software Engineer / Product Engineer</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Interests</h3>
            {interests.map((interest, index) => (
              <div
                key={index}
                className="p-4 bg-card border border-border rounded-lg glow-cyan-hover transition-all duration-300"
              >
                <span className="text-foreground">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
