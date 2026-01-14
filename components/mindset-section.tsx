const principles = [
  "Building scalable and maintainable systems",
  "Real-world applicability over theoretical perfection",
  "Engineering discipline over hype",
  "Balance between UI, backend, and system design",
]

export function MindsetSection() {
  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{"// Engineering Mindset"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How I Approach Engineering</h2>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 glow-cyan">
          <div className="glass-subtle rounded-lg p-4 -m-4">
            <div className="grid md:grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary">→</span>
                  <p className="text-foreground">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
