"use client";

import { WindowManagerProvider, useWindowManager } from "./WindowManager";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { AboutWindow } from "./windows/AboutWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { SkillsWindow } from "./windows/SkillsWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { ChatWindow } from "./windows/ChatWindow";
import { Assistant } from "./Assistant";
import { ScanlineOverlay } from "@/components/ui/ScanlineOverlay";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const desktopIcons = [
  { windowId: "about", label: "about.txt", icon: "📄" },
  { windowId: "experience", label: "experience/", icon: "📁" },
  { windowId: "skills", label: "skills.sh", icon: "⚙" },
  { windowId: "projects", label: "projects/", icon: "📁" },
  { windowId: "contact", label: "contact.sh", icon: "✉" },
  { windowId: "chat", label: "DI-Bot", icon: "🤖" },
];

const WINDOW_CONTENT: Record<string, React.ReactNode> = {
  about: <AboutWindow />,
  experience: <ExperienceWindow />,
  skills: <SkillsWindow />,
  projects: <ProjectsWindow />,
  contact: <ContactWindow />,
  chat: <ChatWindow />,
};

function MobileDesktop() {
  const { windows, openWindow, closeWindow, activeWindowId } = useWindowManager();
  const activeWindow = windows.find(w => w.id === activeWindowId && w.isOpen && !w.isMinimized);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-bg-primary">
      {/* Active fullscreen window */}
      <AnimatePresence mode="wait">
        {activeWindow ? (
          <motion.div
            key={activeWindow.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Mobile title bar */}
            <div className="glass-titlebar flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span>{activeWindow.icon}</span>
                <span className="text-text-primary">{activeWindow.title}</span>
              </div>
              <button
                onClick={() => closeWindow(activeWindow.id)}
                className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 text-sm font-mono bg-bg-secondary/50">
              {WINDOW_CONTENT[activeWindow.id]}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 px-4"
          >
            {/* Name */}
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-neon-cyan mb-1">DI</div>
              <div className="text-xs font-mono text-text-muted">DANILO_ILGUISONIS</div>
              <div className="text-[10px] font-mono text-text-muted mt-0.5">SOFTWARE_ENGINEER // CABA</div>
            </div>

            {/* Icons grid */}
            <div className="grid grid-cols-3 gap-4">
              {desktopIcons.map((icon, i) => (
                <motion.button
                  key={icon.windowId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => openWindow(icon.windowId)}
                  className="flex flex-col items-center gap-1.5 p-3 active:bg-neon-cyan/10 transition-colors"
                >
                  <span className="text-3xl">{icon.icon}</span>
                  <span className="text-[10px] font-mono text-text-primary">{icon.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile taskbar */}
      <div className="h-14 glass-taskbar border-t border-text-muted/20 flex items-center px-1 gap-0.5 overflow-x-auto">
        {/* Home button */}
        <button
          onClick={() => {
            windows.forEach(w => { if (w.isOpen) closeWindow(w.id); });
          }}
          className={`flex flex-col items-center justify-center px-2 h-11 min-w-[50px] text-[9px] font-mono transition-colors border ${
            !activeWindow
              ? "text-neon-cyan border-neon-cyan/30 bg-bg-tertiary"
              : "text-text-muted border-transparent"
          }`}
        >
          <span className="text-base">🏠</span>
          <span>home</span>
        </button>

        {/* App buttons */}
        {desktopIcons.map(icon => {
          const win = windows.find(w => w.id === icon.windowId);
          const isActive = activeWindowId === icon.windowId;
          const isOpen = win?.isOpen && !win?.isMinimized;
          const needsAttention = icon.windowId === "chat" && !isActive && isOpen;
          return (
            <button
              key={icon.windowId}
              onClick={() => openWindow(icon.windowId)}
              className={`flex flex-col items-center justify-center px-1.5 h-11 min-w-[44px] text-[9px] font-mono transition-colors border ${
                isActive
                  ? "text-neon-cyan border-neon-cyan/30 bg-bg-tertiary"
                  : needsAttention
                  ? "taskbar-attention text-text-primary"
                  : isOpen
                  ? "text-text-primary border-text-muted/20"
                  : "text-text-muted border-transparent"
              }`}
            >
              <span className="text-sm">{icon.icon}</span>
              <span className="truncate max-w-[40px]">{icon.label.replace(/[/.]/g, "")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DesktopView() {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-bg-primary">
      <ScanlineOverlay />

      <div id="desktop-area" className="flex-1 relative overflow-hidden pb-10">
        {/* Wallpaper */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center"
          >
            <div className="text-8xl font-bold font-mono text-neon-cyan">DI</div>
          </motion.div>
        </div>

        {/* Icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
          {desktopIcons.map((icon, i) => (
            <DesktopIcon key={icon.windowId} index={i} {...icon} />
          ))}
        </div>

        {/* Windows */}
        <Window id="about"><AboutWindow /></Window>
        <Window id="experience"><ExperienceWindow /></Window>
        <Window id="skills"><SkillsWindow /></Window>
        <Window id="projects"><ProjectsWindow /></Window>
        <Window id="contact"><ContactWindow /></Window>
        <Window id="chat"><ChatWindow /></Window>
      </div>

      <Assistant />
      <Taskbar />
    </div>
  );
}

function DesktopContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileDesktop /> : <DesktopView />;
}

export function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopContent />
    </WindowManagerProvider>
  );
}
