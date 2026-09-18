"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  activeWindowId: string | null;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider");
  return ctx;
}

const DEFAULT_WINDOWS: WindowState[] = [
  { id: "about", title: "about.txt", icon: "📄", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 80, y: 60 }, size: { width: 600, height: 450 } },
  { id: "experience", title: "experience/", icon: "📁", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 120, y: 80 }, size: { width: 650, height: 500 } },
  { id: "skills", title: "skills.sh", icon: "⚙", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 160, y: 100 }, size: { width: 600, height: 450 } },
  { id: "projects", title: "projects/", icon: "📁", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 200, y: 70 }, size: { width: 700, height: 520 } },
  { id: "contact", title: "contact.sh", icon: "✉", isOpen: false, isMinimized: false, zIndex: 0, position: { x: 140, y: 90 }, size: { width: 550, height: 400 } },
  { id: "chat", title: "DI-Bot // 4x RTX 3090", icon: "🤖", isOpen: true, isMinimized: false, zIndex: 1, position: { x: 350, y: 80 }, size: { width: 440, height: 450 } },
];

let nextZIndex = 1;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(DEFAULT_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev => {
      const win = prev.find(w => w.id === id);
      if (!win) return prev;

      // If already open, just focus
      if (win.isOpen && !win.isMinimized) {
        return prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w);
      }

      // Find a non-overlapping position next to existing open windows
      const openWins = prev.filter(w => w.isOpen && !w.isMinimized && w.id !== id);
      let newPos = win.position;

      if (openWins.length > 0 && typeof window !== "undefined") {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight - 50; // taskbar

        // Try to place to the right of the rightmost window
        const rightmost = openWins.reduce((best, w) =>
          (w.position.x + w.size.width) > (best.position.x + best.size.width) ? w : best
        );
        const rightEdge = rightmost.position.x + rightmost.size.width + 8;

        if (rightEdge + win.size.width <= screenW) {
          // Fits to the right
          newPos = { x: rightEdge, y: rightmost.position.y };
        } else {
          // Doesn't fit right — try below the topmost row
          const bottommost = openWins.reduce((best, w) =>
            (w.position.y + w.size.height) > (best.position.y + best.size.height) ? w : best
          );
          const bottomEdge = bottommost.position.y + bottommost.size.height + 8;

          if (bottomEdge + 200 <= screenH) {
            newPos = { x: 100, y: bottomEdge };
          } else {
            // Cascade with small offset from last opened
            const last = openWins[openWins.length - 1];
            newPos = {
              x: Math.min(last.position.x + 30, screenW - win.size.width),
              y: Math.min(last.position.y + 30, screenH - 200),
            };
          }
        }
      }

      return prev.map(w =>
        w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex, position: newPos } : w
      );
    });
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w))
    );
    setActiveWindowId(null);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId(null);
  }, []);

  const focusWindow = useCallback((id: string) => {
    nextZIndex++;
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          return { ...w, isMinimized: false, zIndex: nextZIndex };
        }
        return w;
      })
    );
    setActiveWindowId(id);
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{ windows, openWindow, closeWindow, minimizeWindow, focusWindow, updatePosition, activeWindowId }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
