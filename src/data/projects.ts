export interface ProjectData {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image: string;
  imageAlt: string;
  github?: string;
  href?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "cybershield",
    number: 1,
    title: "CyberShield AI",
    category: "AI / Security",
    description:
      "Threat intelligence & URL verdict engine — multi-stage detection pipeline with URL normalization, lexical analysis, domain intelligence, and a Gemini-powered verdict generator with real-time WebSocket streaming.",
    highlights: [
      "Multi-stage detection: normalization → lexical → threat/domain intelligence → fusion engine",
      "Gemini API powers the final verdict layer with explainable threat reasoning",
      "Real-time verdict streaming via WebSocket — zero-latency threat feedback",
    ],
    techStack: ["Next.js", "TypeScript", "WebSockets", "Gemini API"],
    image: "/images/projects/cyber.png",
    imageAlt: "CyberShield AI — threat intelligence dashboard screenshot",
    github: "https://github.com/Sameerwalikar/cybersheild-ai",
  },
  {
    id: "founderos",
    number: 2,
    title: "FounderOS AI",
    category: "AI / SaaS",
    description:
      "AI startup blueprint SaaS — orchestrates multiple LLM agents to convert a startup idea into a 9-section execution blueprint with SSE streaming, subscription billing, and role-based team workspaces.",
    highlights: [
      "Multi-agent LLM orchestration generates 9-section founder blueprints end-to-end",
      "Server-Sent Events deliver streaming output in real time to the browser",
      "Subscription billing via Razorpay with Clerk-powered role-based workspaces",
    ],
    techStack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Clerk", "Razorpay"],
    image: "/images/projects/founderos.png",
    imageAlt: "FounderOS AI — startup blueprint generation interface",
    github: "https://github.com/Sameerwalikar/FounderOs",
  },
  {
    id: "orqen",
    number: 3,
    title: "Orqen",
    category: "AI / Enterprise",
    description:
      "AI-native enterprise automation platform unifying multi-agent orchestration, vector-based RAG, ETL pipelines, and connector integrations with cron scheduling and real-time analytics.",
    highlights: [
      "Unified multi-agent orchestration layer with LangChain and vector-based RAG via Qdrant",
      "ETL pipelines and RabbitMQ-backed async connector integrations with cron scheduling",
      "Real-time analytics dashboard for workflow monitoring and performance insights",
    ],
    techStack: ["React 18", "TypeScript", "Node.js", "PostgreSQL", "Qdrant", "RabbitMQ", "LangChain"],
    image: "/images/projects/orqen.png",
    imageAlt: "Orqen — enterprise AI automation platform dashboard",
    github: "https://github.com/Sameerwalikar/Orqen-AI-Native-Enterprise-Automation-Platform",
  },
  {
    id: "aivoice",
    number: 4,
    title: "AI Voice Translator",
    category: "AI / Voice",
    description:
      "Real-time voice translation pipeline with live speech-to-text and text-to-speech streaming across 10+ languages — preserving speaker tone and conversational nuance throughout.",
    highlights: [
      "End-to-end streaming pipeline: AssemblyAI STT → translate → ElevenLabs TTS",
      "Supports 10+ languages with voice cloning to preserve speaker identity",
      "WebSocket architecture delivers sub-second audio translation latency",
    ],
    techStack: ["Python", "AssemblyAI", "ElevenLabs", "WebSockets", "FastAPI"],
    image: "/images/projects/aivoice.png",
    imageAlt: "AI Voice Translator — real-time translation interface",
    github: "https://github.com/Sameerwalikar",
  },
];
