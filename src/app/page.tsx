"use client";

import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { MobileNav } from "@/components/ui/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

const navLinks = [
  { href: "#hero", label: "_home" },
  { href: "#about", label: "_about" },
  { href: "#experience", label: "_exp" },
  { href: "#skills", label: "_skills" },
  { href: "#projects", label: "_projects" },
  { href: "#contact", label: "_contact" },
];

export default function Home() {
  return (
    <>
      {/* Subtle CRT scanline overlay */}
      <ScanlineOverlay />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-text-muted/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo/Name - visible on mobile */}
          <a href="#hero" className="text-neon-cyan font-mono text-sm md:hidden">
            D_I
          </a>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center justify-center gap-6 text-sm font-mono w-full">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-text-secondary hover:text-neon-cyan transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile navigation */}
          <MobileNav />
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-14">
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
