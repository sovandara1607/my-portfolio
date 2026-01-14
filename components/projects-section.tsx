import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const projects = [
  {
    title: "Track Your Fitness",
    description: "Fitness tracking app focused on usability, performance, and clean UI.",
    tech: ["TypeScript", "React Native", "Expo"],
    pinned: true,
    github: "#",
    demo: "#",
    caseStudy: "/projects/fitness-app",
    filename: "fitness-app.tsx",
    code: [
      { text: "const FitnessApp = () => {", color: "text-primary" },
      { text: "  const features = [", color: "text-foreground" },
      { text: '    "workout-tracking",', color: "text-muted-foreground" },
      { text: '    "progress-analytics",', color: "text-muted-foreground" },
      { text: '    "social-challenges"', color: "text-muted-foreground" },
      { text: "  ];", color: "text-foreground" },
      { text: "", color: "text-foreground" },
      { text: "  return <App features={features} />;", color: "text-foreground" },
      { text: "};", color: "text-primary" },
    ],
  },
  {
    title: "ESP32 Web Server",
    description: "Web-based controller to manage ESP32 hardware outputs via WiFi.",
    tech: ["C++", "ESP32", "Web Server"],
    pinned: false,
    github: "#",
    demo: "#",
    caseStudy: "/projects/esp32-server",
    filename: "esp32_server.cpp",
    code: [
      { text: "void setup() {", color: "text-primary" },
      { text: "  WiFi.begin(ssid, pass);", color: "text-foreground" },
      { text: "  server.on(\"/\", handleRoot);", color: "text-foreground" },
      { text: "  server.on(\"/gpio\", handleGPIO);", color: "text-foreground" },
      { text: "  server.begin();", color: "text-foreground" },
      { text: "", color: "text-foreground" },
      { text: "  // Ready for connections", color: "text-muted-foreground" },
      { text: '  Serial.println("Server OK");', color: "text-foreground" },
      { text: "}", color: "text-primary" },
    ],
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm tracking-wider mb-2">{"// Featured Projects"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I've Built</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="relative bg-card border border-border rounded-xl overflow-hidden glow-cyan-hover transition-all duration-300">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-muted-foreground">{project.filename}</span>
                  {project.pinned && (
                    <span className="ml-auto text-[10px] text-primary">● pinned</span>
                  )}
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm glass-subtle">
                  {project.code.map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-6">
                      <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                        {String(lineIndex + 1).padStart(2, "0")}
                      </span>
                      <span className={line.color}>{line.text}</span>
                    </div>
                  ))}
                  <div className="mt-1">
                    <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                      {String(project.code.length + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-block w-1.5 h-4 bg-primary terminal-cursor" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 space-y-4 border-t border-border/50">
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs text-muted-foreground bg-secondary/60 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border text-foreground hover:bg-secondary bg-transparent h-8 text-xs"
                    >
                      Code
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs">
                      Demo
                    </Button>
                    <Link href={project.caseStudy}>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 h-8 text-xs">
                        Case Study →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
