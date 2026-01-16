"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/experience";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 sm:py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span> EXPERIENCE
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year + exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 sm:pl-8 border-l border-text-muted/30"
            >
              {/* Year marker */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,245,0.5)]" />

              {/* Content */}
              <div className="terminal-box p-3 sm:p-4">
                <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2">
                  <span className="text-neon-amber font-bold text-sm sm:text-base">[{exp.year}]</span>
                  <span className="text-text-primary font-bold text-sm sm:text-base">{exp.company}</span>
                  <span className="text-text-secondary text-xs sm:text-sm">- {exp.role}</span>
                </div>

                {/* Items */}
                <div className="space-y-1 text-xs sm:text-sm">
                  {exp.items.map((item, i) => (
                    <div key={i} className="flex gap-2 text-text-secondary">
                      <span className="text-text-muted shrink-0">
                        {i === exp.items.length - 1 ? "└──" : "├──"}
                      </span>
                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                {exp.stack && (
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-bg-tertiary text-neon-cyan border border-neon-cyan/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
