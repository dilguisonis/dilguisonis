"use client";

import { skillCategories } from "@/data/skills";

export function SkillsWindow() {
  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="text-text-muted">{">"} ./skills.sh</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="border border-text-muted/20 p-3">
            <div className="text-neon-amber font-bold mb-2 text-xs">
              {">"} {cat.title.toUpperCase()}
            </div>
            <div className="flex flex-wrap gap-1">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] px-1.5 py-0.5 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
