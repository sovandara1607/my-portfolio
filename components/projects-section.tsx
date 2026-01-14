import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Pin } from "lucide-react"

const projects = [
  {
    title: "Track Your Fitness",
    description:
      "Fitness tracking app focused on usability, performance, and clean UI. Built with modern technologies for a seamless user experience.",
    tech: ["TypeScript", "React Native", "Expo"],
    pinned: true,
    github: "#",
    demo: "#",
  },
  {
    title: "ESP32 Web Server",
    description:
      "Web-based controller to manage ESP32 hardware outputs via WiFi. Emphasis on IoT, networking, and practical engineering.",
    tech: ["C++", "ESP32", "Web Server"],
    pinned: false,
    github: "#",
    demo: "#",
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
              className="group bg-card border border-border rounded-xl overflow-hidden glow-cyan-hover transition-all duration-300"
            >
              {/* Project Preview */}
              <div className="h-48 bg-secondary/50 flex items-center justify-center border-b border-border">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-2xl text-primary">{"</>"}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Project Preview</p>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.pinned && (
                    <Badge variant="outline" className="border-primary text-primary">
                      <Pin className="h-3 w-3 mr-1" />
                      Pinned
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
