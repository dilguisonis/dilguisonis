"use client";

import { projects } from "@/data/projects";
import { useRef, useEffect } from "react";
import Image from "next/image";

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        src={src}
        preload="none"
        loop
        muted
        playsInline
        className="w-full aspect-video object-cover"
      />
    </div>
  );
}

export function ProjectsWindow() {
  const statusLabels: Record<string, string> = {
    live: "LIVE",
    development: "DEV",
    research: "RESEARCH",
  };
  const statusColors: Record<string, string> = {
    live: "text-neon-green",
    development: "text-neon-amber",
    research: "text-neon-magenta",
  };

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="text-text-muted">{">"} ls projects/</div>
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <div key={project.id} className="border border-text-muted/20 p-3">
            {/* Media */}
            {project.video && (
              <div className="mb-3 border border-text-muted/10 overflow-hidden">
                <LazyVideo src={project.video} />
              </div>
            )}
            {!project.video && project.image && (
              <div className="mb-3 border border-text-muted/10 overflow-hidden relative aspect-video">
                <Image src={project.image} alt={project.name} fill className="object-cover" sizes="600px" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <span className="text-text-primary font-bold">{project.name}</span>
              <span className={`text-[10px] font-mono ${statusColors[project.status]}`}>
                [{statusLabels[project.status]}]
              </span>
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-2">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-bg-tertiary text-text-muted border border-text-muted/20">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-neon-cyan hover:underline">
                  → Visit
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-text-secondary hover:text-neon-cyan">
                  → GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
