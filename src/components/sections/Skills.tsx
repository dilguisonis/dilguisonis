"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getSkillsByCategory, Skill } from "@/data/skills";

function AsciiBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const totalBars = 20;
  const filledBars = Math.round((skill.level / 100) * totalBars);
  const emptyBars = totalBars - filledBars;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className="font-mono text-sm"
    >
      <div className="flex items-center gap-4">
        <span className="text-text-primary w-24 shrink-0">{skill.name}</span>
        <span className="text-text-muted">[</span>
        <div className="flex">
          {isInView && (
            <>
              {Array(filledBars)
                .fill(null)
                .map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.02, delay: delay + i * 0.03 }}
                    className="text-neon-green"
                  >
                    █
                  </motion.span>
                ))}
              {Array(emptyBars)
                .fill(null)
                .map((_, i) => (
                  <span key={i} className="text-text-muted/30">
                    ░
                  </span>
                ))}
            </>
          )}
        </div>
        <span className="text-text-muted">]</span>
        <span className="text-text-secondary text-xs w-10 text-right">
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
}

function SkillCategory({
  title,
  skills,
  baseDelay,
}: {
  title: string;
  skills: Skill[];
  baseDelay: number;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-neon-amber font-bold text-sm uppercase tracking-wider">
        {title}:
      </h3>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <AsciiBar
            key={skill.name}
            skill={skill}
            delay={baseDelay + index * 0.05}
          />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const languages = getSkillsByCategory("languages");
  const frameworks = getSkillsByCategory("frameworks");
  const tools = getSkillsByCategory("tools");
  const areas = getSkillsByCategory("areas");

  return (
    <section id="skills" className="py-24 px-4 bg-bg-secondary/30" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span> SKILLS
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <SkillCategory title="Languages" skills={languages} baseDelay={0} />
          <SkillCategory title="Frameworks" skills={frameworks} baseDelay={0.2} />
          <SkillCategory title="Tools" skills={tools} baseDelay={0.4} />
          <SkillCategory title="Areas" skills={areas} baseDelay={0.6} />
        </div>
      </div>
    </section>
  );
}
