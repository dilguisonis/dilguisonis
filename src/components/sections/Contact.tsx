"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, TerminalLine, TerminalOutput } from "@/components/ui/Terminal";

const contactInfo = [
  { label: "EMAIL", value: "dilguisonis@gmail.com", href: "mailto:dilguisonis@gmail.com" },
  { label: "GITHUB", value: "github.com/dilguisonis", href: "https://github.com/dilguisonis" },
  { label: "LINKEDIN", value: "linkedin.com/in/danilo-ariel-ilguisonis", href: "https://linkedin.com/in/danilo-ariel-ilguisonis" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 px-4 bg-bg-secondary/30" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span> CONTACT
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Contact terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Terminal title="contact">
            <TerminalLine>contact --init</TerminalLine>
            <TerminalOutput className="mt-4 space-y-2">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  <span className="text-neon-amber w-20">{contact.label}:</span>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-neon-cyan hover:underline break-all"
                  >
                    {contact.value}
                  </a>
                </motion.div>
              ))}
            </TerminalOutput>
            <TerminalOutput className="mt-6 text-text-muted">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                {`// Feel free to reach out for collaborations,
// opportunities, or just to say hello!`}
              </motion.div>
            </TerminalOutput>
            <TerminalLine className="mt-4">
              <span className="text-neon-green cursor-blink">_</span>
            </TerminalLine>
          </Terminal>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center text-text-muted text-sm"
        >
          <p>
            <span className="text-neon-cyan">&copy;</span> {new Date().getFullYear()} Danilo Ilguisonis
          </p>
          <p className="mt-1 text-xs">
            Built with Next.js, TypeScript & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
