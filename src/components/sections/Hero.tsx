"use client";

import { motion } from "framer-motion";
import { InteractiveAvatar } from "@/components/ui/InteractiveAvatar";
import { Typewriter } from "@/components/ui/Typewriter";
import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";
import Particles from "@/components/reactbits/backgrounds/Particles";

export function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={150}
          particleSpread={12}
          speed={0.08}
          particleColors={['#00fff5', '#ff00ff', '#00ff41']}
          particleBaseSize={80}
          sizeRandomness={0.8}
          cameraDistance={25}
          alphaParticles={true}
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg-primary/30 to-bg-primary pointer-events-none z-[1]" />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
        {/* Avatar - smaller on mobile */}
        <InteractiveAvatar
          size={160}
          className="sm:hidden shrink-0"
        />
        <InteractiveAvatar
          size={220}
          className="hidden sm:block shrink-0"
        />

        {/* Text content */}
        <div className="text-center w-full">
          {/* Boot sequence prefix */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted text-xs sm:text-sm mb-3 sm:mb-4"
          >
            <span className="text-neon-green">[SYSTEM]</span> Initializing...
          </motion.div>

          {/* Main title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="text-neon-cyan">&gt; </span>
            <Typewriter
              text="DANILO_ILGUISONIS"
              speed={80}
              delay={500}
              onComplete={() => setShowSubtitle(true)}
              className="text-text-primary break-all sm:break-normal"
            />
          </h1>

          {/* Subtitle */}
          <div className="h-6 sm:h-8 mb-6 sm:mb-8">
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typewriter
                  text="SOFTWARE_ENGINEER // CABA"
                  speed={40}
                  onComplete={() => setShowCTA(true)}
                  className="text-text-secondary text-sm sm:text-lg md:text-xl"
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
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
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

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
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
