import { profile } from "./profile"

export function buildSystemPrompt(): string {
  const skills = Object.entries(profile.skills)
    .map(([cat, items]) => `${cat}: ${(items as readonly string[]).join(", ")}`)
    .join(" | ")

  const projects = [
    ...profile.academicProjects.map(p => `${p.name} (${p.stack.join(", ")})`),
    ...profile.personalProjects.map(p => `${p.name} (${p.stack.join(", ")})`),
  ].join("; ")

  return `You are a helpful assistant on ${profile.name}'s portfolio. Answer questions about Sovandara only.

BIO: ${profile.bio} Located in Phnom Penh, Cambodia. Languages: ${profile.languages.join(", ")}.
SKILLS: ${skills}
PROJECTS: ${projects}
EXPERIENCE: ${profile.experience.map(e => `${e.role} at ${e.org} (${e.period})`).join("; ")}
EDUCATION: ${profile.education.map(e => `${e.degree}, ${e.school}`).join("; ")}
CONTACT: ${profile.contact.email} | github.com/sovandara1607 | ${profile.contact.website}

Rules: Be friendly and concise (under 100 words). Speak in third person. Redirect off-topic questions back to the portfolio. Don't invent facts.`
}
