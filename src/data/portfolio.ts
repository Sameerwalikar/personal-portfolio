import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  person: {
    firstName: "Sameer",
    lastName: "Walikar",
    fullName: "Sameer Walikar",
    title: "Full Stack Developer",
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
      id: "publicfund",
      title: "PublicFund Transparency FundView",
      description:
        "Blockchain-based donation platform enabling transparent fund tracking with Ethereum smart contract integration.",
      highlights: [
        "Integrated Ethereum smart contracts for secure, verifiable donations",
        "Enabled transparent transaction tracking with QR payments",
        "Implemented real-time currency conversion for global contributors",
      ],
      techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Ethereum"],
      category: "Blockchain",
    },
    {
      id: "voice-translator",
      title: "Voice Translator",
      description:
        "Real-time voice translation system with a seamless live speech processing pipeline across multiple languages.",
      highlights: [
        "Built speech-to-text and text-to-speech pipeline using AssemblyAI and ElevenLabs",
        "Supported 10+ languages with low-latency live processing",
        "Designed end-to-end audio flow for natural conversational translation",
      ],
      techStack: ["Python", "AssemblyAI", "ElevenLabs"],
      category: "AI / ML",
    },
    {
      id: "excel-analytics",
      title: "Excel Analytics Platform",
      description:
        "Full-stack Excel analytics web application with secure authentication, dynamic visualizations, and admin dashboard.",
      highlights: [
        "Developed JWT-based authentication and role-based access control",
        "Implemented Excel upload, parsing, and interactive 2D/3D chart visualizations",
        "Built admin dashboard with data insights, user management, and chart export",
      ],
      techStack: ["Node.js", "Express.js", "React.js", "JWT"],
      category: "Full Stack",
    },
    {
      id: "tourist-safety",
      title: "Smart Tourist Safety & Tracking System",
      description:
        "Real-time tourist safety platform with GPS tracking, danger-zone alerts, and emergency SOS features.",
      highlights: [
        "Developed real-time GPS tracking with geofenced danger-zone alerts",
        "Implemented SOS emergency features with monitoring dashboard",
        "Built responsive web interface for tourists and safety operators",
      ],
      techStack: ["Web Technologies", "GPS", "Real-time APIs"],
      category: "IoT / Safety",
    },
  ],
  experience: [
    {
      id: "edc-iitd",
      role: "Campus Ambassador & Digital Marketing Intern",
      company: "EDC IIT Delhi",
      period: "Dec 2025 – Present",
      location: "Presidency University, Bengaluru",
      type: "Internship",
      highlights: [
        "Represent EDC IIT Delhi as the official Campus Ambassador for Presidency University",
        "Promoted entrepreneurship events and initiatives, increasing student engagement and participation",
        "Coordinated with the EDC team to support marketing campaigns and community building",
      ],
    },
    {
      id: "zidio",
      role: "Web Development Intern",
      company: "Zidio Development",
      period: "Jul 2025 – Aug 2025",
      location: "Remote",
      type: "Internship",
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
    },
    {
      id: "rj-pu",
      institution: "RJ PU College of Science",
      degree: "Pre-University Course (Science)",
      period: "Jul 2021 – Mar 2023",
      location: "Kalaburgi, Karnataka",
    },
  ],
  achievements: [
    {
      id: "build-with-ai",
      title: "First Runner-Up — Build With AI International 24-Hour Hackathon",
      description: "Among 118 teams at Presidency University",
    },
    {
      id: "sih-2025",
      title: "SIH 2025 — Top 25 (Semi-finals Qualified)",
    },
    {
      id: "agentathon",
      title: "Top 6 — Agentathon Hackathon, PES University",
    },
    {
      id: "edc-lor",
      title: "Letter of Recommendation from EDC IIT Delhi",
      description: "Top 10% performers as Campus Ambassador",
    },
    {
      id: "techbizz",
      title: "Hosted 24-Hour Campus Hackathon — techbizz",
      description: "Successfully organized and led a full-day software hackathon on campus",
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
