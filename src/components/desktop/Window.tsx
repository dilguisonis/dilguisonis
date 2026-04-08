"use client";

import { motion, AnimatePresence } from "motion/react";
import { useWindowManager } from "./WindowManager";
import { ReactNode, useRef, useEffect, useState, useCallback } from "react";

interface WindowProps {
  id: string;
  children: ReactNode;
}

export function Window({ id, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow, activeWindowId } =
    useWindowManager();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const win = windows.find(w => w.id === id);
  if (!win) return null;

  // Initialize position
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (!pos) setPos({ x: win.position.x, y: win.position.y });
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clampPosition = useCallback((x: number, y: number) => {
    const w = win?.size.width ?? 400;
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 60;
    const minX = -(w - 80);
    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  }, [win?.size.width]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    focusWindow(id);
    isDragging.current = true;
    dragStartPos.current = { x: e.clientX - (pos?.x ?? 0), y: e.clientY - (pos?.y ?? 0) };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isMobile, id, focusWindow, pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    setPos(clampPosition(newX, newY));
  }, [clampPosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const isActive = activeWindowId === id;
  const currentPos = pos ?? win.position;

  return (
    <AnimatePresence>
      {win.isOpen && !win.isMinimized && (
        <motion.div
          ref={windowRef}
          key={id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          onPointerDown={() => focusWindow(id)}
          style={{
            position: isMobile ? "relative" : "absolute",
            left: isMobile ? undefined : currentPos.x,
            top: isMobile ? undefined : currentPos.y,
            width: isMobile ? "100%" : win.size.width,
            maxHeight: isMobile ? undefined : win.size.height,
            zIndex: win.zIndex,
          }}
          className={`flex flex-col overflow-hidden glass ${
            isActive ? "border-neon-cyan/30" : ""
          }`}
        >
          {/* Title bar - drag handle */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`flex items-center justify-between px-3 py-1.5 select-none cursor-grab active:cursor-grabbing touch-none ${
              isActive ? "glass-titlebar" : "glass-titlebar-inactive"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span>{win.icon}</span>
              <span className={isActive ? "text-text-primary" : "text-text-muted"}>
                {win.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => minimizeWindow(id)}
                className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-neon-amber hover:bg-neon-amber/10 transition-colors text-[10px]"
              >
                ─
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => closeWindow(id)}
                className="w-5 h-5 flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors text-[10px]"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Window content */}
          <div className="flex-1 overflow-y-auto p-4 text-sm font-mono">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
