export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  status: "live" | "development" | "research";
}

export const projects: Project[] = [
  {
    id: "ammegtech",
    name: "Ammegtech",
    description: "AI virtual try-on SaaS platform. Generate product images with AI-powered clothing visualization.",
    tags: ["AI", "SaaS", "Next.js", "ComfyUI"],
    link: "https://ammegtech.com",
    status: "live",
  },
  {
    id: "mmari",
    name: "mmari.com.ar",
    description: "Full-featured e-commerce platform with custom admin dashboard and payment integration.",
    tags: ["E-commerce", "Next.js", "Supabase"],
    link: "https://mmari.com.ar",
    status: "live",
  },
  {
    id: "algoleads",
    name: "AlgoLeads",
    description: "RPA automation platform for Instagram and LinkedIn marketing campaigns.",
    tags: ["Automation", "RPA", "TypeScript"],
    status: "development",
  },
  {
    id: "pouw",
    name: "Proof of Useful Work",
    description: "Blockchain consensus mechanism research combining mining with useful computation.",
    tags: ["Blockchain", "Research", "Rust"],
    status: "research",
  },
];
