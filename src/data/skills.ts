export interface Skill {
  name: string;
  level: number; // 0-100
  category: "languages" | "frameworks" | "tools" | "areas";
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", level: 95, category: "languages" },
  { name: "TypeScript", level: 90, category: "languages" },
  { name: "JavaScript", level: 90, category: "languages" },
  { name: "Rust", level: 75, category: "languages" },
  { name: "SQL", level: 85, category: "languages" },

  // Frameworks
  { name: "Next.js", level: 92, category: "frameworks" },
  { name: "React", level: 90, category: "frameworks" },
  { name: "FastAPI", level: 88, category: "frameworks" },
  { name: "Node.js", level: 85, category: "frameworks" },

  // Tools
  { name: "Git", level: 95, category: "tools" },
  { name: "Docker", level: 85, category: "tools" },
  { name: "AWS", level: 80, category: "tools" },
  { name: "Supabase", level: 88, category: "tools" },

  // Areas
  { name: "AI/ML", level: 85, category: "areas" },
  { name: "Web Dev", level: 95, category: "areas" },
  { name: "Blockchain", level: 75, category: "areas" },
  { name: "DevOps", level: 78, category: "areas" },
];

export const getSkillsByCategory = (category: Skill["category"]) =>
  skills.filter((skill) => skill.category === category);
