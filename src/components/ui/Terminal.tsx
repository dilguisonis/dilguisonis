"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Terminal({ children, title, className }: TerminalProps) {
  return (
    <div className={cn("terminal-box overflow-hidden", className)}>
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-text-muted/30 bg-bg-tertiary/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-60" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-60" />
        </div>
        {title && (
          <span className="text-text-secondary text-xs ml-2">{title}</span>
        )}
      </div>
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}

interface TerminalLineProps {
  prompt?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalLine({
  prompt = ">",
  children,
  className,
}: TerminalLineProps) {
  return (
    <div className={cn("flex gap-2 items-start", className)}>
      <span className="text-neon-cyan shrink-0">{prompt}</span>
      <span className="text-text-primary">{children}</span>
    </div>
  );
}

interface TerminalOutputProps {
  children: ReactNode;
  className?: string;
}

export function TerminalOutput({ children, className }: TerminalOutputProps) {
  return (
    <div className={cn("text-text-secondary pl-4 whitespace-pre-wrap", className)}>
      {children}
    </div>
  );
}
