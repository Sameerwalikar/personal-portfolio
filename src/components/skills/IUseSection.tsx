"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface UseItem { name: string; icon: string; }
interface UsePanel { label: string; items: UseItem[]; }

const I_USE_PANELS: UsePanel[] = [
  {
    label: "DATABASE",
    items: [
      { name: "MongoDB",    icon: "/images/whatiuse/database/mongodb.png"   },
      { name: "MySQL",      icon: "/images/whatiuse/database/mysql.png"     },
      { name: "PostgreSQL", icon: "/images/whatiuse/database/postgresql.jpg"},
    ],
  },
  {
    label: "PLATFORM",
    items: [
      { name: "GitHub",     icon: "/images/whatiuse/platform/github.png"           },
      { name: "LeetCode",   icon: "/images/whatiuse/platform/leetcode-color.png"   },
      { name: "HackerRank", icon: "/images/whatiuse/platform/hackerrank-color.png" },
    ],
  },
  {
    label: "IDE",
    items: [
      { name: "VS Code", icon: "/images/whatiuse/ide/vscode.png" },
      { name: "PyCharm", icon: "/images/whatiuse/ide/pycharm.png"},
    ],
  },
  {
    label: "LANGUAGES",
    items: [
      { name: "Bootstrap",  icon: "/images/whatiuse/languages/bootstrap.jpg"  },
      { name: "HTML",       icon: "/images/whatiuse/languages/html.png"        },
      { name: "CSS",        icon: "/images/whatiuse/languages/css.jpg"         },
      { name: "Express.js", icon: "/images/whatiuse/languages/expressjs.png"   },
      { name: "JavaScript", icon: "/images/whatiuse/languages/js.png"          },
      { name: "Next.js",    icon: "/images/whatiuse/languages/next.png"        },
      { name: "Node.js",    icon: "/images/whatiuse/languages/nodejs.png"      },
      { name: "Python",     icon: "/images/whatiuse/languages/python.png"      },
      { name: "React",      icon: "/images/whatiuse/languages/react.png"       },
      { name: "Tailwind",   icon: "/images/whatiuse/languages/tailwind.png"    },
      { name: "Three.js",   icon: "/images/whatiuse/languages/threejs.png"     },
      { name: "TypeScript", icon: "/images/whatiuse/languages/typescript.png"  },
    ],
  },
  {
    label: "OS",
    items: [
      { name: "Windows", icon: "/images/whatiuse/os/windows.png" },
      { name: "Android", icon: "/images/whatiuse/os/android.png" },
      { name: "iOS",     icon: "/images/whatiuse/os/ios.jpg"     },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const panelVar = {
  hidden: { opacity: 0, y: 14 },
  show:  { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

export function IUseSection() {
  return (
    <motion.div
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {I_USE_PANELS.map((panel) => (
        <motion.div
          key={panel.label}
          variants={panelVar}
          className="rounded-xl border border-border/50 bg-surface-elevated p-4 transition-all duration-300 hover:border-accent/30"
        >
          <h4 className="mb-3 border-b border-border/40 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
            {panel.label}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {panel.items.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-1.5 text-center">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-background/60">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-[10px] leading-tight text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
