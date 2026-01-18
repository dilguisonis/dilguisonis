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
    role: "Software Engineer / Product Engineer",
    items: [
      "AI virtual try-on platform + B2B e-commerce",
      "Generative AI integration, chatbots, admin dashboards",
      "Billing systems and full-stack infrastructure",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Redis", "Vercel"],
  },
  {
    year: "2024",
    company: "FREELANCE",
    role: "Blockchain Developer",
    items: [
      "Bitcoin hot wallet (AQUA) customization",
      "Flutter frontend, Rust core development",
    ],
    stack: ["Flutter", "Dart", "Rust"],
  },
  {
    year: "2024-Present",
    company: "ALGOLEADS",
    role: "Co-Founder",
    items: [
      "RPA lead generation (Instagram/LinkedIn)",
      "Web scraping and data extraction pipelines",
      "VPS infrastructure management",
    ],
    stack: ["TypeScript", "Puppeteer", "Node.js", "Linux"],
  },
];
