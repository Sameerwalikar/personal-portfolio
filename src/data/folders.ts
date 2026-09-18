export interface FolderPreviewItem {
  icon: string;
  label: string;
  sublabel?: string;
}

export interface FolderItem {
  id: "stats" | "badges" | "achievements" | "hobbies" | "system-info";
  title: string;
  count: string;
  category: string;
  previewPapers: {
    title: string;
    items: FolderPreviewItem[];
    type?: "stats" | "badges" | "certs" | "tools" | "specs";
  }[];
}

export const FOLDERS_DATA: FolderItem[] = [
  {
    id: "stats",
    title: "Stats",
    count: "8 Metrics",
    category: "Activity & Analytics",
    previewPapers: [
      {
        title: "GitHub Pulse",
        type: "stats",
        items: [
          { icon: "/images/whatiuse/platform/github.png", label: "Contributions", sublabel: "300+ Active" },
          { icon: "/images/badges/github/pull-shark.png", label: "Pull Requests", sublabel: "25+ Merged" },
        ],
      },
      {
        title: "LeetCode Data",
        type: "stats",
        items: [
          { icon: "/images/whatiuse/platform/leetcode-color.png", label: "Problems Solved", sublabel: "150+ Solved" },
          { icon: "/images/badges/coding/100-days.png", label: "Streak Record", sublabel: "100+ Days" },
        ],
      },
      {
        title: "Overview",
        type: "stats",
        items: [
          { icon: "/images/whatiuse/platform/hackerrank-color.png", label: "HackerRank Stars", sublabel: "5★ Python/SQL" },
          { icon: "/images/badges/coding/problem-solving.svg", label: "Problem Solving", sublabel: "Gold Level" },
        ],
      },
    ],
  },
  {
    id: "badges",
    title: "Badges",
    count: "32 Badges",
    category: "Achievements & Trophies",
    previewPapers: [
      {
        title: "GitHub Trophies",
        type: "badges",
        items: [
          { icon: "/images/badges/github/pull-shark.png", label: "Pull Shark" },
          { icon: "/images/badges/github/yolo.png", label: "YOLO" },
          { icon: "/images/badges/github/quickdraw.png", label: "Quickdraw" },
        ],
      },
      {
        title: "Coding Streaks",
        type: "badges",
        items: [
          { icon: "/images/badges/coding/problem-solving.svg", label: "Problem Solving" },
          { icon: "/images/badges/coding/python.svg", label: "Python" },
          { icon: "/images/badges/coding/100-days.png", label: "100 Days" },
          { icon: "/images/badges/coding/50-days.png", label: "50 Days" },
        ],
      },
      {
        title: "Google Cloud",
        type: "badges",
        items: [
          { icon: "/images/badges/gcp/0.png", label: "GCP Milestone" },
          { icon: "/images/badges/gcp/1.png", label: "GCP Compute" },
          { icon: "/images/badges/gcp/2.png", label: "GCP Data" },
        ],
      },
    ],
  },
  {
    id: "achievements",
    title: "Certificates",
    count: "9 Verified",
    category: "Licenses & Certs",
    previewPapers: [
      {
        title: "Stanford & AI",
        type: "certs",
        items: [
          { icon: "/images/certificates/Sameer_Walikar_Certificate.png", label: "Sameer Walikar Cert", sublabel: "Official" },
          { icon: "/images/certificates/introtogenai.jpg", label: "Intro to GenAI", sublabel: "Google Cloud" },
        ],
      },
      {
        title: "Industry Experience",
        type: "certs",
        items: [
          { icon: "/images/certificates/forageaws.jpg", label: "AWS Experience", sublabel: "Forage × AWS" },
          { icon: "/images/certificates/foragetata.jpg", label: "Tata Virtual", sublabel: "Forage × Tata" },
        ],
      },
      {
        title: "Programming",
        type: "certs",
        items: [
          { icon: "/images/certificates/python-infosys.jpg", label: "Python", sublabel: "Infosys" },
          { icon: "/images/certificates/javascript_intermediate certificate_page-0001.jpg", label: "JS Intermediate", sublabel: "HackerRank" },
        ],
      },
    ],
  },
  {
    id: "hobbies",
    title: "I Use",
    count: "24 Tools",
    category: "Languages & Frameworks",
    previewPapers: [
      {
        title: "Core Stack",
        type: "tools",
        items: [
          { icon: "/images/whatiuse/languages/python.png", label: "Python" },
          { icon: "/images/whatiuse/languages/typescript.png", label: "TypeScript" },
          { icon: "/images/whatiuse/languages/react.png", label: "React" },
          { icon: "/images/whatiuse/languages/next.png", label: "Next.js" },
        ],
      },
      {
        title: "Dev & Database",
        type: "tools",
        items: [
          { icon: "/images/whatiuse/ide/vscode.png", label: "VS Code" },
          { icon: "/images/whatiuse/database/mongodb.png", label: "MongoDB" },
          { icon: "/images/whatiuse/database/mysql.png", label: "MySQL" },
        ],
      },
      {
        title: "Modern AI & Styling",
        type: "tools",
        items: [
          { icon: "/images/tools/claude.png", label: "Claude" },
          { icon: "/images/tools/openai.png", label: "OpenAI" },
          { icon: "/images/whatiuse/languages/tailwind.png", label: "Tailwind" },
        ],
      },
    ],
  },
  {
    id: "system-info",
    title: "System Info",
    count: "2 Devices",
    category: "Hardware & Machines",
    previewPapers: [
      {
        title: "Primary Rig",
        type: "specs",
        items: [
          { icon: "/images/whatiuse/os/windows.png", label: "ASUS Gaming V16", sublabel: "Core 7 240H · RTX 4050" },
          { icon: "/images/whatiuse/ide/vscode.png", label: "Memory / Disk", sublabel: "16GB DDR5 · 512GB SSD" },
        ],
      },
      {
        title: "Mobile Gear",
        type: "specs",
        items: [
          { icon: "/images/whatiuse/os/ios.jpg", label: "iPhone 13", sublabel: "A15 Bionic · OLED 6.1\"" },
          { icon: "/images/whatiuse/platform/github.png", label: "Connectivity", sublabel: "5G · Wi-Fi 6" },
        ],
      },
    ],
  },
];
