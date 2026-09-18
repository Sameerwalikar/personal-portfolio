"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, ExternalLink, Award, Cpu, Terminal, BarChart2, Shield } from "lucide-react";
import { FolderItem } from "@/data/folders";
import { BADGE_GROUPS } from "@/data/badgeLinks";
import { CERTIFICATES } from "@/data/certificates";

interface FinderModalProps {
  folder: FolderItem | null;
  onClose: () => void;
}

export function FinderModal({ folder, onClose }: FinderModalProps) {
  const [activeTab, setActiveTab] = useState<string>("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Track system or document data-theme attribute
  useEffect(() => {
    const checkTheme = () => {
      const docTheme = document.body.getAttribute("data-theme");
      if (docTheme === "light") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Lenis smooth scroll stop on open, resume on close + ESC key handling
  useEffect(() => {
    if (!folder) return;

    // Stop Lenis if available
    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    if (win.__lenis) {
      win.__lenis.stop();
    }
    document.body.style.overflow = "hidden";

    // Set initial active tab based on folder
    if (folder.id === "stats") setActiveTab("github");
    else if (folder.id === "badges") setActiveTab("github-badges");
    else if (folder.id === "achievements") setActiveTab("all-certs");
    else if (folder.id === "hobbies") setActiveTab("languages");
    else if (folder.id === "system-info") setActiveTab("laptop");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (win.__lenis) {
        win.__lenis.start();
      }
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [folder, onClose]);

  if (!folder) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Finder Window */}
        <motion.div
          className="relative flex h-[85vh] max-h-[640px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="finder-title"
        >
          {/* ── Titlebar with macOS Window Controls ── */}
          <div className="flex h-11 items-center justify-between border-b border-border/60 bg-surface-elevated/80 px-4 select-none">
            {/* Traffic Light Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close window"
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] transition-opacity hover:opacity-80"
              >
                <X className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Minimize window"
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] transition-opacity hover:opacity-80"
              >
                <Minus className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                type="button"
                aria-label="Maximize window"
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] transition-opacity hover:opacity-80"
              >
                <Square className="h-1.5 w-1.5 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            {/* Folder Title */}
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
              <span className="h-2 w-2 rounded-full bg-accent/70" />
              <span id="finder-title">{folder.title}</span>
              <span className="text-muted/60">— Finder</span>
            </div>

            {/* Right spacer to balance center alignment */}
            <div className="w-12 text-right">
              <span className="text-[10px] text-muted">{folder.count}</span>
            </div>
          </div>

          {/* ── Main Layout: Sidebar Tabs + Content Area ── */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-44 sm:w-52 shrink-0 border-r border-border/60 bg-surface/50 p-3 overflow-y-auto">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted/60">
                Categories
              </p>

              {folder.id === "stats" && (
                <div className="space-y-1">
                  <SidebarButton
                    active={activeTab === "github"}
                    onClick={() => setActiveTab("github")}
                    icon="/images/whatiuse/platform/github.png"
                    label="GitHub Stats"
                  />
                  <SidebarButton
                    active={activeTab === "leetcode"}
                    onClick={() => setActiveTab("leetcode")}
                    icon="/images/whatiuse/platform/leetcode-color.png"
                    label="LeetCode Stats"
                  />
                </div>
              )}

              {folder.id === "badges" && (
                <div className="space-y-1">
                  <SidebarButton
                    active={activeTab === "github-badges"}
                    onClick={() => setActiveTab("github-badges")}
                    icon="/images/whatiuse/platform/github.png"
                    label="GitHub Badges"
                  />
                  <SidebarButton
                    active={activeTab === "coding-badges"}
                    onClick={() => setActiveTab("coding-badges")}
                    icon="/images/whatiuse/platform/hackerrank-color.png"
                    label="Coding & LeetCode"
                  />
                  <SidebarButton
                    active={activeTab === "gcp-badges"}
                    onClick={() => setActiveTab("gcp-badges")}
                    icon="/images/badges/gcp/0.png"
                    label="Google Cloud (GCP)"
                  />
                  <SidebarButton
                    active={activeTab === "cisco-badges"}
                    onClick={() => setActiveTab("cisco-badges")}
                    icon="/images/badges/cisco/cisco.png"
                    label="Cisco Network"
                  />
                </div>
              )}

              {folder.id === "achievements" && (
                <div className="space-y-1">
                  <SidebarButton
                    active={activeTab === "all-certs"}
                    onClick={() => setActiveTab("all-certs")}
                    icon="/images/cert-btn.png"
                    label="All Certificates"
                  />
                </div>
              )}

              {folder.id === "hobbies" && (
                <div className="space-y-1">
                  <SidebarButton
                    active={activeTab === "languages"}
                    onClick={() => setActiveTab("languages")}
                    icon="/images/whatiuse/languages/typescript.png"
                    label="Languages & Frameworks"
                  />
                  <SidebarButton
                    active={activeTab === "database"}
                    onClick={() => setActiveTab("database")}
                    icon="/images/whatiuse/database/mongodb.png"
                    label="Databases"
                  />
                  <SidebarButton
                    active={activeTab === "tools"}
                    onClick={() => setActiveTab("tools")}
                    icon="/images/whatiuse/ide/vscode.png"
                    label="IDEs & AI Tools"
                  />
                  <SidebarButton
                    active={activeTab === "platforms"}
                    onClick={() => setActiveTab("platforms")}
                    icon="/images/whatiuse/platform/github.png"
                    label="Platforms & OS"
                  />
                </div>
              )}

              {folder.id === "system-info" && (
                <div className="space-y-1">
                  <SidebarButton
                    active={activeTab === "laptop"}
                    onClick={() => setActiveTab("laptop")}
                    icon="/images/whatiuse/os/windows.png"
                    label="ASUS Gaming V16"
                  />
                  <SidebarButton
                    active={activeTab === "mobile"}
                    onClick={() => setActiveTab("mobile")}
                    icon="/images/whatiuse/os/ios.jpg"
                    label="Apple iPhone 13"
                  />
                </div>
              )}
            </aside>

            {/* Content Pane */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* ── 1. Stats Tabs ── */}
              {folder.id === "stats" && (
                <div className="space-y-6">
                  {activeTab === "github" && (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-foreground">GitHub Contributions & Streak</h4>
                        <a
                          href="https://github.com/Sameerwalikar"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          Visit Profile <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <StatCard
                          title="Total Contributions"
                          url={`https://gitpulse-sable.vercel.app/api/svg/Sameerwalikar/card/total-contributions?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Current Streak"
                          url={`https://gitpulse-sable.vercel.app/api/svg/Sameerwalikar/card/current-streak?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Longest Streak"
                          url={`https://gitpulse-sable.vercel.app/api/svg/Sameerwalikar/card/longest-streak?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Active Ratio"
                          url={`https://gitpulse-sable.vercel.app/api/svg/Sameerwalikar/card/active-ratio?theme=${theme}&year=2026`}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "leetcode" && (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-foreground">LeetCode Stats & Activity</h4>
                        <a
                          href="https://leetcode.com/u/SameerWalikar/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          Visit Profile <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <StatCard
                          title="Total Solved"
                          url={`https://gitpulse-sable.vercel.app/api/leetcode/svg/SameerWalikar/card/total-solved?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Max Streak"
                          url={`https://gitpulse-sable.vercel.app/api/leetcode/svg/SameerWalikar/card/max-streak?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Solutions"
                          url={`https://gitpulse-sable.vercel.app/api/leetcode/svg/SameerWalikar/card/solutions?theme=${theme}&year=2026`}
                        />
                        <StatCard
                          title="Views"
                          url={`https://gitpulse-sable.vercel.app/api/leetcode/svg/SameerWalikar/card/views?theme=${theme}&year=2026`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── 2. Badges Tabs ── */}
              {folder.id === "badges" && (
                <div>
                  {activeTab === "github-badges" && (
                    <BadgeSection
                      title="GitHub Special Badges"
                      badges={BADGE_GROUPS.find((g) => g.label === "GitHub")?.badges || []}
                    />
                  )}
                  {activeTab === "coding-badges" && (
                    <BadgeSection
                      title="Competitive Programming Badges"
                      badges={BADGE_GROUPS.find((g) => g.label === "Coding")?.badges || []}
                    />
                  )}
                  {activeTab === "gcp-badges" && (
                    <BadgeSection
                      title="Google Cloud Skill Badges"
                      badges={BADGE_GROUPS.find((g) => g.label === "Google Cloud")?.badges || []}
                    />
                  )}
                  {activeTab === "cisco-badges" && (
                    <BadgeSection
                      title="Cisco Certification Badges"
                      badges={BADGE_GROUPS.find((g) => g.label === "Cisco")?.badges || []}
                    />
                  )}
                </div>
              )}

              {/* ── 3. Certificates Tab ── */}
              {folder.id === "achievements" && (
                <div>
                  <h4 className="mb-4 text-sm font-bold text-foreground">Verified Certificates & Credentials</h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {CERTIFICATES.map((cert) => (
                      <div
                        key={cert.src}
                        className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-surface-elevated/70 p-2 transition-all hover:border-accent/40"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background/50">
                          <Image
                            src={cert.src}
                            alt={cert.alt}
                            fill
                            sizes="200px"
                            className="object-contain p-1 transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="truncate text-xs font-semibold text-foreground">{cert.title}</p>
                          <p className="truncate text-[10px] text-muted">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 4. I Use Tabs ── */}
              {folder.id === "hobbies" && (
                <div className="space-y-4">
                  {activeTab === "languages" && (
                    <ToolGrid
                      title="Languages & Frameworks"
                      items={[
                        { name: "Python", icon: "/images/whatiuse/languages/python.png" },
                        { name: "TypeScript", icon: "/images/whatiuse/languages/typescript.png" },
                        { name: "JavaScript", icon: "/images/whatiuse/languages/js.png" },
                        { name: "React", icon: "/images/whatiuse/languages/react.png" },
                        { name: "Next.js", icon: "/images/whatiuse/languages/next.png" },
                        { name: "Node.js", icon: "/images/whatiuse/languages/nodejs.png" },
                        { name: "Tailwind CSS", icon: "/images/whatiuse/languages/tailwind.png" },
                        { name: "Three.js", icon: "/images/whatiuse/languages/threejs.png" },
                        { name: "HTML5", icon: "/images/whatiuse/languages/html.png" },
                        { name: "CSS3", icon: "/images/whatiuse/languages/css.jpg" },
                        { name: "Bootstrap", icon: "/images/whatiuse/languages/bootstrap.jpg" },
                        { name: "Express.js", icon: "/images/whatiuse/languages/expressjs.png" },
                      ]}
                    />
                  )}

                  {activeTab === "database" && (
                    <ToolGrid
                      title="Databases & Storage"
                      items={[
                        { name: "MongoDB", icon: "/images/whatiuse/database/mongodb.png" },
                        { name: "MySQL", icon: "/images/whatiuse/database/mysql.png" },
                        { name: "PostgreSQL", icon: "/images/whatiuse/database/postgresql.jpg" },
                      ]}
                    />
                  )}

                  {activeTab === "tools" && (
                    <ToolGrid
                      title="IDEs & Modern AI Assistants"
                      items={[
                        { name: "VS Code", icon: "/images/whatiuse/ide/vscode.png" },
                        { name: "PyCharm", icon: "/images/whatiuse/ide/pycharm.png" },
                        { name: "Claude AI", icon: "/images/tools/claude.png" },
                        { name: "OpenAI ChatGPT", icon: "/images/tools/openai.png" },
                        { name: "Antigravity", icon: "/images/tools/antigravity.png" },
                        { name: "Codex", icon: "/images/tools/codex.png" },
                      ]}
                    />
                  )}

                  {activeTab === "platforms" && (
                    <ToolGrid
                      title="Platforms & Operating Systems"
                      items={[
                        { name: "GitHub", icon: "/images/whatiuse/platform/github.png" },
                        { name: "LeetCode", icon: "/images/whatiuse/platform/leetcode-color.png" },
                        { name: "HackerRank", icon: "/images/whatiuse/platform/hackerrank-color.png" },
                        { name: "Windows 11", icon: "/images/whatiuse/os/windows.png" },
                        { name: "iOS", icon: "/images/whatiuse/os/ios.jpg" },
                        { name: "Android", icon: "/images/whatiuse/os/android.png" },
                      ]}
                    />
                  )}
                </div>
              )}

              {/* ── 5. System Specs Tabs ── */}
              {folder.id === "system-info" && (
                <div>
                  {activeTab === "laptop" && (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-xl">💻</span>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">ASUS Gaming V16 (V3607)</h4>
                          <p className="text-xs text-muted">Primary Development Machine</p>
                        </div>
                      </div>

                      <div className="divide-y divide-border/40 rounded-xl border border-border/60 bg-surface-elevated/70 p-4">
                        <SpecRow label="Processor" value="Intel Core 7 240H · up to 5.2 GHz · 10C/16T" />
                        <SpecRow label="Graphics" value="NVIDIA GeForce RTX 4050 6 GB GDDR6" />
                        <SpecRow label="Integrated GPU" value="Intel Arc Graphics" />
                        <SpecRow label="Display" value="16'' FHD+ 1920×1200 · 16:10 · 144 Hz" />
                        <SpecRow label="Memory" value="16 GB DDR5" />
                        <SpecRow label="Storage" value="512 GB PCIe 4.0 NVMe SSD" />
                        <SpecRow label="Operating System" value="Windows 11 Home" />
                        <SpecRow label="Connectivity" value="Wi-Fi 6 · Bluetooth 5.3" />
                        <SpecRow label="Battery" value="63 Wh" />
                      </div>
                    </div>
                  )}

                  {activeTab === "mobile" && (
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-xl">📱</span>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">Apple iPhone 13</h4>
                          <p className="text-xs text-muted">Daily Smartphone & Testing Device</p>
                        </div>
                      </div>

                      <div className="divide-y divide-border/40 rounded-xl border border-border/60 bg-surface-elevated/70 p-4">
                        <SpecRow label="Processor" value="Apple A15 Bionic chip" />
                        <SpecRow label="Display" value="6.1'' Super Retina XDR OLED" />
                        <SpecRow label="Resolution" value="2532 × 1170 px · 460 ppi" />
                        <SpecRow label="Operating System" value="iOS (latest)" />
                        <SpecRow label="Cameras" value="Dual 12 MP (Wide & Ultra-Wide) · 4K 60fps Dolby Vision" />
                        <SpecRow label="Face Unlock" value="Face ID" />
                        <SpecRow label="Connectivity" value="5G · Wi-Fi 6 · Bluetooth 5.0" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ── Helper Components ── */
function SidebarButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all ${
        active
          ? "bg-accent/20 text-accent font-semibold shadow-sm"
          : "text-muted hover:bg-surface-elevated hover:text-foreground"
      }`}
    >
      <div className="relative h-4 w-4 shrink-0 overflow-hidden rounded-sm">
        <Image src={icon} alt="" fill sizes="16px" className="object-contain" />
      </div>
      <span className="truncate">{label}</span>
    </button>
  );
}

function StatCard({ title, url }: { title: string; url: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-surface-elevated/80 p-3 shadow-md">
      <span className="mb-2 text-xs font-semibold text-muted">{title}</span>
      <div className="relative flex min-h-[90px] w-full items-center justify-center rounded-lg bg-background/40">
        {!loaded && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        )}
        <img
          src={url}
          alt={title}
          onLoad={() => setLoaded(true)}
          className={`h-auto w-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}

function BadgeSection({
  title,
  badges,
}: {
  title: string;
  badges: { src: string; alt: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-foreground">{title}</h4>
      <div className="flex flex-wrap gap-3">
        {badges.map((b) => (
          <a
            key={b.src}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-16 w-16 items-center justify-center rounded-xl border border-border/60 bg-surface-elevated/70 p-2 transition-all hover:scale-110 hover:border-accent/40 sm:h-20 sm:w-20"
            title={b.alt}
          >
            <div className="relative h-full w-full">
              <Image src={b.src} alt={b.alt} fill sizes="80px" className="object-contain" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ToolGrid({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-foreground">{title}</h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-elevated/70 p-3 transition-all hover:border-accent/30"
          >
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-background/50 p-1">
              <Image src={tool.icon} alt={tool.name} fill sizes="28px" className="object-contain" />
            </div>
            <span className="text-xs font-medium text-foreground">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-xs">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
