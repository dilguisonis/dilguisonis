"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
  const onCompleteRef = useRef(onComplete);
  const hasStartedRef = useRef(false);

  // Keep onComplete ref updated
  onCompleteRef.current = onComplete;

  const getTypingSpeed = useCallback(() => {
    if (!variableSpeed) return speed;
    // Variable speed for more natural typing feel
    const variance = speed * 0.5;
    return speed + Math.random() * variance - variance / 2;
  }, [speed, variableSpeed]);

  useEffect(() => {
    // Prevent re-running if already started
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

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
          onCompleteRef.current?.();
        }
      };

      typeChar();
    };

    timeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, delay, getTypingSpeed]);

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
