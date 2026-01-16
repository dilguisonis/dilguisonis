"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "_home" },
  { href: "#about", label: "_about" },
  { href: "#experience", label: "_exp" },
  { href: "#skills", label: "_skills" },
  { href: "#projects", label: "_projects" },
  { href: "#contact", label: "_contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-neon-cyan block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-neon-cyan block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-neon-cyan block"
        />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-bg-primary/95 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden"
            >
              <ul className="flex flex-col items-center gap-6 py-8 bg-bg-secondary/90 border-b border-text-muted/20">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-mono text-text-secondary hover:text-neon-cyan transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
