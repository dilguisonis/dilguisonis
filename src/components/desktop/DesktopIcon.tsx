"use client";

import { motion } from "motion/react";
import { useWindowManager } from "./WindowManager";
import { useRef, useState, useCallback } from "react";

interface DesktopIconProps {
  windowId: string;
  label: string;
  icon: string;
  index: number;
}

export function DesktopIcon({ windowId, label, icon, index }: DesktopIconProps) {
  const { openWindow } = useWindowManager();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    hasMoved.current = true;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (!hasMoved.current) openWindow(windowId);
  }, [openWindow, windowId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={() => openWindow(windowId)}
      className="flex flex-col items-center gap-1 p-2 w-20 group cursor-grab active:cursor-grabbing select-none touch-none"
    >
      <div className="text-3xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-text-primary text-center leading-tight group-hover:text-neon-cyan transition-colors">
        {label}
      </span>
    </motion.div>
  );
}
