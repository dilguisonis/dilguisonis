export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  status: "live" | "development" | "research";
  image?: string;
  video?: string;
}

export const projects: Project[] = [
  {
    id: "ammegtech",
    name: "Ammegtech",
    description: "AI virtual try-on SaaS platform for the fashion industry. Generate product images with AI-powered clothing visualization. Scaled to hundreds of users generating thousands of images monthly.",
    tags: ["AI", "TypeScript", "Modal", "RunPod", "ComfyUI"],
    link: "https://ammegtech.com",
    status: "live",
    video: "/projects/ammegtech-demo.mp4",
    image: "/projects/ammegtech-ui.png",
  },
  {
    id: "mmari",
    name: "mmari.com.ar",
    description: "Full-featured e-commerce platform with custom cart using Zustand, 4-layer cache system, POS integration, and AI chatbot.",
    tags: ["E-commerce", "Next.js", "Zustand", "PostgreSQL"],
    link: "https://mmari.com.ar",
    status: "live",
    image: "/projects/mmari-cart.png",
  },
  {
    id: "algoleads",
    name: "AlgoLeads",
    description: "Instagram DM automation platform for appointment setters. Features ML algorithms for message personalization and lead qualification.",
    tags: ["Automation", "Python", "Scraping", "ML"],
    link: "https://algoleads.pro/",
    status: "live",
    video: "/projects/algoleads-demo.mp4",
  },
  {
    id: "proof-of-useful-work",
    name: "Proof of Useful Work",
    description: "Blockchain consensus mechanism research. Implemented a PoUW-inspired system on Ethereum with smart contracts for problem submission and rewards.",
    tags: ["Blockchain", "Ethereum", "Smart Contracts", "Research"],
    status: "research",
  },
  {
    id: "btc-price-predictor",
    name: "BTC Price Predictor",
    description: "Bitcoin price prediction model using Random Forest algorithm. Analyzes historical data, technical indicators, and market sentiment to forecast short-term price movements.",
    tags: ["ML", "Python", "RandomForest", "Crypto"],
    github: "https://github.com/dilguisonis/btc-predictor",
    status: "research",
  },
];
