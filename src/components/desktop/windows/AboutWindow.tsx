"use client";

export function AboutWindow() {
  return (
    <div className="space-y-3 text-text-secondary text-xs sm:text-sm">
      <div className="text-text-muted">{">"} cat about.txt</div>
      <pre className="text-text-muted text-[10px] sm:text-xs">
{`================================
PROFILE: DANILO_ILGUISONIS
================================`}
      </pre>
      <p className="text-text-primary">
        Software Engineer focused on building and shipping production systems, with experience in
        backend development, automation, and AI-driven workflows.
      </p>
      <div>
        <span className="text-neon-amber">Education:</span>
        <div className="ml-2 mt-1">
          <div>Licentiate (B.Sc. + M.Sc.) Computer Science @ UBA (2022-2026)</div>
          <div>B.Sc. Data Science @ UBA (2018-2022)</div>
        </div>
      </div>
      <div>
        <span className="text-neon-amber">Languages:</span>
        <div className="ml-2 mt-1">
          <div>Spanish (Native)</div>
          <div>English (C1)</div>
        </div>
      </div>
      <pre className="text-text-muted text-[10px] sm:text-xs">{"================================"}</pre>
      <div className="text-neon-cyan">{">"} <span className="text-neon-green cursor-blink">_</span></div>
    </div>
  );
}
