export interface SkillCategory {
  title: string;
  id: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Python", "Rust", "Dart", "C#", "PHP", "TypeScript", "SQL"],
  },
  {
    id: "backend",
    title: "Backend & Architecture",
    skills: ["Backend Development", "REST APIs", "Authentication", "Scalable Architectures"],
  },
  {
    id: "ai",
    title: "AI & ML",
    skills: ["Chatbots", "Prompt Engineering", "Fine-tuning", "NLP", "Image Generation"],
  },
  {
    id: "automation",
    title: "Automation",
    skills: ["RPA", "N8N", "Workflow Orchestration"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: ["React", "Next.js", "Zustand"],
  },
  {
    id: "scraping",
    title: "Scraping & Data",
    skills: ["Selenium", "Web Scraping", "Data Extraction"],
  },
  {
    id: "cloud",
    title: "Cloud & Tools",
    skills: ["PostgreSQL", "Supabase", "Redis", "Vercel", "Linux", "VPS", "Git"],
  },
];
