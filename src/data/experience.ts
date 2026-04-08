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
      "Led conception, development, and launch of multiple digital products from zero to production",
      "Built mmari.com.ar e-commerce: custom cart with Zustand, 4-layer cache system, POS integration, AI chatbot",
      "Designed and built Ammegtech SaaS: AI virtual try-on platform for fashion industry",
      "Sole Technical Lead: full-stack development, cloud infrastructure (RunPod, Modal.com), AI integration",
      "Scaled to production with hundreds of users generating thousands of images monthly",
      "Deep expertise in ComfyUI for AI workflow orchestration and optimization",
      "Managed and mentored team members, led training initiatives",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Redis", "ComfyUI", "Vercel"],
  },
  {
    year: "2026",
    company: "WOMBI",
    role: "Full-Stack Developer",
    items: [
      "Core developer of UGC creator-brand marketplace platform",
      "Built admin dashboard with refund system, balance management, and audit logging",
      "Implemented campaign lifecycle, proposal workflows, and collaboration chat system",
      "Integrated MercadoPago payments with balance/credit system",
      "Fixed 164+ TypeScript errors achieving zero-error codebase",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zustand", "Playwright"],
  },
  {
    year: "2024-Present",
    company: "ALGOLEADS",
    role: "Co-Founder",
    items: [
      "Led development of Instagram DM automation platform for appointment setters",
      "Built automation engine with SeleniumBase and Python",
      "Implemented ML algorithms for message personalization and lead qualification",
      "Created cross-platform executable and installer packages",
      "Spearheaded frontend development with focus on UX design and testing",
    ],
    stack: ["Python", "SeleniumBase", "Machine Learning", "Web Development"],
  },
  {
    year: "2026",
    company: "TREVISAN MADERAS",
    role: "Freelance Developer",
    items: [
      "Built landing page and CMS for wholesale wood distributor",
      "Developed admin dashboard with AI background removal for product images",
      "Implemented ISR with Supabase for dynamic content management",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
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
];
