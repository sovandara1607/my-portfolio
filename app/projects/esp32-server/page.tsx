"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Cpu, Wifi, Gauge, Zap, Server, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const techStack = [
  { name: "C++", category: "Language" },
  { name: "ESP32", category: "Hardware" },
  { name: "AsyncWebServer", category: "Server" },
  { name: "WebSocket", category: "Protocol" },
  { name: "HTML/CSS/JS", category: "Frontend" },
  { name: "SPIFFS", category: "Storage" },
]

const features = [
  "Real-time GPIO control via web interface",
  "Live sensor data visualization",
  "WebSocket for instant updates",
  "OTA (Over-The-Air) firmware updates",
  "WiFi configuration portal",
  "Responsive mobile-friendly UI",
]

const challenges = [
  {
    title: "Memory Management",
    problem: "ESP32 has limited RAM (~320KB), and complex web pages were causing crashes",
    solution: "Implemented chunked transfer encoding, GZIP compression, and stored static files in SPIFFS",
    icon: Cpu,
  },
  {
    title: "Connection Stability",
    problem: "WebSocket connections would drop unexpectedly on poor WiFi networks",
    solution: "Added heartbeat mechanism with auto-reconnection and connection state UI indicators",
    icon: Wifi,
  },
  {
    title: "Security Concerns",
    problem: "Open access to hardware controls posed security risks",
    solution: "Implemented basic auth, HTTPS support, and rate limiting for API endpoints",
    icon: Shield,
  },
]

const specifications = [
  { label: "Response Time", value: "<50ms", icon: Gauge },
  { label: "Max Clients", value: "8", icon: Users },
  { label: "Power Consumption", value: "~80mA", icon: Zap },
  { label: "Flash Usage", value: "~1.2MB", icon: Server },
]

export default function ESP32CaseStudy() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-border bg-transparent">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <ExternalLink className="h-4 w-4 mr-2" />
              Documentation
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary text-primary">
                Case Study
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                ESP32 <span className="text-primary text-glow">Web Server</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A web-based controller to manage ESP32 hardware outputs via WiFi. Emphasis on IoT, networking, and practical engineering.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>~6 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Academic Project</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="bg-secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hardware Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8 glow-cyan">
                <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Cpu className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Hardware Demo</p>
                  </div>
                </div>
                
                {/* Live indicators */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {["GPIO 2", "GPIO 4", "GPIO 5", "GPIO 18"].map((pin, i) => (
                    <div
                      key={pin}
                      className={`text-center p-2 rounded-lg border ${
                        i % 2 === 0 ? "border-green-500/50 bg-green-500/10" : "border-border bg-secondary/50"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                        i % 2 === 0 ? "bg-green-500 animate-pulse" : "bg-muted"
                      }`} />
                      <span className="text-xs text-muted-foreground">{pin}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specifications.map((spec) => (
              <div key={spec.label} className="bg-card border border-border rounded-xl p-4 text-center glow-cyan-hover transition-all duration-300">
                <spec.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary mb-1">{spec.value}</div>
                <div className="text-sm text-muted-foreground">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Capabilities"}</p>
            <h2 className="text-3xl font-bold text-foreground">System Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl glow-cyan-hover transition-all duration-300"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Code Sample"}</p>
            <h2 className="text-3xl font-bold text-foreground">WebSocket Handler</h2>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl" />
            <div className="relative bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-muted-foreground">main.cpp</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-foreground">{`void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  
  if (info->final && info->index == 0 && info->len == len) {
    if (info->opcode == WS_TEXT) {
      data[len] = 0;
      
      // Parse JSON command
      DynamicJsonDocument doc(256);
      deserializeJson(doc, (char*)data);
      
      String action = doc["action"];
      int pin = doc["pin"];
      
      if (action == "toggle") {
        bool state = !digitalRead(pin);
        digitalWrite(pin, state);
        
        // Broadcast new state to all clients
        broadcastState(pin, state);
      }
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-primary text-sm tracking-wider mb-2">{"// Technical Deep Dive"}</p>
            <h2 className="text-3xl font-bold text-foreground">Challenges & Solutions</h2>
          </div>
          
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 glow-cyan-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <challenge.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{challenge.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-400">Problem</p>
                        <p className="text-muted-foreground">{challenge.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-400">Solution</p>
                        <p className="text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Want to Build Something Together?</h2>
          <p className="text-muted-foreground mb-8">
            I love working on IoT and embedded systems projects.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/#contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-border bg-transparent">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
