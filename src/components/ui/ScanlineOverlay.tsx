"use client";

import { useEffect, useState } from "react";

export function ScanlineOverlay() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsEnabled(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsEnabled(!e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isEnabled) return null;

  return <div className="scanlines" aria-hidden="true" />;
}
