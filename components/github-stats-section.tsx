"use client"

import { useEffect, useState } from "react"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  contributions: number
}

const achievements = [
  {
    id: "pull-shark",
    title: "Pull Shark",
    description: "Opened pull requests that have been merged",
    tier: "gold",
    icon: "🦈",
    count: 16,
  },
  {
    id: "arctic-code-vault",
    title: "Arctic Code Vault",
    description: "Contributed code to the 2020 GitHub Archive Program",
    tier: "default",
    icon: "❄️",
    count: null,
  },
  {
    id: "quickdraw",
    title: "Quickdraw",
    description: "Gitty up! You closed an issue or pull request within 5 minutes of opening",
    tier: "default",
    icon: "⚡",
    count: null,
  },
  {
    id: "yolo",
    title: "YOLO",
    description: "Merged a pull request without code review",
    tier: "default",
    icon: "🚀",
    count: null,
  },
  {
    id: "starstruck",
    title: "Starstruck",
    description: "Created a repository that has many stars",
    tier: "bronze",
    icon: "⭐",
    count: 16,
  },
  {
    id: "pair-extraordinaire",
    title: "Pair Extraordinaire",
    description: "Coauthored commits on a merged pull request",
    tier: "bronze",
    icon: "👥",
    count: 2,
  },
]

const getTierStyles = (tier: string) => {
  switch (tier) {
    case "gold":
      return "from-yellow-400/20 to-yellow-600/20 border-yellow-500/50 shadow-yellow-500/20"
    case "silver":
      return "from-gray-300/20 to-gray-500/20 border-gray-400/50 shadow-gray-400/20"
    case "bronze":
      return "from-orange-400/20 to-orange-600/20 border-orange-500/50 shadow-orange-500/20"
    default:
      return "from-primary/10 to-primary/5 border-primary/30 shadow-primary/10"
  }
}

export function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    contributions: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate stats counting up
    const targetStats: GitHubStats = {
      publicRepos: 24,
      followers: 128,
      following: 56,
      contributions: 847,
    }

    setIsVisible(true)
    
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setStats({
        publicRepos: Math.round(targetStats.publicRepos * easeOut),
        followers: Math.round(targetStats.followers * easeOut),
        following: Math.round(targetStats.following * easeOut),
        contributions: Math.round(targetStats.contributions * easeOut),
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(targetStats)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="github" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{"// GitHub Profile"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Stats & Achievements</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Repositories", value: stats.publicRepos, icon: "📦" },
            { label: "Followers", value: stats.followers, icon: "👥" },
            { label: "Following", value: stats.following, icon: "➡️" },
            { label: "Contributions", value: stats.contributions, icon: "🔥" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group bg-card border border-border rounded-xl p-6 text-center glow-cyan-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <div className="text-3xl font-bold text-primary mb-1 tabular-nums">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contribution Graph Placeholder */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contribution Activity</h3>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 52 * 7 }).map((_, i) => {
                const intensity = Math.random()
                let bgClass = "bg-secondary"
                if (intensity > 0.8) bgClass = "bg-primary"
                else if (intensity > 0.6) bgClass = "bg-primary/70"
                else if (intensity > 0.4) bgClass = "bg-primary/40"
                else if (intensity > 0.2) bgClass = "bg-primary/20"
                
                return (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm ${bgClass} transition-all duration-300 hover:scale-150 hover:z-10`}
                    style={{
                      animationDelay: `${i * 2}ms`,
                    }}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-secondary" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/20" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/70" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Achievements Unlocked</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`relative group bg-gradient-to-br ${getTierStyles(achievement.tier)} border rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground truncate">{achievement.title}</h4>
                      {achievement.count && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          x{achievement.count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
