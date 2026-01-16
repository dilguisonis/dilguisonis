"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects, Project } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const statusColors = {
    live: "text-neon-green",
    development: "text-neon-amber",
    research: "text-neon-magenta",
  };

  const statusLabels = {
    live: "LIVE",
    development: "DEV",
    research: "RESEARCH",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="terminal-box p-6 hover:border-neon-cyan/50 transition-colors group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
          {project.name}
        </h3>
        <span
          className={`text-xs font-mono ${statusColors[project.status]} opacity-80`}
        >
          [{statusLabels[project.status]}]
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-bg-tertiary text-text-muted border border-text-muted/20 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neon-cyan hover:underline flex items-center gap-1"
          >
            <span>&rarr;</span> Visit
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-secondary hover:text-neon-cyan flex items-center gap-1"
          >
            <span>&rarr;</span> GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold">
            <span className="text-neon-cyan">&gt;</span> PROJECTS
          </h2>
          <div className="h-px bg-gradient-to-r from-neon-cyan/50 to-transparent mt-2" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
