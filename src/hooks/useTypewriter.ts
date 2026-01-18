"use client";

import { useState, useEffect, useRef } from "react";

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

  // Use refs to avoid re-triggering effects
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Reset if text changes
    completedRef.current = false;
    setDisplayedText("");
    setIsComplete(false);

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    let isCancelled = false;

    const getSpeed = () => {
      if (!variableSpeed) return speed;
      const variance = speed * 0.5;
      return speed + Math.random() * variance - variance / 2;
    };

    const typeNextChar = () => {
      if (isCancelled || completedRef.current) return;

      if (currentIndex < text.length) {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
        setIsTyping(true);
        timeoutId = setTimeout(typeNextChar, getSpeed());
      } else {
        setIsTyping(false);
        setIsComplete(true);
        completedRef.current = true;
        onCompleteRef.current?.();
      }
    };

    // Start after delay
    timeoutId = setTimeout(typeNextChar, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, variableSpeed]);

  const reset = () => {
    completedRef.current = false;
    setDisplayedText("");
    setIsComplete(false);
    setIsTyping(false);
  };

  return {
    displayedText,
    isComplete,
    isTyping,
    reset,
  };
}
