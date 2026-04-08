"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useWindowManager } from "./WindowManager";

const TIPS = [
  { text: "Hey! Double-click an icon to open it.", delay: 2000 },
  { text: "Try opening projects/ to see what I've built!", delay: 8000 },
  { text: "You can drag windows and icons around!", delay: 15000 },
  { text: "Check out experience/ for my work history.", delay: 22000 },
  { text: "Click me to open DI-Bot chat!", delay: 30000 },
];

const IDLE_TIPS = [
  "Need help? Click me!",
  "Try skills.sh to see my tech stack.",
  "contact.sh has my email and socials.",
  "I built this desktop OS from scratch!",
  "Open DI-Bot to chat with AI!",
];

// SVG robot character
function BotCharacter({ eyeX, eyeY }: { eyeX: number; eyeY: number }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="24" y1="2" x2="24" y2="10" stroke="#8db600" strokeWidth="2" />
      <circle cx="24" cy="2" r="2" fill="#66cc33">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Head */}
      <rect x="8" y="10" width="32" height="26" fill="#323f2b" stroke="#8db600" strokeWidth="1.5" />

      {/* Screen face */}
      <rect x="11" y="13" width="26" height="20" fill="#1a2016" stroke="#6b7a5c" strokeWidth="0.5" />

      {/* Eyes - follow cursor */}
      <g>
        {/* Left eye socket */}
        <rect x="14" y="17" width="8" height="8" fill="#2a3524" />
        {/* Left pupil */}
        <circle cx={18 + eyeX * 2} cy={21 + eyeY * 2} r="2.5" fill="#8db600">
          <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Right eye socket */}
        <rect x="26" y="17" width="8" height="8" fill="#2a3524" />
        {/* Right pupil */}
        <circle cx={30 + eyeX * 2} cy={21 + eyeY * 2} r="2.5" fill="#8db600">
          <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Mouth - smile */}
      <path d="M18 28 Q24 32 30 28" stroke="#66cc33" strokeWidth="1.5" fill="none" />

      {/* Body */}
      <rect x="12" y="36" width="24" height="10" fill="#323f2b" stroke="#8db600" strokeWidth="1" />

      {/* Chest light */}
      <rect x="21" y="39" width="6" height="4" fill="#8db600" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
      </rect>

      {/* Arms */}
      <rect x="4" y="37" width="8" height="3" fill="#323f2b" stroke="#6b7a5c" strokeWidth="0.5" />
      <rect x="36" y="37" width="8" height="3" fill="#323f2b" stroke="#6b7a5c" strokeWidth="0.5" />
    </svg>
  );
}

export function Assistant() {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [idle, setIdle] = useState(false);
  const [eyeDir, setEyeDir] = useState({ x: 0, y: 0 });
  const botRef = useRef<HTMLButtonElement>(null);
  const { windows, openWindow } = useWindowManager();

  const openCount = windows.filter(w => w.isOpen).length;

  // Eye tracking - follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxMove = 1.5;
      setEyeDir({
        x: dist > 0 ? (dx / dist) * Math.min(dist / 100, 1) * maxMove : 0,
        y: dist > 0 ? (dy / dist) * Math.min(dist / 100, 1) * maxMove : 0,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Guided tips
  useEffect(() => {
    if (dismissed) return;
    if (tipIndex >= TIPS.length) { setIdle(true); return; }
    const timer = setTimeout(() => {
      setCurrentTip(TIPS[tipIndex].text);
      setTipIndex(prev => prev + 1);
    }, TIPS[tipIndex].delay);
    return () => clearTimeout(timer);
  }, [tipIndex, dismissed]);

  // Idle tips
  useEffect(() => {
    if (!idle || dismissed) return;
    const interval = setInterval(() => {
      setCurrentTip(IDLE_TIPS[Math.floor(Math.random() * IDLE_TIPS.length)]);
    }, 20000);
    return () => clearInterval(interval);
  }, [idle, dismissed]);

  // Context tips
  useEffect(() => {
    if (dismissed) return;
    if (openCount === 0 && tipIndex > 2) {
      setCurrentTip("All windows closed! Double-click an icon to explore.");
    }
  }, [openCount, dismissed, tipIndex]);

  const hideBubble = useCallback(() => setCurrentTip(null), []);

  return (
    <div className="fixed bottom-12 right-4 z-[9998] flex flex-col items-end gap-2">
      {/* Speech bubble */}
      <AnimatePresence>
        {currentTip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="glass max-w-[220px] p-3 text-xs font-mono text-text-primary relative"
          >
            <button
              onClick={hideBubble}
              className="absolute top-1 right-1 text-text-muted hover:text-text-primary text-[10px]"
            >
              ✕
            </button>
            <p className="pr-4">{currentTip}</p>
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 rotate-45 bg-bg-tertiary/70 border-r border-b border-neon-cyan/15" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot character */}
      <motion.button
        ref={botRef}
        onClick={() => {
          if (dismissed) {
            setDismissed(false);
            setCurrentTip("Click me again to open DI-Bot chat!");
          } else {
            openWindow("chat");
          }
        }}
        className="cursor-pointer select-none hover:drop-shadow-[0_0_8px_rgba(141,182,0,0.3)] transition-all"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        title="Open DI-Bot"
      >
        <BotCharacter eyeX={eyeDir.x} eyeY={eyeDir.y} />
      </motion.button>
    </div>
  );
}
