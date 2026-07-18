"use client"

import { CaseStudyTemplate } from "@/components/case-study-template"
import { profile } from "@/lib/profile"

export default function MyfinanceCaseStudy() {
  const project = profile.personalProjects.find(
    (p) => p.name === "MyFinance, a Finance Tracking App for iOS",
  )!

  return (
    <CaseStudyTemplate
      name={project.name}
      tagline="A native iOS app for tracking income and expenses, managing budgets, and analyzing spending trends — built in SwiftUI."
      platform={project.platform}
      period={project.period}
      stack={project.stack}
      bullets={project.bullets}
      overview={[
        "MyFinance started as a personal experiment in SwiftUI — a way to learn Apple's declarative UI framework while solving a problem I had: keeping track of where my money actually went each month. The challenge wasn't the math; it was building an interface I'd actually open every day.",
        "The app is built natively for iOS, with the dashboard as the home screen showing recent transactions and any budget categories close to (or over) their monthly limit. Tapping a transaction or category drills into detail views with breakdowns and trends.",
        "Design choices favor information density on the dashboard and breathing room on the detail views. Color is reserved for one job: signalling budget health — calm tones when you're on track, warmer tones when a category is heading past its cap.",
      ]}
      designNotes={[
        {
          title: "Dashboard-first",
          body: "Most finance apps bury the at-a-glance view behind tabs. MyFinance puts the budget summary and recent transactions on the launch screen — the things you check daily are the first things you see.",
        },
        {
          title: "Category color coding",
          body: "Each spending category owns one color across the entire app. The same hue carries through the dashboard ring chart, the category list, and individual transactions — building a quick visual memory of where money lives.",
        },
        {
          title: "Quiet alerts",
          body: "Budget warnings appear as a colored ring around the category icon, not as push notifications. The app never interrupts; you see warnings only when you choose to open it.",
        },
        {
          title: "Native by default",
          body: "Built with SwiftUI and Swift Charts so it feels at home on iOS — system fonts, native gestures, Dynamic Type support, dark mode out of the box. No web wrappers, no React Native.",
        },
      ]}
      // To add screenshots: drop images into public/myfinance/ and uncomment below
      // screenshots={[
      //   { src: "/myfinance/dashboard.png", alt: "MyFinance dashboard", caption: "Home dashboard with budget rings and recent transactions" },
      //   { src: "/myfinance/category.png", alt: "Category detail", caption: "Category drill-down with monthly trend" },
      // ]}
      links={[
        {
          label: "Designed for iOS 17+",
          href: "https://developer.apple.com/ios/",
          external: true,
        },
      ]}
    />
  )
}
