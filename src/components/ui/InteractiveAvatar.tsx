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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate direction from center to mouse
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalize and limit movement
      const maxMove = 6;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedX = distance > 0 ? (deltaX / distance) * Math.min(distance / 50, 1) * maxMove : 0;
      const normalizedY = distance > 0 ? (deltaY / distance) * Math.min(distance / 50, 1) * maxMove : 0;

      setEyePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        className="drop-shadow-[0_0_20px_rgba(0,255,245,0.15)]"
      >
        {/* Head outline */}
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="85"
          stroke="#00fff5"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />

        {/* Hair suggestion - simple lines */}
        <path
          d="M45 60 Q60 30 100 25 Q140 30 155 60"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M50 55 Q70 25 100 20 Q130 25 150 55"
          stroke="#00fff5"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />

        {/* Left eye socket */}
        <ellipse
          cx="70"
          cy="95"
          rx="18"
          ry="12"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Right eye socket */}
        <ellipse
          cx="130"
          cy="95"
          rx="18"
          ry="12"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Left pupil - follows cursor */}
        <motion.circle
          cx={70 + eyePosition.x}
          cy={95 + eyePosition.y}
          r="6"
          fill="#00fff5"
          animate={{
            cx: 70 + eyePosition.x,
            cy: 95 + eyePosition.y,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* Right pupil - follows cursor */}
        <motion.circle
          cx={130 + eyePosition.x}
          cy={95 + eyePosition.y}
          r="6"
          fill="#00fff5"
          animate={{
            cx: 130 + eyePosition.x,
            cy: 95 + eyePosition.y,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* Nose - simple line */}
        <path
          d="M100 105 L100 125 L95 130"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Mouth - subtle smile */}
        <path
          d="M80 150 Q100 160 120 150"
          stroke="#00fff5"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Glasses frames (optional tech detail) */}
        <rect
          x="48"
          y="82"
          width="44"
          height="26"
          rx="4"
          stroke="#00fff5"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <rect
          x="108"
          y="82"
          width="44"
          height="26"
          rx="4"
          stroke="#00fff5"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M92 95 L108 95"
          stroke="#00fff5"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Circuit-like detail on cheek */}
        <circle cx="155" cy="120" r="2" fill="#00fff5" opacity="0.3" />
        <path
          d="M155 122 L155 135 L165 135"
          stroke="#00fff5"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
}
