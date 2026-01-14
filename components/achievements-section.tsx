import { GitPullRequest, Snowflake, Zap, Rocket } from "lucide-react"

const achievements = [
  {
    icon: GitPullRequest,
    title: "Pull Shark",
    description: "Active contributor with multiple merged PRs",
  },
  {
    icon: Snowflake,
    title: "Arctic Code Vault Contributor",
    description: "Code preserved in GitHub Arctic Vault",
  },
  {
    icon: Zap,
    title: "Quickdraw",
    description: "Fast response to issues and discussions",
  },
  {
    icon: Rocket,
    title: "YOLO",
    description: "Merged PRs without review (with confidence!)",
  },
]

export function AchievementsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{"// GitHub Achievements"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recognition & Impact</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 text-center glow-cyan-hover transition-all duration-300 hover:border-primary/50"
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <achievement.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
