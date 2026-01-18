"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories, SkillCategory } from "@/data/skills";
import DecryptedText from "@/components/reactbits/text/DecryptedText";

function SkillTag({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="inline-block px-3 py-1.5 text-xs sm:text-sm font-mono
                 border border-neon-cyan/40 text-text-primary
                 bg-bg-primary/50 hover:bg-neon-cyan/10 hover:border-neon-cyan/60
                 transition-colors duration-200 cursor-default"
    >
      {skill}
    </motion.span>
  );
}

function SkillCategorySection({
  category,
  baseDelay,
}: {
  category: SkillCategory;
  baseDelay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: baseDelay }}
      className="space-y-3"
    >
      <h3 className="text-neon-amber font-bold text-xs sm:text-sm uppercase tracking-wider font-mono">
        {">"} {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {isInView &&
          category.skills.map((skill, index) => (
            <SkillTag
              key={skill}
              skill={skill}
              delay={baseDelay + 0.1 + index * 0.05}
            />
          ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 bg-bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span>{" "}
            <DecryptedText
              text="SKILLS"
              speed={40}
              maxIterations={15}
              animateOn="view"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789"
              className="text-text-primary"
              encryptedClassName="text-neon-cyan"
            />
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategorySection
              key={category.id}
              category={category}
              baseDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
