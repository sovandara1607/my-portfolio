"use client"

import { createContext, useContext, ReactNode } from "react"

type Language = "en"

interface LanguageContextType {
  language: Language
  t: (key: string) => string
}

const translations: Record<string, string> = {
  // Navigation
  "nav.about": "AbouT",
  "nav.tech": "TecH",
  "nav.projects": "ProjecTs",
  "nav.contact": "ContacT",
  "nav.getInTouch": "Get in ToucH",
  "nav.searchPlaceholder": "Search sections...",
  "nav.noResults": "No results found",
  "nav.pressEnter": "Press Enter to navigate",

  // Hero Section
  "hero.welcome": "// Welcome to my portfolio",
  "hero.greeting": "Hi, I'm",
  "hero.name": "Sovandara Rith",
  "hero.subtitle": "Year 3 Computer Science Student · Currently Learning Web & Mobile Development",
  "hero.viewProjects": "View Projects →",
  "hero.downloadResume": "Download Resume",

  // About Section
  "about.label": "// About Me",
  "about.title": "Who Am I",
  "about.description1": "Passionate about building real-world, user-focused applications. I have experience across full-stack web, mobile apps.",
  "about.description2": "My focus is on clean UI, solid backend architecture, and maintainability. I believe in writing code that not only works but is elegant and scalable.",
  "about.careerGoal": "Career Goal",
  "about.careerGoalText": "Software Engineer ~ Hopefully",
  "about.interests": "Interests",
  "about.interest1": "Basketball, Music, F1 & Art",
  "about.interest2": "Web & Mobile Development",
  "about.interest3": "Open Source Contribution",
  "about.interest4": "Cloud Computing & DevOps",
  "about.interest5": "AI & Machine Learning",

  // Tech Stack Section
  "tech.label": "// Tech Stack",
  "tech.title": "Technologies I Work With",
  "tech.languages": "Languages",
  "tech.frameworks": "Frameworks & Tools",
  "tech.other": "Other",

  // Tools Section
  "tool.label": "// Tools & Software",
  "tool.title": "Tools I'm Proficient With",
  "tool.adobe": "Adobe Creative Suite",

  // Projects Section
  "projects.label": "// Featured Projects",
  "projects.title": "What I've Built",
  "projects.code": "Code",
  "projects.demo": "Demo",
  "projects.caseStudy": "Case Study →",
  "projects.pinned": "● pinned",
  "projects.fitnessTitle": "Track Your Fitness",
  "projects.fitnessDesc": "Fitness tracking app focused on usability, performance, and clean UI.",
  "projects.esp32Title": "ESP32 Web Server",
  "projects.esp32Desc": "Web-based controller to manage ESP32 hardware outputs via WiFi.",
  "projects.academicHeading": "Academic & Personal Work",
  "projects.academicSubheading": "University coursework and side projects",
  "projects.viewDetails": "View Details →",
  "projects.platformIos": "iOS",
  "projects.coursePrefix": "Course",

  // Experiences extras
  "experiences.work": "Work",
  "experiences.education": "Education",
  "experiences.languages": "Languages",
  "experiences.interests": "Interests",
  "experiences.softSkills": "Soft Skills",

  // Skills
  "skills.frontend": "Frontend",
  "skills.backend": "Backend",
  "skills.mobile": "Mobile",
  "skills.databases": "Databases",
  "skills.design": "Design",
  "skills.tools": "Tools & Platforms",

  // Case Study (generic)
  "caseStudy.back": "Back",
  "caseStudy.label": "Case Study",
  "caseStudy.overview": "Overview",
  "caseStudy.highlights": "Highlights",
  "caseStudy.stack": "Tech Stack",
  "caseStudy.course": "Course",
  "caseStudy.period": "Period",
  "caseStudy.platform": "Platform",

  // Mindset Section
  "mindset.label": "// Engineering Mindset",
  "mindset.title": "How I Will Approach Software Engineering as a CS Student",
  "mindset.p1": "Learning to design maintainable and scalable systems",
  "mindset.p2": "Prioritizing code quality and best practices",
  "mindset.p3": "Prioritizing user experience and accessibility",
  "mindset.p4": "Embracing collaboration and open source",
  "mindset.p5": "Continuous learning and adapting to new technologies",
  "mindset.p6": "Balancing performance with resource efficiency",
  "mindset.p7": "Balance between UI, backend, and system design",
  "mindset.p8": "Thinking about long-term impact and sustainability",

  // Achievements Section
  "achievements.label": "// GitHub Achievements",
  "achievements.title": "Recognition & Impact",
  "achievements.pullShark": "Pull Shark",
  "achievements.pullSharkDesc": "Active contributor with multiple merged PRs",
  "achievements.yolo": "YOLO",
  "achievements.yoloDesc": "Merged PRs without review (with confidence!)",

  // Resume Section
  "resume.label": "// Resume",
  "resume.title": "Download My CV",

  // Contact Section
  "contact.label": "// Get In Touch",
  "contact.title": "Let's Connect",
  "contact.portfolio": "Portfolio",
  "contact.email": "Email",
  "contact.github": "GitHub",
  "contact.location": "Location",
  "contact.locationValue": "Phnom Penh, Cambodia",
  "contact.quote": '"Always open to internships, collaboration, and building meaningful products."',
  "contact.buyMeCoffee": "Support My Work",
  "contact.buyMeCoffeeDesc": "If you enjoy my work or find it helpful, consider buying me a coffee! Your support helps me continue learning and creating.",
  "contact.buyMeCoffeeButton": "Buy Me a Coffee",
  "contact.copyright": "© 2026 Sovandara Rith.",
}

const t = (key: string): string => translations[key] || key

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ language: "en", t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
