import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MotionProvider from "../components/MotionProvider";
import CommandPalette from "../components/CommandPalette";
import MobileTabBar from "../components/MobileTabBar";
import { projects } from "../data/projects";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SITE_URL, WHATSAPP_URL } from "../lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// "cover" lets the mobile tab bar sit behind the iPhone home indicator
// (it pads itself with the safe-area inset). Zoom stays enabled.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF1F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aidan Barends | Software Engineer & Aspiring AI Engineer",
  description:
    "Portfolio of Aidan Barends, a Software Engineering student at CPUT and freelance web developer building full stack web applications and AI-powered tools.",
  openGraph: {
    title: "Aidan Barends | Software Engineer & Aspiring AI Engineer",
    description:
      "Portfolio of Aidan Barends, a Software Engineering student at CPUT and freelance web developer building full stack web applications and AI-powered tools.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aidan Barends | Software Engineer & Aspiring AI Engineer",
    description:
      "Portfolio of Aidan Barends, a Software Engineering student at CPUT and freelance web developer building full stack web applications and AI-powered tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      // The theme script below adds the "dark" class before hydration
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>

      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>

        <Navbar />

        <main
          id="main-content"
          // Content that slides in from the side (scroll reveals) must never
          // widen the page on phones; clip keeps it from creating a scrollbar
          className="flex-1 overflow-x-clip"
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </main>

        <Footer />

        <div
          aria-hidden="true"
          className="scroll-progress"
        />

        <a
          href="#main-content"
          aria-label="Back to top"
          className="back-to-top fixed bottom-24 right-6 z-40 h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-surface/80 text-foreground-muted shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Aidan on WhatsApp"
          className="whatsapp-float group fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-emerald-700 text-white sm:bottom-6 sm:right-6 sm:h-14 sm:w-auto sm:px-4 shadow-[0_10px_30px_-8px_rgba(5,150,105,0.7)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800"
        >
          <MessageCircle size={22} aria-hidden="true" />

          <span className="hidden text-sm font-semibold sm:inline">
            WhatsApp
          </span>
        </a>

        <MobileTabBar />

        <CommandPalette
          projects={projects.map(({ slug, name, tech }) => ({
            slug,
            name,
            tech,
          }))}
        />

        <Analytics />
      </body>
    </html>
  );
}