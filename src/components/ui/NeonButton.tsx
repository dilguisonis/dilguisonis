"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "cyan" | "magenta" | "amber" | "green";
  className?: string;
}

const variants = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan/50 hover:border-neon-cyan",
    shadow: "hover:shadow-[0_0_15px_rgba(0,255,245,0.3)]",
    bg: "hover:bg-neon-cyan/10",
  },
  magenta: {
    text: "text-neon-magenta",
    border: "border-neon-magenta/50 hover:border-neon-magenta",
    shadow: "hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
    bg: "hover:bg-neon-magenta/10",
  },
  amber: {
    text: "text-neon-amber",
    border: "border-neon-amber/50 hover:border-neon-amber",
    shadow: "hover:shadow-[0_0_15px_rgba(255,176,0,0.3)]",
    bg: "hover:bg-neon-amber/10",
  },
  green: {
    text: "text-neon-green",
    border: "border-neon-green/50 hover:border-neon-green",
    shadow: "hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]",
    bg: "hover:bg-neon-green/10",
  },
};

export function NeonButton({
  children,
  href,
  onClick,
  variant = "cyan",
  className,
}: NeonButtonProps) {
  const styles = variants[variant];

  const buttonClasses = cn(
    "inline-flex items-center gap-2 px-6 py-3",
    "border font-mono text-sm",
    "transition-all duration-300",
    styles.text,
    styles.border,
    styles.shadow,
    styles.bg,
    className
  );

  const content = (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="opacity-70">[</span>
      {children}
      <span className="opacity-70">]</span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}
