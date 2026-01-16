"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className,
  cursorClassName,
  showCursor = true,
  onComplete,
}: TypewriterProps) {
  const { displayedText, isComplete, isTyping } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
  });

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {showCursor && (
        <span
          className={cn(
            "inline-block w-[0.5em] h-[1.1em] ml-[2px] align-middle bg-neon-cyan",
            isComplete && !isTyping && "cursor-blink",
            cursorClassName
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
