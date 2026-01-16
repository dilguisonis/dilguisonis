"use client";

import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Subtle CRT scanline overlay */}
      <ScanlineOverlay />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-text-muted/10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <ul className="flex items-center justify-center gap-6 text-sm font-mono">
            <li>
              <a
                href="#hero"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _about
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _experience
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-text-secondary hover:text-neon-cyan transition-colors"
              >
                _contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-12">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
