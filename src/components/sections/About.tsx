"use client";

import { motion } from "framer-motion";
import { Terminal, TerminalLine, TerminalOutput } from "@/components/ui/Terminal";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Terminal title="about.txt">
            <TerminalLine>cat about.txt</TerminalLine>
            <TerminalOutput className="mt-4">
              {`=====================================
PROFILE: DANILO_ILGUISONIS
=====================================`}
            </TerminalOutput>
            <TerminalOutput className="mt-4 text-text-primary">
              Software Engineer focused on AI and
              production systems.
            </TerminalOutput>
            <TerminalOutput className="mt-2">
              <span className="text-neon-amber">Education:</span>
              {`
  B.Sc. Computer Science @ UBA
  M.Sc. Computer Science @ UBA`}
            </TerminalOutput>
            <TerminalOutput className="mt-2">
              <span className="text-neon-amber">Focus:</span>
              {`
  - AI/ML Applications
  - Full-Stack Development
  - Distributed Systems
  - Blockchain Technology`}
            </TerminalOutput>
            <TerminalOutput className="mt-4">
              {`=====================================`}
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
