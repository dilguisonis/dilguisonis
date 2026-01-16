"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/experience";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span> EXPERIENCE
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year + exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l border-text-muted/30"
            >
              {/* Year marker */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,245,0.5)]" />

              {/* Content */}
              <div className="terminal-box p-4">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="text-neon-amber font-bold">[{exp.year}]</span>
                  <span className="text-text-primary font-bold">{exp.company}</span>
                  <span className="text-text-secondary">- {exp.role}</span>
                </div>

                {/* Items */}
                <div className="space-y-1 text-sm">
                  {exp.items.map((item, i) => (
                    <div key={i} className="flex gap-2 text-text-secondary">
                      <span className="text-text-muted shrink-0">
                        {i === exp.items.length - 1 ? "└──" : "├──"}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                {exp.stack && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-bg-tertiary text-neon-cyan border border-neon-cyan/20 rounded"
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
