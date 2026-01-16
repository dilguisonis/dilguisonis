"use client";

import { motion } from "framer-motion";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import { Typewriter } from "@/components/ui/Typewriter";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";

export function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-bg-secondary/50 via-bg-primary to-bg-primary pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-5xl mx-auto">
        {/* Avatar */}
        <InteractiveAvatar size={220} className="shrink-0" />

        {/* Text content */}
        <div className="text-center lg:text-left">
          {/* Boot sequence prefix */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted text-sm mb-4"
          >
            <span className="text-neon-green">[SYSTEM]</span> Initializing...
          </motion.div>

          {/* Main title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-neon-cyan">&gt; </span>
            <Typewriter
              text="DANILO_ILGUISONIS"
              speed={80}
              delay={500}
              onComplete={() => setShowSubtitle(true)}
              className="text-text-primary"
            />
          </h1>

          {/* Subtitle */}
          <div className="h-8 mb-8">
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typewriter
                  text="SOFTWARE_ENGINEER // BUENOS_AIRES"
                  speed={40}
                  onComplete={() => setShowCTA(true)}
                  className="text-text-secondary text-lg sm:text-xl"
                />
              </motion.div>
            )}
          </div>

          {/* CTA Buttons */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <NeonButton href="#about" variant="cyan">
                EXPLORE
              </NeonButton>
              <NeonButton href="#contact" variant="magenta">
                CONTACT
              </NeonButton>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-text-muted text-sm flex flex-col items-center gap-2"
        >
          <span className="text-xs">scroll</span>
          <span>&#8595;</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
