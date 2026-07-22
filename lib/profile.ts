export const profile = {
  name: "Sovandara Rith",
  title: "Year 3 Computer Science Student",
  tagline: "Full-stack developer & 3rd year Software Engineering Student",
  contact: {
    phone: "+855 99 944 923",
    email: "rithsovandara83@gmail.com",
    website: "https://www.loy.sovandara.lol",
    handle: "@sovandara1607",
  },
  bio: "Year 3 Computer Science student passionate about web and mobile development with AI integrated software. I'm currently studying at Paragon International University.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Paragon International University",
      period: "2023 – Present",
      note: "Year 3",
    },
    {
      degree: "BacII, High School Diploma",
      school: "Hun Sen Wat Svay High School",
      period: "2018 – 2022",
      note: "Graduated 2022 - BacII Grade A",
    },
  ],
  experience: [
    {
      key: "student-council",
      role: "Media & Technical Lead",
      org: "Student Council AY 2024–2025",
      subtitle: "Computer Science Student Council Representative",
      period: "2024 – 2025",
      link: "https://www.facebook.com/ParagonU.SC",
      bullets: [
        "Managed technical tasks and digital platforms for the student council.",
        "Built and hosted an online election system used for electing new student council members.",
        "Lead and supported media and technical activities for student council events.",
      ],
    },
    {
      key: "table-tennis-club",
      role: "Secretary & Media Lead",
      org: "Paragon International University Table Tennis Club",
      subtitle: "Secretary & Media Lead",
      period: "2024 – 2025",
      link: "https://www.facebook.com/paragon.tabletennis",
      bullets: [
        "Managed media content creation and tournament registration for the table tennis club.",
        "Supported media and technical activities for table tennis club tournaments.",
      ],
    },


  ],

  academicProjects: [
    {
      name: "Online Resume Builder Platform",
      course: "CS 262 — AdvancedWeb Development",
      role: "Full-stack Developer & Project Manager",
      period: "2024 – 2025",
      stack: ["Laravel", "MySQL", "REST API"],
      bullets: [
        "Web app for creating and managing professional resumes online.",
        "Implemented full CRUD for editing and managing resume data.",
        "Designed the database schema and user authentication flow.",
      ],
      demo: null as string | null,
      github: null as string | null,
    },
    {
      name: "TaskFlow, a Flutter Task Management Mobile App",
      course: "CS 361 Advanced Mobile Development",
      role: "Full-stack Developer & Project Manager",
      period: "2025 – 2026",
      stack: ["Flutter", "Dart", "Laravel"],
      bullets: [
        "Mobile task manager to help users organize daily tasks.",
        "Task creation, completion tracking, and management features.",
        "Clean, user-friendly interface built with Flutter and Laravel backend.",
      ],
      demo: null as string | null,
      github: null as string | null,
    },
    {
      name: "MyLMS, a Paragon International University LMS for EPP Students",
      course: "Paragon International University",
      role: "Frontend Lead, Backend Developer & UI/UX Designer",
      period: "2026 – Present",
      stack: ["Go", "PostgreSQL", "FastAPI", "Next.js", "Redis", "Docker", "Tailwind CSS", "TypeScript"],
      bullets: [
        "Built a learning management system for EPP students at Paragon International University.",
      ],
      demo: "https://mylms.paragoniu.app/auth/login" as string | null,
      github: null as string | null,
    },
    {
      name: "Fan Monitoring IoT Dashboard, an ESP32-based IoT Control System",
      course: "CS 397 — IoT / Embedded Systems",
      role: "Frontend Developer",
      period: "2026",
      stack: ["Laravel", "PHP", "Tailwind CSS", "Blade", "Chart.js", "ESP32"],
      bullets: [
        "Unified IoT dashboard and REST API for controlling ESP32-connected fans and monitoring real-time sensor data.",
        "Integrated with Sinric Pro for voice control via Alexa and Google Assistant.",
      ],
      demo: "https://www.fanmonitoringiot.systems" as string | null,
      github: null as string | null,
    },
  ],
  personalProjects: [
    {
      name: "MyFinance, a Finance Tracking App for iOS",
      platform: "iOS",
      role: "Full-stack Developer, UI/UX Designer & Project Manager",
      period: "2025 – 2026",
      stack: ["Swift", "SwiftUI"],
      bullets: [
        "Track income and expenses, organized by category.",
        "Manage monthly category budgets with alerts.",
        "Analyze spending with charts and trend insights.",
        "Dashboard with recent transactions and budget alerts.",
      ],
      demo: null as string | null,
      github: null as string | null,
    },
    {
      name: "RAG AI Search, a AI-powered retrieval-augmented generation (RAG) search app",
      platform: "Web",
      period: "2026 – Present",
      stack: ["Python", "Streamlit", "FAISS", "Docker"],
      bullets: [
        "Retrieval-augmented Q&A over indexed course lecture PDFs — FAISS vector search plus optional cross-encoder reranking, with citations and similarity scores.",
        "Extractive mode needs no API key; an optional Gemini-grounded mode answers only from retrieved chunks, with an explicit \"nothing relevant found\" for off-topic queries.",
      ],
      demo: "https://rag-search.sovandara.lol/" as string | null,
      github: "https://github.com/sovandara1607/rag-ai-search-" as string | null,
    },
  ],
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    backend: ["PHP", "Laravel", "Go", "Java", "FastAPI"],
    mobile: ["Dart", "Flutter", "Swift", "SwiftUI", "React Native", "Expo"],
    databases: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
    design: ["UI/UX", "Figma", "System Analysis & Software Design", "Adobe Photoshop", "Adobe Illustrator", "Canva"],
    tools: ["Docker", "Git", "Gitea", "DigitalOcean", "Vercel", "Railway", "Streamlit"],
  },
  softSkills: [
    "Team communication",
    "Willingness to learn in new environments",
    "Adaptability",
  ],
  languages: ["Khmer (Native)", "English"],
  interests: ["Photography", "Videography", "Nature", "Music"],
} as const;

export type Profile = typeof profile;
