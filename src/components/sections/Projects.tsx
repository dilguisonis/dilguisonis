"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { projects, Project } from "@/data/projects";
import DecryptedText from "@/components/reactbits/text/DecryptedText";
import ShinyText from "@/components/reactbits/text/ShinyText";
import Image from "next/image";

function VideoWithImageFallback({ video, image, name }: { video: string; image: string; name: string }) {
  const [showImage, setShowImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = useCallback(() => {
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 3000);
  }, []);

  return (
    <div className="relative aspect-video w-full">
      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showImage ? "opacity-0" : "opacity-100"}`}
      />
      <div className={`absolute inset-0 transition-opacity duration-500 ${showImage ? "opacity-100" : "opacity-0"}`}>
        <Image
          src={image}
          alt={`${name} preview`}
          fill
          className={`object-cover ${showImage ? "animate-zoom-in" : ""}`}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

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

  const mediaWrapper = project.video && project.image ? (
    <div className="relative mb-4 overflow-hidden rounded border border-text-muted/20 group-hover:border-neon-cyan/30 transition-all">
      <VideoWithImageFallback video={project.video} image={project.image} name={project.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,245,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,255,245,0.15)] transition-shadow duration-300 pointer-events-none" />
    </div>
  ) : project.video ? (
    <div className="relative mb-4 overflow-hidden rounded border border-text-muted/20 group-hover:border-neon-cyan/30 transition-all">
      <video
        src={project.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full aspect-video object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,245,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,255,245,0.15)] transition-shadow duration-300 pointer-events-none" />
    </div>
  ) : project.image ? (
    <div className="relative mb-4 overflow-hidden rounded border border-text-muted/20 group-hover:border-neon-cyan/30 transition-all">
      <div className="relative aspect-video w-full">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,245,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,255,245,0.15)] transition-shadow duration-300" />
    </div>
  ) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="terminal-box p-4 sm:p-6 hover:border-neon-cyan/50 transition-colors group flex flex-col h-full"
    >
      {/* Thumbnail Media - clickable if link exists */}
      {(project.video || project.image) && project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          {mediaWrapper}
        </a>
      ) : (
        mediaWrapper
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-bold text-text-primary">
          <ShinyText
            text={project.name}
            speed={3}
            color="#e0e0e0"
            shineColor="#00fff5"
            className="group-hover:text-neon-cyan transition-colors"
          />
        </h3>
        <span
          className={`text-[10px] sm:text-xs font-mono ${statusColors[project.status]} opacity-80 shrink-0`}
        >
          [{statusLabels[project.status]}]
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
        {project.description}
      </p>

      {/* Spacer to push tags and links to bottom */}
      <div className="flex-grow" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-bg-tertiary text-text-muted border border-text-muted/20 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-auto">
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
    <section id="projects" className="py-16 sm:py-24 px-4" ref={ref}>
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
              text="PROJECTS"
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

        {/* Projects grid - single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
