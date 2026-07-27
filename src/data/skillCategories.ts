export interface SkillItem {
  name: string;
  icon: string; // public path
}

export interface SkillPanel {
  label: string;
  items: SkillItem[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string; // tailwind bg-gradient classes
  panels: SkillPanel[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    subtitle: "Core Programming",
    gradient: "from-emerald-600 to-green-800",
    panels: [
      {
        label: "PROGRAMMING",
        items: [
          { name: "Python", icon: "/images/whatiuse/languages/python.png" },
          { name: "JavaScript", icon: "/images/whatiuse/languages/js.png" },
          { name: "TypeScript", icon: "/images/whatiuse/languages/typescript.png" },
        ],
      },
      {
        label: "MARKUP & STYLE",
        items: [
          { name: "HTML", icon: "/images/whatiuse/languages/html.png" },
          { name: "CSS", icon: "/images/whatiuse/languages/css.jpg" },
        ],
      },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    subtitle: "Web & Backend",
    gradient: "from-teal-600 to-emerald-800",
    panels: [
      {
        label: "FRONTEND",
        items: [
          { name: "React", icon: "/images/whatiuse/languages/react.png" },
          { name: "Next.js", icon: "/images/whatiuse/languages/next.png" },
          { name: "Tailwind", icon: "/images/whatiuse/languages/tailwind.png" },
          { name: "Bootstrap", icon: "/images/whatiuse/languages/bootstrap.jpg" },
        ],
      },
      {
        label: "BACKEND",
        items: [
          { name: "Node.js", icon: "/images/whatiuse/languages/nodejs.png" },
          { name: "Express.js", icon: "/images/whatiuse/languages/expressjs.png" },
        ],
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Data & Storage",
    gradient: "from-green-700 to-teal-900",
    panels: [
      {
        label: "DATABASES",
        items: [
          { name: "MongoDB", icon: "/images/whatiuse/database/mongodb.png" },
          { name: "MySQL", icon: "/images/whatiuse/database/mysql.png" },
          { name: "PostgreSQL", icon: "/images/whatiuse/database/postgresql.jpg" },
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    subtitle: "Dev Environment",
    gradient: "from-cyan-700 to-green-800",
    panels: [
      {
        label: "IDE",
        items: [
          { name: "VS Code", icon: "/images/whatiuse/ide/vscode.png" },
          { name: "PyCharm", icon: "/images/whatiuse/ide/pycharm.png" },
        ],
      },
      {
        label: "PLATFORMS",
        items: [
          { name: "GitHub", icon: "/images/whatiuse/platform/github.png" },
          { name: "LeetCode", icon: "/images/whatiuse/platform/leetcode-color.png" },
          { name: "HackerRank", icon: "/images/whatiuse/platform/hackerrank-color.png" },
        ],
      },
      {
        label: "AI TOOLS",
        items: [
          { name: "Claude", icon: "/images/tools/claude.png" },
          { name: "OpenAI", icon: "/images/tools/openai.png" },
          { name: "Codex", icon: "/images/tools/codex.png" },
        ],
      },
    ],
  },
  {
    id: "iuse",
    title: "I Use",
    subtitle: "Daily Stack",
    gradient: "from-emerald-800 to-cyan-900",
    panels: [
      {
        label: "OPERATING SYSTEM",
        items: [
          { name: "Windows", icon: "/images/whatiuse/os/windows.png" },
          { name: "Android", icon: "/images/whatiuse/os/android.png" },
          { name: "iOS", icon: "/images/whatiuse/os/ios.jpg" },
        ],
      },
      {
        label: "3D & CREATIVE",
        items: [
          { name: "Three.js", icon: "/images/whatiuse/languages/threejs.png" },
          { name: "Antigravity", icon: "/images/tools/antigravity.png" },
        ],
      },
    ],
  },
];
