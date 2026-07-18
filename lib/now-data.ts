export const nowData = {
  updatedAt: "July 2026",

  building: [
    {
      name: "Portfolio v2",
      description: "This site — interactive terminal, command palette, AI assistant, and premium animations.",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      name: "MyFinance iOS App",
      description: "Personal finance tracker with budget alerts and spending analytics.",
      stack: ["Swift", "SwiftUI"],
    },
  ],

  learning: [
    "Go (Gin framework for REST APIs)",
    "PostgreSQL advanced query patterns",
    "Framer Motion advanced choreography",
    "System design fundamentals",
  ],

  focus: "Shipping clean, well-crafted software that people actually enjoy using.",

  recentlyCompleted: [
    { name: "TaskFlow, a Flutter Task Manager", when: "May 2026" },
    { name: "Online Resume Builder, a Laravel project", when: "Apr 2026" },
    { name: "Portfolio v1 public launch", when: "Mar 2026" },
  ],
  
  reading: [
    "The Pragmatic Programmer — Hunt & Thomas",
    "Clean Architecture — Robert C. Martin",
  ],

  goals: [
    { label: "Graduate with honours (CS, Paragon International University)", done: false },
    { label: "Ship MyFinance to the App Store", done: false },
    { label: "Contribute to an open-source project", done: false },
    { label: "Land a junior dev role or internship", done: false },
    { label: "Build a SaaS product (idea TBD)", done: false },
  ],
} as const
