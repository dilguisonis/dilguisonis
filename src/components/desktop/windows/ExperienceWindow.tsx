"use client";

import { experiences } from "@/data/experience";

export function ExperienceWindow() {
  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="text-text-muted">{">"} ls experience/</div>
      {experiences.map((exp) => (
        <div key={exp.year + exp.company} className="border border-text-muted/20 p-3">
          <div className="flex flex-wrap items-baseline gap-2 mb-2">
            <span className="text-neon-amber font-bold">[{exp.year}]</span>
            <span className="text-text-primary font-bold">{exp.company}</span>
            <span className="text-text-secondary">- {exp.role}</span>
          </div>
          <div className="space-y-1 text-text-secondary">
            {exp.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-text-muted shrink-0">
                  {i === exp.items.length - 1 ? "└──" : "├──"}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          {exp.stack && (
            <div className="mt-2 flex flex-wrap gap-1">
              {exp.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-1.5 py-0.5 bg-bg-tertiary text-neon-cyan border border-neon-cyan/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="text-neon-cyan">{">"} <span className="text-neon-green cursor-blink">_</span></div>
    </div>
  );
}
