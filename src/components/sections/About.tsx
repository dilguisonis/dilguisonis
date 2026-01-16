"use client";

import { motion } from "framer-motion";
import { Terminal, TerminalLine, TerminalOutput } from "@/components/ui/Terminal";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Terminal title="about.txt" className="text-xs sm:text-sm">
            <TerminalLine>cat about.txt</TerminalLine>
            <TerminalOutput className="mt-4 text-[10px] sm:text-sm">
              {`================================
PROFILE: DANILO_ILGUISONIS
================================`}
            </TerminalOutput>
            <TerminalOutput className="mt-4 text-text-primary text-xs sm:text-sm">
              Software Engineer focused on AI
              and production systems.
            </TerminalOutput>
            <TerminalOutput className="mt-2 text-xs sm:text-sm">
              <span className="text-neon-amber">Education:</span>
              {`
  B.Sc. Computer Science @ UBA
  M.Sc. Computer Science @ UBA`}
            </TerminalOutput>
            <TerminalOutput className="mt-2 text-xs sm:text-sm">
              <span className="text-neon-amber">Focus:</span>
              {`
  - AI/ML Applications
  - Full-Stack Development
  - Distributed Systems
  - Blockchain Technology`}
            </TerminalOutput>
            <TerminalOutput className="mt-4 text-[10px] sm:text-sm">
              {`================================`}
            </TerminalOutput>
            <TerminalLine className="mt-4">
              <span className="text-neon-green cursor-blink">_</span>
            </TerminalLine>
          </Terminal>
        </motion.div>
      </div>
    </section>
  );
}
