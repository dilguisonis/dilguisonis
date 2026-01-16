"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  variableSpeed?: boolean;
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  variableSpeed = true,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getTypingSpeed = useCallback(() => {
    if (!variableSpeed) return speed;
    // Variable speed for more natural typing feel
    const variance = speed * 0.5;
    return speed + Math.random() * variance - variance / 2;
  }, [speed, variableSpeed]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      setIsTyping(true);

      const typeChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeChar, getTypingSpeed());
        } else {
          setIsComplete(true);
          setIsTyping(false);
          onComplete?.();
        }
      };

      typeChar();
    };

    timeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, delay, onComplete, getTypingSpeed]);

  const reset = useCallback(() => {
    setDisplayedText("");
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  return {
    displayedText,
    isComplete,
    isTyping,
    reset,
  };
}
