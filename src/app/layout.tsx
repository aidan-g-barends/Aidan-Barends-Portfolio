import type { Metadata } from "next";
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
import { projects } from "../data/projects";
import { SITE_URL } from "../lib/site";

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

      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>

        <Navbar />

        <main
          id="main-content"
          className="flex-1"
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </main>

        <Footer />

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