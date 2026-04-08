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
import { motion } from "motion/react";

const desktopIcons = [
  { windowId: "about", label: "about.txt", icon: "📄" },
  { windowId: "experience", label: "experience/", icon: "📁" },
  { windowId: "skills", label: "skills.sh", icon: "⚙" },
  { windowId: "projects", label: "projects/", icon: "📁" },
  { windowId: "contact", label: "contact.sh", icon: "✉" },
  { windowId: "chat", label: "DI-Bot", icon: "🤖" },
];

function DesktopContent() {
  const { windows } = useWindowManager();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-bg-primary">
      <ScanlineOverlay />

      {/* Desktop area */}
      <div id="desktop-area" className="flex-1 relative overflow-hidden pb-10">
        {/* Desktop wallpaper info */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center"
          >
            <div className="text-6xl sm:text-8xl font-bold font-mono text-neon-cyan">DI</div>
          </motion.div>
        </div>

        {/* Icons grid - top left */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
          {desktopIcons.map((icon, i) => (
            <DesktopIcon key={icon.windowId} index={i} {...icon} />
          ))}
        </div>

        {/* Mobile: stacked windows */}
        {isMobile ? (
          <div className="absolute inset-0 top-[280px] px-2 pb-12 overflow-y-auto space-y-2">
            <Window id="about"><AboutWindow /></Window>
            <Window id="experience"><ExperienceWindow /></Window>
            <Window id="skills"><SkillsWindow /></Window>
            <Window id="projects"><ProjectsWindow /></Window>
            <Window id="contact"><ContactWindow /></Window>
            <Window id="chat"><ChatWindow /></Window>
          </div>
        ) : (
          <>
            <Window id="about"><AboutWindow /></Window>
            <Window id="experience"><ExperienceWindow /></Window>
            <Window id="skills"><SkillsWindow /></Window>
            <Window id="projects"><ProjectsWindow /></Window>
            <Window id="contact"><ContactWindow /></Window>
            <Window id="chat"><ChatWindow /></Window>
          </>
        )}
      </div>

      {/* Assistant */}
      <Assistant />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}

export function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopContent />
    </WindowManagerProvider>
  );
}
