'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 32, animated = true, className = '' }: LogoProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <rect width="32" height="32" rx="4" fill="var(--bg-primary, #0a0a0f)" />

      {/* Circuit lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: animated ? [0.3, 0.6, 0.3] : 0.3 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M4 8h4M4 24h4M28 8h-4M28 24h-4" stroke="var(--neon-cyan, #00fff5)" strokeWidth="0.5" />
        <circle cx="4" cy="8" r="1" fill="var(--neon-cyan, #00fff5)" opacity="0.5" />
        <circle cx="4" cy="24" r="1" fill="var(--neon-magenta, #ff00ff)" opacity="0.5" />
        <circle cx="28" cy="8" r="1" fill="var(--neon-magenta, #ff00ff)" opacity="0.5" />
        <circle cx="28" cy="24" r="1" fill="var(--neon-cyan, #00fff5)" opacity="0.5" />
      </motion.g>

      {/* D letter */}
      <motion.path
        d="M8 8h4c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6H8V8z"
        stroke="var(--neon-cyan, #00fff5)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, strokeOpacity: animated ? [1, 0.7, 1] : 1 }}
        transition={{
          pathLength: { duration: 1, ease: 'easeInOut' },
          strokeOpacity: { duration: 2, repeat: Infinity }
        }}
      />

      {/* Tech cut on D */}
      <path d="M14 8l4 4" stroke="var(--bg-primary, #0a0a0f)" strokeWidth="3" />

      {/* I letter */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.path
          d="M22 8v16"
          stroke="var(--neon-magenta, #ff00ff)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ strokeOpacity: animated ? [1, 0.6, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <path
          d="M20 8h4M20 24h4"
          stroke="var(--neon-magenta, #ff00ff)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Glow effects */}
      <g opacity="0.3" transform="translate(0.5, 0.5)">
        <path
          d="M8 8h4c3.3 0 6 2.7 6 6v4c0 3.3-2.7 6-6 6H8V8z"
          stroke="var(--neon-cyan, #00fff5)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M22 8v16"
          stroke="var(--neon-magenta, #ff00ff)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </motion.svg>
  );
}

export default Logo;
