# Sovandara Rith | Portfolio

A modern, interactive portfolio application built with **Next.js 16** and **React 19**. This project showcases my work as a Computer Science student and Web & Mobile Developer, featuring a highly polished UI, internationalization support, and advanced interactive elements.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (via [shadcn/ui](https://ui.shadcn.com/))
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code) & [Kantumruy Pro](https://fonts.google.com/specimen/Kantumruy+Pro) (Khmer support)
- **Computer Vision:** [Google MediaPipe](https://developers.google.com/mediapipe) (Hand Detection)

## ✨ Key Features

- **🌐 Internationalization (i18n):** Native support for **English** and **Khmer** languages, managed via a custom React Context provider.
- **🎨 Dark/Light Mode:** Seamless theme switching powered by `next-themes`.
- **🎵 Persistent Audio:** Integrated background music player with global state management.
- **💻 Interactive Terminal:** An animated, developer-centric terminal component in the hero section.
- **🖐️ Performative Detector:** A showcase project integrating **MediaPipe** for real-time hand gesture detection directly in the browser.
- **📊 Analytics:** Integrated with Vercel Analytics for privacy-friendly visitor tracking.

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (Preferred package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sovandara-portfolio-design
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages and layouts
│   ├── projects/         # Case study pages (e.g., fitness-app, performative_detector)
│   ├── layout.tsx        # Root layout with global providers
│   └── page.tsx          # Main landing page
├── components/           # React components
│   ├── ui/               # Reusable atomic UI components (shadcn/ui)
│   └── *-section.tsx     # Feature-specific layout sections
├── hooks/                # Custom React hooks (use-toast, use-mobile, etc.)
├── lib/                  # Utility functions and Context providers
│   ├── language-context.tsx # i18n logic
│   └── music-context.tsx    # Audio player logic
└── public/               # Static assets (images, fonts, music)
```

## 📜 Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Runs the built production application.
- `pnpm lint`: Runs ESLint to check for code quality issues.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
