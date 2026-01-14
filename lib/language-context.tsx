"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "kh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
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
    "hero.subtitle": "Year 3 Computer Science Student · Web & Mobile Developer",
    "hero.aspiring": "Aspiring Software Engineer & Product Engineer",
    "hero.viewProjects": "View Projects →",
    "hero.downloadResume": "Download Resume",

    // About Section
    "about.label": "// About Me",
    "about.title": "Who I Am",
    "about.description1": "Passionate about building real-world, user-focused applications. I have experience across full-stack web, mobile apps, and a little bit of IoT development.",
    "about.description2": "My focus is on clean UI, solid backend architecture, and maintainability. I believe in writing code that not only works but is elegant and scalable.",
    "about.careerGoal": "Career Goal",
    "about.careerGoalText": "Software Engineer ~ Hopefully",
    "about.interests": "Interests",
    "about.interest1": "Basketball, Music, F1 & Art",
    "about.interest2": "Web & Mobile Development",
    "about.interest3": "Open Source Contribution",
    "about.interest4": "Cloud Computing & DevOps",
    "about.interest5": "AI & Machine Learning",
    "about.interest6": "System Design",

    // Tech Stack Section
    "tech.label": "// Tech Stack",
    "tech.title": "Technologies I Work With",
    "tech.languages": "Languages",
    "tech.frameworks": "Frameworks & Tools",
    "tech.other": "Other",

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

    // Mindset Section
    "mindset.label": "// Engineering Mindset",
    "mindset.title": "How I Approach Software Engineering as a CS Student",
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
    "contact.copyright": "© 2026 Sovandara Rith.",
  },
  kh: {
    // Navigation
    "nav.about": "អំពីខ្ញុំ",
    "nav.tech": "បច្ចេកវិទ្យា",
    "nav.projects": "គម្រោង",
    "nav.contact": "ទំនាក់ទំនង",
    "nav.getInTouch": "ទាក់ទងមក",
    "nav.searchPlaceholder": "ស្វែងរកផ្នែក...",
    "nav.noResults": "រកមិនឃើញ",
    "nav.pressEnter": "ចុច Enter ដើម្បីរុករក",

    // Hero Section
    "hero.welcome": "// សូមស្វាគមន៍មកកាន់ Portfolio របស់ខ្ញុំ",
    "hero.greeting": "សួស្ដី ខ្ញុំគឺ",
    "hero.name": "រិទ្ធ សុវណ្ណតារា",
    "hero.subtitle": "ជានិស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រឆ្នាំទី៣ · អ្នកអភិវឌ្ឍន៍ Web & Mobile",
    "hero.aspiring": "អ្នកវិស្វករ Software & Product ដែលកំពុងរីកចម្រើន",
    "hero.viewProjects": "មើលគម្រោង →",
    "hero.downloadResume": "ទាញយក Resume",

    // About Section
    "about.label": "// អំពីខ្ញុំ",
    "about.title": "ខ្ញុំជានរណា",
    "about.description1": "ខ្ញុំមានចំណាប់អារម្មណ៍ក្នុងការបង្កើត Application ដែលផ្តោតលើអ្នកប្រើប្រាស់។ ខ្ញុំមានបទពិសោធន៍លើ Full-stack web, Mobile apps និង IoT Development។",
    "about.description2": "ខ្ញុំផ្តោតលើ UI, Backend Architecture រឹងមាំ និងការថែរក្សាបាន។ ខ្ញុំជឿថា Code មិនត្រឹមតែត្រូវដំណើរការប៉ុណ្ណោះទេ ប៉ុន្តែត្រូវតែមានសោភ័ណ និង Scalable។",
    "about.careerGoal": "គោលដៅអាជីព",
    "about.careerGoalText": "Software Engineer",
    "about.interests": "ចំណាប់អារម្មណ៍",
    "about.interest1": "បាល់បោះ តន្ត្រី F1 និងសិល្បៈ",
    "about.interest2": "Web & Mobile Development",
    "about.interest3": "Open Source Contribution",
    "about.interest4": "Cloud Computing & DevOps",
    "about.interest5": "AI & Machine Learning",
    "about.interest6": "System Design",

    // Tech Stack Section
    "tech.label": "// បច្ចេកវិទ្យា",
    "tech.title": "បច្ចេកវិទ្យាដែលខ្ញុំប្រើ",
    "tech.languages": "ភាសា",
    "tech.frameworks": "Frameworks & Tools",
    "tech.other": "ផ្សេងទៀត",

    // Projects Section
    "projects.label": "// គម្រោងសំខាន់ៗ",
    "projects.title": "អ្វីដែលខ្ញុំបានបង្កើតឡើងមក",
    "projects.code": "Code",
    "projects.demo": "Demo",
    "projects.caseStudy": "Case Study →",
    "projects.pinned": "● ពិសេស",
    "projects.fitnessTitle": "Track Your Fitness",
    "projects.fitnessDesc": "កម្មវិធីតាមដាន Fitness ផ្តោតលើការប្រើប្រាស់ ល្បឿន និង UI ស្រស់បំព្រង។",
    "projects.esp32Title": "ESP32 Web Server",
    "projects.esp32Desc": "ឧបករណ៍គ្រប់គ្រង Hardware ESP32 តាមរយៈ WiFi។",

    // Mindset Section
    "mindset.label": "// ផ្នត់គំនិតរបស់ Engineering",
    "mindset.title": "របៀបដែលខ្ញុំចូលទៅកាន់ជំនាញ Software Engineering ក្នុងនាមជា CS Student",
    "mindset.p1": "រៀនរចនា System ដែលអាចថែរក្សា និង Scalable បាន",
    "mindset.p2": "ផ្តោតលើគុណភាព Code និង Best Practices",
    "mindset.p3": "ផ្តោតលើ User Experience និង Accessibility",
    "mindset.p4": "ទទួលយកការសហការ និង Open Source",
    "mindset.p5": "រៀនសូត្រជាបន្តបន្ទាប់ និងសម្រប់ខ្លួនជាមួយបច្ចេកវិទ្យាថ្មី",
    "mindset.p6": "តុល្យភាពរវាង Performance និង Resource Efficiency",
    "mindset.p7": "តុល្យភាពរវាង UI, Backend និង System Design",
    "mindset.p8": "គិតពីផលប៉ះពាល់រយៈពេលវែង និង Sustainability",

    // Achievements Section
    "achievements.label": "// សមិទ្ធិផល GitHub",
    "achievements.title": "ការទទួលស្គាល់",
    "achievements.pullShark": "Pull Shark",
    "achievements.pullSharkDesc": "អ្នករួមចំណែកសកម្ម ជាមួយ PR ច្រើនដែលត្រូវបាន Merge",
    "achievements.yolo": "YOLO",
    "achievements.yoloDesc": "Merge PR ដោយគ្មានការត្រួតពិនិត្យ (ដោយទំនុកចិត្ត!)",

    // Resume Section
    "resume.label": "// ប្រវត្តិរូប",
    "resume.title": "ទាញយក CV របស់ខ្ញុំ",

    // Contact Section
    "contact.label": "// ទំនាក់ទំនង",
    "contact.title": "ទាក់ទងតាម",
    "contact.portfolio": "Portfolio",
    "contact.email": "អ៊ីមែល",
    "contact.github": "GitHub",
    "contact.location": "ទីតាំង",
    "contact.locationValue": "រាជធានីភ្នំពេញ កម្ពុជា",
    "contact.quote": '"រីករាយបើកទទួលសម្រាប់ការ Internships ការសហការ និងការបង្កើតផលិតផលមានអត្ថន័យ។"',
    "contact.copyright": "© ២០២៦ រិទ្ធ សុវណ្ណតារា",
  },
}

// Default translation function for SSR
const defaultT = (key: string): string => {
  return translations.en[key] || key
}

// Create context with default value for SSR
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: defaultT,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "kh")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
