import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  person: {
    firstName: "Sameer",
    lastName: "Walikar",
    fullName: "Sameer Walikar",
    title: "Full Stack & AI Developer",
    location: "Bengaluru, Karnataka, India",
    email: "sameerwalikar999@gmail.com",
    phone: "+91-9008341099",
    availability: "Available for Remote Work",
    summary:
      "Computer Engineering undergraduate with strong foundations in Data Structures, Algorithms, and Full Stack Web Development. Experienced in building scalable web applications, blockchain-based systems, and AI-powered tools. Passionate about solving real-world problems through software development and continuously improving problem-solving skills through competitive programming and hands-on projects.",
    heroTagline:
      "I build scalable web applications, blockchain systems, and AI-powered tools — turning complex problems into reliable, production-grade software with clean architecture and premium UX.",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sameer-walikar",
      icon: "linkedin",
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/u/sameerwalikar999",
      icon: "leetcode",
    },
  ],
  projects: [
    {
      id: "orqen-ai",
      title: "Orqen AI",
      description:
        "An AI-powered platform that orchestrates intelligent agents to automate complex workflows — blending LLM reasoning with real-time task execution.",
      highlights: [
        "Designed a multi-agent orchestration layer with dynamic task routing and LLM-driven decision making",
        "Built a real-time execution pipeline with streaming outputs and contextual memory across sessions",
        "Integrated REST APIs and tool-use capabilities for agents to interact with external services",
      ],
      techStack: ["Next.js", "TypeScript", "Python", "LangChain", "OpenAI API", "Node.js"],
      category: "AI / LLM",
      image: "/images/projects/orqen",
    },
    {
      id: "cybershield-ai",
      title: "CyberShield AI",
      description:
        "A real-time AI-powered cybersecurity threat detection system that analyzes network patterns and flags anomalies using machine learning models.",
      highlights: [
        "Built ML-based anomaly detection pipeline for identifying suspicious network traffic patterns",
        "Implemented a real-time alert dashboard with severity scoring and incident history",
        "Designed scalable data ingestion architecture with async processing for high-throughput environments",
      ],
      techStack: ["Python", "FastAPI", "React", "TensorFlow", "MongoDB", "WebSocket"],
      category: "AI / Security",
      image: "/images/projects/cyber",
    },
    {
      id: "founderos-ai",
      title: "FounderOS AI",
      description:
        "An AI operating system for founders — automating market research, competitive analysis, and investor pitch generation using specialized LLM agents.",
      highlights: [
        "Developed specialized AI agents for market sizing, competitor profiling, and GTM strategy generation",
        "Built an automated pitch deck generator that structures data into investor-ready narratives",
        "Integrated web scraping and real-time data enrichment for live market intelligence",
      ],
      techStack: ["Next.js", "TypeScript", "OpenAI API", "LangGraph", "PostgreSQL", "Tailwind CSS"],
      category: "AI / SaaS",
      image: "/images/projects/founderos",
    },
    {
      id: "ai-voice-translator",
      title: "AI Voice Translator",
      description:
        "Real-time voice translation system with a seamless live speech processing pipeline across 10+ languages using AssemblyAI and ElevenLabs.",
      highlights: [
        "Built end-to-end speech-to-text and text-to-speech pipeline with sub-second latency",
        "Supported 10+ languages with natural voice cloning for consistent speaker identity across translations",
        "Designed a clean audio flow that preserves tone, pacing, and conversational nuance",
      ],
      techStack: ["Python", "AssemblyAI", "ElevenLabs", "FastAPI", "WebSocket"],
      category: "AI / Voice",
      image: "/images/projects/aivoice",
    },
  ],
  experience: [
    {
      id: "rivominds",
      role: "Full Stack Developer Intern",
      company: "RivoMinds",
      period: "Jul 2026 – Present",
      location: "Remote",
      type: "Internship",
      logo: "/images/work/rivomind.png",
      highlights: [
        "Building production-grade full-stack web applications with modern React and Node.js architecture",
        "Integrating LLM-based AI features and intelligent automation into core product workflows",
        "Designing scalable REST APIs and contributing to system architecture decisions",
        "Collaborating in an agile environment with a focus on performance and clean code",
      ],
    },
    {
      id: "edc-iitd",
      role: "Campus Ambassador & Digital Marketing Intern",
      company: "EDC IIT Delhi",
      period: "Dec 2025 – Present",
      location: "Presidency University, Bengaluru",
      type: "Internship",
      logo: "/images/work/edc.jpg",
      highlights: [
        "Represent EDC IIT Delhi as the official Campus Ambassador for Presidency University",
        "Promoted entrepreneurship events and initiatives, increasing student engagement and participation",
        "Coordinated with the EDC team to support marketing campaigns and community building",
        "Earned Letter of Recommendation as a Top 10% performer across all campus ambassadors",
      ],
    },
    {
      id: "zidio",
      role: "Web Development Intern",
      company: "Zidio Development",
      period: "Jul 2025 – Aug 2025",
      location: "Remote",
      type: "Internship",
      logo: "/images/work/zidio.jpg",
      highlights: [
        "Developed a full-stack Excel analytics web application with secure JWT authentication",
        "Implemented Excel file upload and data parsing with dynamic 2D and 3D chart visualizations",
        "Built admin dashboard features including data insights, user management, and chart export",
      ],
    },
  ],
  education: [
    {
      id: "presidency",
      institution: "Presidency University",
      degree: "Bachelor of Technology in Computer Engineering",
      period: "Aug 2023 – Aug 2027",
      location: "Bengaluru, Karnataka",
      score: "CGPA 8.55",
      logo: "/images/education/presidency.png",
    },
    {
      id: "rj-pu",
      institution: "RJ PU College of Science",
      degree: "Pre-University Course (Science)",
      period: "Jul 2021 – Mar 2023",
      location: "Kalaburgi, Karnataka",
      score: "92%",
      logo: "/images/education/rj.jpg",
    },
  ],
  achievements: [
    {
      id: "backend-heist",
      title: "3rd Place — Backend Heist",
      description: "Secured 3rd place at Backend Heist, hosted by GDG On Campus Presidency University — from concepts to quiz to a real-world challenge, testing how I think under pressure.",
    },
    {
      id: "build-with-ai",
      title: "First Runner-Up — Build With AI",
      description: "First Runner-Up among 118 teams at the 'Build With AI' International 24-Hour Hackathon, Presidency University.",
    },
    {
      id: "sih-2025",
      title: "Top 25 — Smart India Hackathon 2025",
      description: "Qualified for semi-finals, ranking in the Top 25 at Smart India Hackathon (SIH) 2025.",
    },
    {
      id: "edc-lor",
      title: "Letter of Recommendation — EDC IIT Delhi",
      description: "Received a Letter of Recommendation from EDC IIT Delhi for ranking in the top 10% of performers.",
    },
    {
      id: "techbizz",
      title: "Organizer & Host — TechBizz",
      description: "Organized and hosted 'TechBizz,' a 24-hour campus-wide software hackathon.",
    },
  ],
  skills: [
    {
      id: "languages",
      title: "Programming",
      icon: "💻",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    },
    {
      id: "web",
      title: "Web Development",
      icon: "⚛️",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "React.js",
        "Express.js",
        "Next.js",
        "PHP",
        "EJS",
      ],
    },
    {
      id: "frontend",
      title: "Frontend & UI",
      icon: "🎨",
      skills: ["Tailwind CSS", "Bootstrap", "Responsive Design"],
    },
    {
      id: "databases",
      title: "Databases",
      icon: "🗄️",
      skills: ["MySQL", "MongoDB"],
    },
    {
      id: "tools",
      title: "Tools & Workflow",
      icon: "🛠️",
      skills: ["Git", "GitHub", "VS Code", "REST APIs", "JWT"],
    },
  ],
  contact: {
    headline: "Let's Build Together",
    subheadline:
      "Open to internships, collaborative projects, hackathons, and full-stack development opportunities. Reach out to discuss how we can work together.",
    perks: [
      "30-minute consultation",
      "Response within 24 hours",
      "Remote & on-site in Bengaluru",
    ],
  },
};
