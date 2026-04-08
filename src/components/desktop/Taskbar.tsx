"use client";

import { useWindowManager } from "./WindowManager";
import { Logo } from "@/components/ui/Logo";

export function Taskbar() {
  const { windows, focusWindow, openWindow } = useWindowManager();
  const openWindows = windows.filter(w => w.isOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] h-10 glass-taskbar border-t border-text-muted/20 flex items-center px-2 gap-1">
      {/* Start/Logo button */}
      <button
        className="flex items-center gap-1.5 px-2 h-7 text-xs font-mono text-text-primary hover:bg-bg-tertiary border border-text-muted/30 hover:border-neon-cyan/40 transition-colors"
        onClick={() => {
          // Toggle all windows - simple start menu behavior
        }}
      >
        <Logo size={14} animated={false} />
        <span className="hidden sm:inline">DI</span>
      </button>

      <div className="w-px h-6 bg-text-muted/20 mx-1" />

      {/* Open windows */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {openWindows.map(win => (
          <button
            key={win.id}
            onClick={() => focusWindow(win.id)}
            className={`flex items-center gap-1.5 px-2 h-7 text-[11px] font-mono transition-colors border ${
              win.isMinimized
                ? "text-text-muted bg-bg-primary border-text-muted/20"
                : "text-text-primary bg-bg-tertiary border-neon-cyan/30"
            } hover:border-neon-cyan/50`}
          >
            <span className="text-xs">{win.icon}</span>
            <span className="hidden sm:inline truncate max-w-[100px]">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Clock / info */}
      <div className="text-[10px] font-mono text-text-muted px-2">
        <span className="text-neon-green">●</span>{" "}
        <span className="hidden sm:inline">CABA // </span>
        {new Date().getFullYear()}
      </div>
    </div>
  );
}
