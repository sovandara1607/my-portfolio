"use client"

const achievements = [
  {
    title: "Pull Shark",
    description: "Active contributor with multiple merged PRs",
    tier: "gold",
    emoji: "🦈",
  },
  {
    title: "Arctic Code Vault",
    description: "Code preserved in GitHub Arctic Vault",
    tier: "default",
    emoji: "❄️",
  },
  {
    title: "Quickdraw",
    description: "Fast response to issues and discussions",
    tier: "default",
    emoji: "⚡",
  },
  {
    title: "YOLO",
    description: "Merged PRs without review (with confidence!)",
    tier: "default",
    emoji: "🚀",
  },
]

const getTierGlow = (tier: string) => {
  switch (tier) {
    case "gold":
      return "hover:shadow-[0_0_24px_rgba(234,179,8,0.2)]"
    case "silver":
      return "hover:shadow-[0_0_24px_rgba(156,163,175,0.2)]"
    case "bronze":
      return "hover:shadow-[0_0_24px_rgba(217,119,6,0.2)]"
    default:
      return "hover:shadow-[0_0_24px_rgba(56,189,248,0.2)]"
  }
}

export function AchievementsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{"// GitHub Achievements"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recognition & Impact</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`group bg-card border border-border rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 ${getTierGlow(achievement.tier)}`}
            >
              <div className="glass-subtle rounded-lg p-4 -m-2">
                <span className="text-2xl mb-4 block">{achievement.emoji}</span>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
