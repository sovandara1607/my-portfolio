export const profile = {
  name: "Sovandara Rith",
  title: "Year 3 Computer Science Student",
  tagline: "Full-stack developer focused on web & mobile applications",
  contact: {
    phone: "+855 99 944 923",
    email: "rithsovandara83@gmail.com",
    website: "https://www.sovandara.lol",
    handle: "@sovandara1607",
  },
  bio: "Year 3 Computer Science student passionate about web and mobile development.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Paragon International University",
      period: "2024 – Present",
      note: "Year 3",
    },
    {
      degree: "High School Diploma",
      school: "Hun Sen Wat Svay High School",
      period: "2018 – 2022",
      note: "Graduated 2022 — BacII Grade A",
    },
  ],
  experience: [
    {
      key: "student-council",
      role: "Media & Technical Lead",
      org: "Student Council AY 2024–2025",
      subtitle: "Computer Science Representative",
      period: "2024 – 2025",
      link: "https://www.facebook.com/ParagonU.SC",
      bullets: [
        "Managed technical tasks and digital platforms for the student council.",
        "Built and hosted an online election system used for student voting.",
        "Supported media and technical activities for student council events.",
      ],
    },
    {
      key: "table-tennis",
      role: "Media Lead",
      org: "Paragon International University Table Tennis Club",
      subtitle: "Secretary & Media Lead",
      period: "2024 – 2025",
      link: null as string | null,
      bullets: [
        "Managed media content creation and distribution for the table tennis club.",
        "Supported media and technical activities for events.",
      ],
    },
    

  ],
  
  academicProjects: [
    {
      name: "Online Resume Builder Platform",
      course: "CS 262 — Full-Stack Development",
      period: "2025 – 2026",
      stack: ["Laravel", "MySQL", "REST API"],
      bullets: [
        "Web app for creating and managing professional resumes online.",
        "Implemented full CRUD for editing and managing resume data.",
        "Designed the database schema and user authentication flow.",
      ],
    },
    {
      name: "TaskFlow — Task Management Mobile App",
      course: "CS 361 — Full-Stack Development",
      period: "2025 – 2026",
      stack: ["Flutter", "Dart"],
      bullets: [
        "Mobile task manager to help users organize daily tasks.",
        "Task creation, completion tracking, and management features.",
        "Clean, user-friendly interface built with Flutter.",
      ],
    },
  ],
  personalProjects: [
    {
      name: "MyFinance — Finance Tracking App",
      platform: "iOS",
      period: "2025 – 2026",
      stack: ["Swift", "SwiftUI"],
      bullets: [
        "Track income and expenses, organized by category.",
        "Manage monthly category budgets with alerts.",
        "Analyze spending with charts and trend insights.",
        "Dashboard with recent transactions and budget alerts.",
      ],
    },
  ],
  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    backend: ["PHP", "Laravel", "Go", "Java"],
    mobile: ["Dart", "Flutter", "Swift", "SwiftUI"],
    databases: ["MySQL", "PostgreSQL", "Redis", "MongoDB"],
    design: ["UI/UX", "Figma", "System Analysis & Software Design", "Adobe Photoshop", "Adobe Illustrator"],
    tools: ["Docker", "Git", "Gitea", "DigitalOcean", "Vercel", "Railway"],
  },
  softSkills: [
    "Team communication",
    "Willingness to learn in new environments",
  ],
  languages: ["Khmer (Native)", "English"],
  interests: ["Photography", "Videography", "Nature", "Music"],
} as const;

export type Profile = typeof profile;
