// Knowledge graph: Sovandara's skills and how they connect.
// Groups map to the cream/red palette via GROUP_COLORS in the app component.

export type NodeGroup =
  | "core"
  | "language"
  | "framework"
  | "database"
  | "cloud"
  | "design"
  | "tool"
  | "ai"

export interface GraphNode {
  id: string
  group: NodeGroup
  /** relative node size */
  val: number
  /** short blurb shown in the side panel */
  desc?: string
}

export interface GraphLink {
  source: string
  target: string
}

export const GROUP_LABELS: Record<NodeGroup, string> = {
  core: "Core",
  language: "Languages",
  framework: "Frameworks",
  database: "Databases",
  cloud: "Cloud & DevOps",
  design: "Design",
  tool: "Tools",
  ai: "AI / ML",
}

const node = (id: string, group: NodeGroup, val = 4, desc?: string): GraphNode => ({ id, group, val, desc })

export const graphNodes: GraphNode[] = [
  node("Sovandara", "core", 16, "Year 3 CS student — full-stack web & mobile developer based in Phnom Penh."),

  // Category hubs
  node("Languages", "language", 10),
  node("Frameworks", "framework", 10),
  node("Databases", "database", 10),
  node("Cloud & DevOps", "cloud", 10),
  node("Design", "design", 10),
  node("AI / ML", "ai", 10),

  // Languages
  node("JavaScript", "language", 6, "Primary language for web interfaces and tooling."),
  node("TypeScript", "language", 5, "Typed JavaScript used across this portfolio."),
  node("PHP", "language", 6, "Backend language, mainly with Laravel."),
  node("Go", "language", 4, "Learning for performant REST services."),
  node("Java", "language", 4, "OOP fundamentals and coursework."),
  node("Dart", "language", 5, "Language behind Flutter mobile apps."),
  node("Swift", "language", 5, "Native iOS development."),
  node("HTML", "language", 4, "Semantic markup foundation."),
  node("CSS", "language", 4, "Styling and layout."),

  // Frameworks
  node("Laravel", "framework", 6, "PHP framework powering the Resume Builder."),
  node("Flutter", "framework", 6, "Cross-platform mobile UI for TaskFlow."),
  node("SwiftUI", "framework", 5, "Declarative UI for the MyFinance iOS app."),
  node("Next.js", "framework", 6, "React framework running this site."),
  node("React", "framework", 5, "Component model for web UIs."),
  node("Tailwind CSS", "framework", 5, "Utility-first styling system."),

  // Databases
  node("MySQL", "database", 6, "Relational DB for full-stack coursework."),
  node("PostgreSQL", "database", 5, "Advanced relational workloads."),
  node("Redis", "database", 4, "In-memory caching and sessions."),
  node("MongoDB", "database", 4, "Document store experiments."),

  // Cloud & DevOps
  node("Docker", "cloud", 5, "Containerized local & deploy environments."),
  node("Git", "cloud", 5, "Version control day to day."),
  node("Gitea", "cloud", 3, "Self-hosted Git server."),
  node("DigitalOcean", "cloud", 4, "VPS hosting and droplets."),
  node("Vercel", "cloud", 5, "Deploys this Next.js portfolio."),
  node("Railway", "cloud", 4, "Backend & DB hosting."),

  // Design
  node("Figma", "design", 5, "UI/UX design and prototyping."),
  node("UI/UX", "design", 5, "Interaction and visual design thinking."),
  node("Photoshop", "design", 4, "Photo editing for photography work."),
  node("Illustrator", "design", 4, "Vector and brand graphics."),

  // AI / ML
  node("MediaPipe", "ai", 5, "In-browser hand-gesture detection (Performative Detector)."),
  node("Gemini API", "ai", 4, "Powers this portfolio's AI assistant."),
  node("Computer Vision", "ai", 4, "Gesture & landmark detection."),
]

const link = (source: string, target: string): GraphLink => ({ source, target })

export const graphLinks: GraphLink[] = [
  // Core → hubs
  link("Sovandara", "Languages"),
  link("Sovandara", "Frameworks"),
  link("Sovandara", "Databases"),
  link("Sovandara", "Cloud & DevOps"),
  link("Sovandara", "Design"),
  link("Sovandara", "AI / ML"),

  // Hub → languages
  link("Languages", "JavaScript"),
  link("Languages", "TypeScript"),
  link("Languages", "PHP"),
  link("Languages", "Go"),
  link("Languages", "Java"),
  link("Languages", "Dart"),
  link("Languages", "Swift"),
  link("Languages", "HTML"),
  link("Languages", "CSS"),

  // Hub → frameworks
  link("Frameworks", "Laravel"),
  link("Frameworks", "Flutter"),
  link("Frameworks", "SwiftUI"),
  link("Frameworks", "Next.js"),
  link("Frameworks", "React"),
  link("Frameworks", "Tailwind CSS"),

  // Hub → databases
  link("Databases", "MySQL"),
  link("Databases", "PostgreSQL"),
  link("Databases", "Redis"),
  link("Databases", "MongoDB"),

  // Hub → cloud
  link("Cloud & DevOps", "Docker"),
  link("Cloud & DevOps", "Git"),
  link("Cloud & DevOps", "Gitea"),
  link("Cloud & DevOps", "DigitalOcean"),
  link("Cloud & DevOps", "Vercel"),
  link("Cloud & DevOps", "Railway"),

  // Hub → design
  link("Design", "Figma"),
  link("Design", "UI/UX"),
  link("Design", "Photoshop"),
  link("Design", "Illustrator"),

  // Hub → AI
  link("AI / ML", "MediaPipe"),
  link("AI / ML", "Gemini API"),
  link("AI / ML", "Computer Vision"),

  // Cross-relationships (the interesting connections)
  link("Laravel", "PHP"),
  link("Flutter", "Dart"),
  link("SwiftUI", "Swift"),
  link("Next.js", "React"),
  link("Next.js", "TypeScript"),
  link("React", "JavaScript"),
  link("Tailwind CSS", "CSS"),
  link("TypeScript", "JavaScript"),
  link("HTML", "CSS"),
  link("Laravel", "MySQL"),
  link("Next.js", "Vercel"),
  link("Laravel", "Railway"),
  link("Docker", "DigitalOcean"),
  link("MediaPipe", "Computer Vision"),
  link("MediaPipe", "JavaScript"),
  link("Gemini API", "Next.js"),
  link("Figma", "UI/UX"),
]
