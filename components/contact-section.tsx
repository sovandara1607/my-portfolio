import { Github, Mail, MapPin, ExternalLink } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{"// Get In Touch"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Let's Connect</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 glow-cyan">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio</p>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    sovandararith.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:hello@sovandararith.dev"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    hello@sovandararith.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    @sovandararith
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Phnom Penh, Cambodia</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground italic">
                "Always open to internships, collaboration, and building meaningful products."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2026 Sovandara Rith. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </section>
  )
}
