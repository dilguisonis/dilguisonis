export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  items: string[];
  stack?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    year: "2025",
    company: "AMMEG",
    role: "Lead Product Developer",
    items: [
      "AI SaaS Platform (Ammegtech)",
      "E-commerce (mmari.com.ar)",
      "Full-stack development & infrastructure",
    ],
    stack: ["Next.js", "Supabase", "ComfyUI", "Python"],
  },
  {
    year: "2024",
    company: "ALGOLEADS",
    role: "Co-founder",
    items: [
      "Instagram/LinkedIn automation platform",
      "RPA solutions for social media marketing",
    ],
    stack: ["TypeScript", "Puppeteer", "Node.js"],
  },
  {
    year: "2023",
    company: "FREELANCE",
    role: "Software Engineer",
    items: [
      "Custom AI solutions for clients",
      "Full-stack web development",
    ],
    stack: ["Python", "TypeScript", "React", "AWS"],
  },
  {
    year: "2022",
    company: "UBA",
    role: "Research Assistant",
    items: [
      "Blockchain research (Proof of Useful Work)",
      "Distributed systems optimization",
    ],
    stack: ["Rust", "Solidity", "Python"],
  },
];
