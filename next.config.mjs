/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // Security Headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            // Prevent clickjacking attacks
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Prevent MIME type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Enable XSS filtering (legacy browsers)
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Control referrer information
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Enforce HTTPS
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // Control browser features/APIs
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            // Content Security Policy - hardened but allows necessary resources
            key: "Content-Security-Policy",
            value: [
              // Default to self
              "default-src 'self'",
              // Scripts: self + inline for Next.js hydration + Vercel Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              // Styles: self + inline for styled-components/emotion/tailwind
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: self + data URIs + common image hosts
              "img-src 'self' data: blob: https:",
              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Connections: self + Vercel Analytics
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              // Media: self for music player
              "media-src 'self' blob:",
              // Frames: none (prevent embedding)
              "frame-src 'none'",
              // Frame ancestors: none (prevent being embedded)
              "frame-ancestors 'none'",
              // Form actions: self only
              "form-action 'self'",
              // Base URI: self only
              "base-uri 'self'",
              // Object/embed: none
              "object-src 'none'",
              // Upgrade insecure requests
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            // Prevent DNS prefetching leaks
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
}

export default nextConfig
