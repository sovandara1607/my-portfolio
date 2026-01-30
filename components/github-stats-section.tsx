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
    count: 1,
  },
//   {
//     id: "arctic-code-vault",
//     title: "Arctic Code Vault",
//     description: "Contributed code to the 2020 GitHub Archive Program",
//     tier: "default",
//     icon: "❄️",
//     count: null,
//   },
//   {
//     id: "quickdraw",
//     title: "Quickdraw",
//     description: "Gitty up! You closed an issue or pull request within 5 minutes of opening",
//     tier: "default",
//     icon: "⚡",
//     count: null,
//   },
  {
    id: "yolo",
    title: "YOLO",
    description: "Merged a pull request without code review",
    tier: "default",
    icon: "🚀",
    count: null,
  },
//   {
//     id: "starstruck",
//     title: "Starstruck",
//     description: "Created a repository that has many stars",
//     tier: "bronze",
//     icon: "⭐",
//     count: 16,
//   },
//   {
//     id: "pair-extraordinaire",
//     title: "Pair Extraordinaire",
//     description: "Coauthored commits on a merged pull request",
//     tier: "bronze",
//     icon: "👥",
//     count: 2,
//   },
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

// Generate contribution data based on real GitHub activity pattern
// 0 = no contributions, 1-4 = increasing intensity
function generateContributionData(): number[][] {
  const weeks: number[][] = []
  
  // 52 weeks of data (Jan 2025 - Jan 2026)
  for (let week = 0; week < 52; week++) {
    const days: number[] = []
    
    for (let day = 0; day < 7; day++) {
      let level = 0
      
      // Jan-Apr: Very sparse (weeks 0-17)
      if (week < 18) {
        level = 0
      }
      // May: One contribution around week 18-19
      else if (week >= 18 && week <= 20) {
        if (week === 19 && day === 5) level = 2
        else level = 0
      }
      // June: A few contributions (weeks 22-25)
      else if (week >= 22 && week <= 25) {
        if (week === 24 && day === 1) level = 2
        else if (week === 25 && (day === 1 || day === 5)) level = 1
        else level = 0
      }
      // July: More activity (weeks 26-30)
      else if (week >= 26 && week <= 30) {
        if (week === 27 && day === 1) level = 2
        else if (week === 28 && day === 1) level = 3
        else if (week === 29 && (day === 1 || day === 5)) level = 1
        else if (week === 30 && day === 5) level = 2
        else level = 0
      }
      // Aug: Activity continues (weeks 31-35)
      else if (week >= 31 && week <= 35) {
        if (week === 32 && day === 1) level = 2
        else if (week === 33 && day === 5) level = 1
        else if (week === 34 && day === 1) level = 2
        else level = 0
      }
      // Sep-Oct: Sparse (weeks 36-43)
      else if (week >= 36 && week <= 43) {
        level = 0
      }
      // Nov: Activity picks up (weeks 44-47)
      else if (week >= 44 && week <= 47) {
        if (week === 45 && day === 5) level = 1
        else if (week === 46 && (day === 1 || day === 3)) level = 2
        else if (week === 47 && day === 5) level = 1
        else level = 0
      }
      // Dec: High activity (weeks 48-51)
      else if (week >= 48 && week <= 51) {
        if (week === 48) {
          if (day === 1) level = 3
          else if (day === 3) level = 2
          else if (day === 5) level = 1
          else level = 0
        } else if (week === 49) {
          if (day === 1) level = 4
          else if (day === 3) level = 3
          else if (day === 5) level = 2
          else level = 0
        } else if (week === 50) {
          if (day === 1) level = 3
          else if (day === 3) level = 2
          else if (day === 5) level = 3
          else level = 0
        } else if (week === 51) {
          if (day === 1) level = 4
          else if (day === 3) level = 3
          else level = 0
        }
      }
      
      days.push(level)
    }
    
    weeks.push(days)
  }
  
  return weeks
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
      publicRepos: 25,
      followers: 2,
      following: 10,
      contributions: 146,
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
    <section id="github" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{"// GitHub Profile"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Stats & Achievements</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Repositories", value: stats.publicRepos },
            { label: "Followers", value: stats.followers },
            { label: "Following", value: stats.following },
            { label: "Contributions", value: stats.contributions },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-4 text-center shadow-[3px_3px_0_rgba(0,0,0,0.3)] glow-mc-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="glass-subtle rounded-lg p-2 -m-2">
                <div className="text-2xl font-bold text-primary mb-1 tabular-nums">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contribution Graph */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-4 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">146 contributions in the last year</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {/* Real contribution data - 52 weeks x 7 days */}
                {generateContributionData().map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((level, dayIndex) => {
                      const bgClass = 
                        level === 0 ? "bg-secondary/50" :
                        level === 1 ? "bg-green-900/60" :
                        level === 2 ? "bg-green-700/70" :
                        level === 3 ? "bg-green-500/80" :
                        "bg-green-400"
                      
                      return (
                        <div
                          key={dayIndex}
                          className={`w-[10px] h-[10px] ${bgClass} transition-all duration-200 hover:scale-150 hover:z-10`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-[10px] h-[10px] bg-secondary/50" />
                <div className="w-[10px] h-[10px] bg-green-900/60" />
                <div className="w-[10px] h-[10px] bg-green-700/70" />
                <div className="w-[10px] h-[10px] bg-green-500/80" />
                <div className="w-[10px] h-[10px] bg-green-400" />
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
                className={`relative group bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-5 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[4px_4px_0_rgba(93,155,53,0.3),0_0_15px_rgba(128,255,32,0.1)] hover:border-primary/40`}
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
