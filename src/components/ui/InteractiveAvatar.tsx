"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface InteractiveAvatarProps {
  size?: number;
  className?: string;
}

export function InteractiveAvatar({
  size = 200,
  className,
}: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxMove = 6;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedX = distance > 0 ? (deltaX / distance) * Math.min(distance / 50, 1) * maxMove : 0;
      const normalizedY = distance > 0 ? (deltaY / distance) * Math.min(distance / 50, 1) * maxMove : 0;

      setEyePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_40px_rgba(0,255,245,0.3)]"
      >
        {/* Definitions for effects */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00fff5" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00fff5" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#00fff5" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00fff5" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.3"/>
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00fff5" stopOpacity="1"/>
            <stop offset="70%" stopColor="#00fff5" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#00fff5" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Animated background hex grid */}
        <g opacity="0.08">
          {[...Array(6)].map((_, i) => (
            <motion.polygon
              key={`hex-${i}`}
              points="100,10 130,25 130,55 100,70 70,55 70,25"
              stroke="#00fff5"
              strokeWidth="0.5"
              fill="none"
              style={{
                transform: `translate(${(i % 3) * 40 - 40}px, ${Math.floor(i / 3) * 50 + 120}px) scale(0.4)`,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </g>

        {/* Complex background circuit patterns */}
        <g opacity="0.2">
          {/* Left side circuits */}
          <motion.circle cx="20" cy="40" r="2.5" fill="#00fff5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <path d="M20 42.5 L20 65 L10 65 L10 90 L25 90" stroke="#00fff5" strokeWidth="0.7"/>
          <circle cx="25" cy="90" r="1.5" fill="#00fff5"/>
          <path d="M25 91.5 L25 110 L15 110" stroke="#00fff5" strokeWidth="0.5"/>

          <motion.circle cx="15" cy="140" r="2" fill="#00fff5"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
          />
          <path d="M15 142 L15 160 L25 160 L25 175" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Right side circuits */}
          <motion.circle cx="180" cy="45" r="2.5" fill="#00fff5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          <path d="M180 47.5 L180 70 L190 70 L190 95 L175 95" stroke="#00fff5" strokeWidth="0.7"/>
          <circle cx="175" cy="95" r="1.5" fill="#00fff5"/>

          <motion.circle cx="185" cy="135" r="2" fill="#00fff5"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, delay: 1.5, repeat: Infinity }}
          />
          <path d="M185 137 L185 155 L175 155 L175 170" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Bottom circuits */}
          <path d="M50 185 L80 185 L80 190" stroke="#00fff5" strokeWidth="0.5"/>
          <circle cx="80" cy="192" r="1" fill="#00fff5"/>
          <path d="M120 185 L150 185 L150 190" stroke="#00fff5" strokeWidth="0.5"/>
          <circle cx="150" cy="192" r="1" fill="#00fff5"/>
        </g>

        {/* Multiple outer glow rings */}
        <motion.ellipse
          cx="100"
          cy="100"
          rx="95"
          ry="98"
          stroke="url(#circuitGradient)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="5 10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        <ellipse
          cx="100"
          cy="100"
          rx="88"
          ry="96"
          stroke="#00fff5"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="80"
          ry="92"
          stroke="#00fff5"
          strokeWidth="0.3"
          fill="none"
          opacity="0.1"
        />

        {/* Head outline with stronger glow */}
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="85"
          stroke="#00fff5"
          strokeWidth="2.5"
          fill="none"
          opacity="0.9"
          filter="url(#glow)"
        />

        {/* Detailed hair structure */}
        <g filter="url(#softGlow)">
          {/* Main hair shape */}
          <path
            d="M35 70 Q45 25 75 15 Q100 8 125 15 Q155 25 165 70"
            stroke="url(#hairGradient)"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Hair volume - multiple layers */}
          <path d="M40 65 Q50 30 80 20 Q100 15 120 20 Q150 30 160 65" stroke="#00fff5" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M45 58 Q55 28 85 22" stroke="#00fff5" strokeWidth="1.2" fill="none" opacity="0.5"/>
          <path d="M50 52 Q65 22 95 18" stroke="#00fff5" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M55 48 Q75 20 100 16" stroke="#00fff5" strokeWidth="0.8" fill="none" opacity="0.35"/>
          <path d="M60 45 Q80 22 105 19" stroke="#00fff5" strokeWidth="0.6" fill="none" opacity="0.3"/>

          <path d="M100 12 Q115 14 130 20" stroke="#00fff5" strokeWidth="1.2" fill="none" opacity="0.5"/>
          <path d="M105 16 Q125 20 145 40" stroke="#00fff5" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M110 18 Q135 26 150 48" stroke="#00fff5" strokeWidth="0.8" fill="none" opacity="0.35"/>
          <path d="M115 20 Q140 30 155 52" stroke="#00fff5" strokeWidth="0.6" fill="none" opacity="0.3"/>

          {/* Side hair strands */}
          <path d="M32 80 Q28 60 35 40 Q40 30 50 25" stroke="#00fff5" strokeWidth="0.8" fill="none" opacity="0.35"/>
          <path d="M35 85 Q30 65 38 45" stroke="#00fff5" strokeWidth="0.6" fill="none" opacity="0.25"/>
          <path d="M168 80 Q172 60 165 40 Q160 30 150 25" stroke="#00fff5" strokeWidth="0.8" fill="none" opacity="0.35"/>
          <path d="M165 85 Q170 65 162 45" stroke="#00fff5" strokeWidth="0.6" fill="none" opacity="0.25"/>

          {/* Top spiky details */}
          <path d="M85 15 L82 5 L88 12" stroke="#00fff5" strokeWidth="0.5" fill="none" opacity="0.4"/>
          <path d="M100 10 L100 2 L103 8" stroke="#00fff5" strokeWidth="0.5" fill="none" opacity="0.5"/>
          <path d="M115 15 L118 5 L112 12" stroke="#00fff5" strokeWidth="0.5" fill="none" opacity="0.4"/>
        </g>

        {/* Animated eyebrows with subtle expressions */}
        <motion.path
          d="M52 76 Q62 70 82 76"
          stroke="#00fff5"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          filter="url(#softGlow)"
          animate={{ d: isBlinking ? "M52 79 Q62 77 82 79" : "M52 76 Q62 70 82 76" }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          d="M118 76 Q138 70 148 76"
          stroke="#00fff5"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          filter="url(#softGlow)"
          animate={{ d: isBlinking ? "M118 79 Q138 77 148 79" : "M118 76 Q138 70 148 76" }}
          transition={{ duration: 0.1 }}
        />

        {/* Glasses with tech HUD elements */}
        <g opacity="0.5">
          {/* Left lens */}
          <rect
            x="46"
            y="80"
            width="48"
            height="30"
            rx="4"
            stroke="#00fff5"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Left lens inner detail */}
          <rect x="50" y="84" width="40" height="22" rx="2" stroke="#00fff5" strokeWidth="0.3" fill="none" opacity="0.4"/>
          {/* Left HUD elements */}
          <line x1="50" y1="102" x2="58" y2="102" stroke="#00fff5" strokeWidth="0.5" opacity="0.6"/>
          <text x="60" y="103" fill="#00fff5" fontSize="4" opacity="0.5" fontFamily="monospace">100%</text>

          {/* Right lens */}
          <rect
            x="106"
            y="80"
            width="48"
            height="30"
            rx="4"
            stroke="#00fff5"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Right lens inner detail */}
          <rect x="110" y="84" width="40" height="22" rx="2" stroke="#00fff5" strokeWidth="0.3" fill="none" opacity="0.4"/>
          {/* Right HUD elements */}
          <line x1="142" y1="102" x2="150" y2="102" stroke="#00fff5" strokeWidth="0.5" opacity="0.6"/>
          <motion.circle cx="145" cy="86" r="1.5" fill="#00fff5" opacity="0.6"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Bridge */}
          <path d="M94 95 L106 95" stroke="#00fff5" strokeWidth="2"/>
          {/* Temple arms */}
          <path d="M46 90 L30 82 L28 80" stroke="#00fff5" strokeWidth="1.2" opacity="0.7"/>
          <path d="M154 90 L170 82 L172 80" stroke="#00fff5" strokeWidth="1.2" opacity="0.7"/>
        </g>

        {/* Eye sockets with glow */}
        <ellipse
          cx="70"
          cy="95"
          rx="20"
          ry="14"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <ellipse
          cx="130"
          cy="95"
          rx="20"
          ry="14"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Eyes with enhanced blinking */}
        <motion.g
          animate={{ scaleY: isBlinking ? 0.05 : 1 }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
          transition={{ duration: 0.08 }}
        >
          {/* Left eye glow */}
          <motion.ellipse
            cx={70 + eyePosition.x}
            cy={95 + eyePosition.y}
            rx="12"
            ry="10"
            fill="url(#eyeGlow)"
            opacity="0.3"
            animate={{
              cx: 70 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Left pupil */}
          <motion.circle
            cx={70 + eyePosition.x}
            cy={95 + eyePosition.y}
            r="7"
            fill="#00fff5"
            filter="url(#strongGlow)"
            animate={{
              cx: 70 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Left pupil inner */}
          <motion.circle
            cx={70 + eyePosition.x}
            cy={95 + eyePosition.y}
            r="3"
            fill="#0a0a0f"
            animate={{
              cx: 70 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Left eye highlight */}
          <motion.circle
            cx={66 + eyePosition.x}
            cy={92 + eyePosition.y}
            r="2.5"
            fill="white"
            opacity="0.8"
            animate={{
              cx: 66 + eyePosition.x,
              cy: 92 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* Right eye glow */}
          <motion.ellipse
            cx={130 + eyePosition.x}
            cy={95 + eyePosition.y}
            rx="12"
            ry="10"
            fill="url(#eyeGlow)"
            opacity="0.3"
            animate={{
              cx: 130 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Right pupil */}
          <motion.circle
            cx={130 + eyePosition.x}
            cy={95 + eyePosition.y}
            r="7"
            fill="#00fff5"
            filter="url(#strongGlow)"
            animate={{
              cx: 130 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Right pupil inner */}
          <motion.circle
            cx={130 + eyePosition.x}
            cy={95 + eyePosition.y}
            r="3"
            fill="#0a0a0f"
            animate={{
              cx: 130 + eyePosition.x,
              cy: 95 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Right eye highlight */}
          <motion.circle
            cx={126 + eyePosition.x}
            cy={92 + eyePosition.y}
            r="2.5"
            fill="white"
            opacity="0.8"
            animate={{
              cx: 126 + eyePosition.x,
              cy: 92 + eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.g>

        {/* Enhanced nose */}
        <path
          d="M100 108 L100 128 L92 136"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
          filter="url(#softGlow)"
        />
        <path
          d="M92 136 Q100 140 108 136"
          stroke="#00fff5"
          strokeWidth="1"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M100 128 L108 136"
          stroke="#00fff5"
          strokeWidth="0.5"
          fill="none"
          opacity="0.25"
        />

        {/* Enhanced mouth with subtle expression */}
        <path
          d="M78 155 Q100 168 122 155"
          stroke="#00fff5"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
          filter="url(#glow)"
        />
        {/* Teeth hint line */}
        <path
          d="M85 156 L115 156"
          stroke="#00fff5"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
        {/* Lower lip hint */}
        <path
          d="M82 160 Q100 165 118 160"
          stroke="#00fff5"
          strokeWidth="0.8"
          fill="none"
          opacity="0.25"
        />

        {/* Face circuit implants - cyberpunk */}
        <g opacity="0.5">
          {/* Left cheek circuit board */}
          <motion.circle cx="42" cy="115" r="3" fill="#00fff5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <path d="M42 118 L42 138 L32 138 L32 150" stroke="#00fff5" strokeWidth="1"/>
          <circle cx="32" cy="152" r="2" fill="#00fff5" opacity="0.7"/>
          <path d="M34 152 L45 152" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Left temple circuit */}
          <circle cx="38" cy="75" r="1.5" fill="#00fff5" opacity="0.6"/>
          <path d="M38 76.5 L38 85 L42 85" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Right cheek circuit board */}
          <motion.circle cx="158" cy="115" r="3" fill="#00fff5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
          <path d="M158 118 L158 135 L168 135 L168 148 L160 148" stroke="#00fff5" strokeWidth="1"/>
          <circle cx="158" cy="148" r="2" fill="#00fff5" opacity="0.7"/>
          <path d="M156 148 L145 148" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Right temple circuit */}
          <circle cx="162" cy="75" r="1.5" fill="#00fff5" opacity="0.6"/>
          <path d="M162 76.5 L162 85 L158 85" stroke="#00fff5" strokeWidth="0.5"/>

          {/* Forehead implant */}
          <motion.circle cx="100" cy="42" r="2.5" fill="#00fff5"
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <path d="M100 44.5 L100 58" stroke="#00fff5" strokeWidth="0.8"/>
          <path d="M97.5 42 L85 42 L85 50" stroke="#00fff5" strokeWidth="0.5"/>
          <path d="M102.5 42 L115 42 L115 50" stroke="#00fff5" strokeWidth="0.5"/>
          <circle cx="85" cy="52" r="1" fill="#00fff5" opacity="0.5"/>
          <circle cx="115" cy="52" r="1" fill="#00fff5" opacity="0.5"/>

          {/* Chin circuit */}
          <circle cx="100" cy="175" r="1.5" fill="#00fff5" opacity="0.5"/>
          <path d="M98.5 175 L85 175 L85 180" stroke="#00fff5" strokeWidth="0.4"/>
          <path d="M101.5 175 L115 175 L115 180" stroke="#00fff5" strokeWidth="0.4"/>
        </g>

        {/* Data stream particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={20 + i * 8}
            cy={190}
            r="1"
            fill="#00fff5"
            opacity="0.6"
            animate={{
              cy: [190, 10, 190],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`particle-r-${i}`}
            cx={140 + i * 8}
            cy={10}
            r="1"
            fill="#00fff5"
            opacity="0.6"
            animate={{
              cy: [10, 190, 10],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.8 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Status indicators */}
        <motion.circle
          cx="165"
          cy="55"
          r="4"
          fill="#00fff5"
          opacity="0.8"
          filter="url(#strongGlow)"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="35"
          cy="55"
          r="3"
          fill="#ff00ff"
          opacity="0.6"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
