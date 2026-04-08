"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useWindowManager } from "./WindowManager";

const TIPS = [
  "Double-click an icon to open it!",
  "Try opening projects/ to see what I've built!",
  "You can drag windows and icons around!",
  "Check out experience/ for my work history.",
  "Open DI-Bot to chat with me!",
  "Danilo built Ammegtech, an AI virtual try-on SaaS.",
  "Wombi is a UGC creator-brand marketplace.",
  "AlgoLeads automates Instagram DMs with ML.",
  "Danilo knows Next.js, TypeScript, Python, Rust & more.",
  "Click skills.sh to see the full tech stack.",
  "contact.sh has Danilo's email and socials.",
  "Danilo studies Computer Science at UBA.",
  "This whole desktop OS was built from scratch!",
  "Drag me around! I'll follow you.",
];

function BotCharacter({ eyeX, eyeY }: { eyeX: number; eyeY: number }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="2" x2="24" y2="10" stroke="#8db600" strokeWidth="2" />
      <circle cx="24" cy="2" r="2" fill="#66cc33">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="8" y="10" width="32" height="26" fill="#323f2b" stroke="#8db600" strokeWidth="1.5" />
      <rect x="11" y="13" width="26" height="20" fill="#1a2016" stroke="#6b7a5c" strokeWidth="0.5" />
      <g>
        <rect x="14" y="17" width="8" height="8" fill="#2a3524" />
        <circle cx={18 + eyeX * 2} cy={21 + eyeY * 2} r="2.5" fill="#8db600">
          <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <rect x="26" y="17" width="8" height="8" fill="#2a3524" />
        <circle cx={30 + eyeX * 2} cy={21 + eyeY * 2} r="2.5" fill="#8db600">
          <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      <path d="M18 28 Q24 32 30 28" stroke="#66cc33" strokeWidth="1.5" fill="none" />
      <rect x="12" y="36" width="24" height="10" fill="#323f2b" stroke="#8db600" strokeWidth="1" />
      <rect x="21" y="39" width="6" height="4" fill="#8db600" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <rect x="4" y="37" width="8" height="3" fill="#323f2b" stroke="#6b7a5c" strokeWidth="0.5" />
      <rect x="36" y="37" width="8" height="3" fill="#323f2b" stroke="#6b7a5c" strokeWidth="0.5" />
    </svg>
  );
}

export function Assistant() {
  const [currentTip, setCurrentTip] = useState<string>(TIPS[0]);
  const [eyeDir, setEyeDir] = useState({ x: 0, y: 0 });
  const [botPos, setBotPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);
  const botRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowManager();

  // Follow cursor with smooth lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX + 30,
        y: e.clientY - 60,
      };

      // Eye direction
      if (botRef.current) {
        const rect = botRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setEyeDir({
          x: dist > 0 ? (dx / dist) * Math.min(dist / 100, 1) * 1.5 : 0,
          y: dist > 0 ? (dy / dist) * Math.min(dist / 100, 1) * 1.5 : 0,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth position lerp
  useEffect(() => {
    const startX = typeof window !== "undefined" ? window.innerWidth - 100 : 0;
    const startY = typeof window !== "undefined" ? window.innerHeight - 150 : 0;
    setBotPos({ x: startX, y: startY });
    targetPos.current = { x: startX, y: startY };

    const lerp = () => {
      setBotPos(prev => {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 100;
        const tx = Math.max(0, Math.min(targetPos.current.x, maxX));
        const ty = Math.max(0, Math.min(targetPos.current.y, maxY));
        return {
          x: prev.x + (tx - prev.x) * 0.08,
          y: prev.y + (ty - prev.y) * 0.08,
        };
      });
      animFrame.current = requestAnimationFrame(lerp);
    };
    animFrame.current = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  // Cycle tips
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % TIPS.length;
      setCurrentTip(TIPS[i]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={botRef}
      style={{
        position: "fixed",
        left: botPos.x,
        top: botPos.y,
        zIndex: 9998,
        pointerEvents: "auto",
      }}
      className="flex flex-col items-center gap-1"
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="glass max-w-[200px] px-2.5 py-1.5 text-[10px] font-mono text-text-primary relative mb-1"
        >
          <p>{currentTip}</p>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-bg-tertiary/70 border-r border-b border-neon-cyan/15" />
        </motion.div>
      </AnimatePresence>

      {/* Bot - clickable to open chat */}
      <button
        onClick={() => openWindow("chat")}
        className="cursor-pointer select-none hover:drop-shadow-[0_0_8px_rgba(141,182,0,0.4)] transition-all"
        title="Open DI-Bot chat"
      >
        <BotCharacter eyeX={eyeDir.x} eyeY={eyeDir.y} />
      </button>
    </div>
  );
}
