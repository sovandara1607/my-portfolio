import { profile } from "./profile"

// Stable keys for the three hand-written featured projects in
// components/projects-section.tsx. Used to key their uploaded photo (if any)
// in the `project_photos` table.
export const FEATURED_PROJECT_KEYS = {
  jgdo: "jgdo",
  fitnessApp: "fitness-app",
  handDetector: "hand-detector",
} as const

export interface ProjectCatalogEntry {
  key: string
  title: string
}

// Admin-facing labels only — not shown on the homepage, so no translation needed.
export const FEATURED_PROJECT_ENTRIES: ProjectCatalogEntry[] = [
  { key: FEATURED_PROJECT_KEYS.jgdo, title: "JgDo" },
  { key: FEATURED_PROJECT_KEYS.fitnessApp, title: "Tos Lift" },
  { key: FEATURED_PROJECT_KEYS.handDetector, title: "Hand Detector" },
]

// Maps profile.ts academic/personal project names to a stable key. Always
// used as the project's photo key; only used as a case-study route slug when
// it also appears in CASE_STUDY_SLUGS below (i.e. a page actually exists at
// app/projects/<slug>). Projects without a case study fall back to their
// demo link instead.
export const projectSlugByName: Record<string, string> = {
  "Online Resume Builder Platform": "resume-builder",
  "TaskFlow, a Flutter Task Management Mobile App": "taskflow",
  "MyFinance, a Finance Tracking App for iOS": "myfinance",
  "MyLMS, a Paragon International University LMS for EPP Students": "mylms",
  "RAG AI Search, a AI-powered retrieval-augmented generation (RAG) search app": "rag-ai-search",
  "Fan Monitoring IoT Dashboard, an ESP32-based IoT Control System": "fan-monitoring-iot",
}

// Slugs that have a real page under app/projects/<slug>. Keep in sync with
// that directory — a slug missing here just means the card links to its
// demo/GitHub instead of a case study.
export const CASE_STUDY_SLUGS = new Set([
  "resume-builder",
  "taskflow",
  "myfinance",
  "fitness-app",
  "hand-detector",
  "rag-ai-search",
])

export const CATALOG_PROJECT_ENTRIES: ProjectCatalogEntry[] = [
  ...profile.academicProjects.map((p) => ({ key: projectSlugByName[p.name], title: p.name })),
  ...profile.personalProjects.map((p) => ({ key: projectSlugByName[p.name], title: p.name })),
].filter((entry) => Boolean(entry.key))

export const ALL_PROJECT_ENTRIES: ProjectCatalogEntry[] = [
  ...FEATURED_PROJECT_ENTRIES,
  ...CATALOG_PROJECT_ENTRIES,
]
