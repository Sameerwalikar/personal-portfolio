export interface BadgeItem {
  src: string;
  alt: string;
  href: string;
}

/* GCP — 21 numbered images */
const GCP_LINK = "https://www.skills.google/public_profiles/70a61c1d-1398-4f0b-916f-6d02f41f255c";
const gcpBadges: BadgeItem[] = Array.from({ length: 21 }, (_, i) => ({
  src: `/images/badges/gcp/${i}.png`,
  alt: `Google Cloud skill badge ${i + 1}`,
  href: GCP_LINK,
}));

/* Cisco */
const ciscoBadges: BadgeItem[] = [
  {
    src: "/images/badges/cisco/cisco.png",
    alt: "Cisco certification badge",
    href: "https://www.credly.com/earner/earned/badge/b0957858-375d-415e-ab2b-4a319e799b38",
  },
];

/* Coding — keyword-matched */
const HACKERRANK = "https://www.hackerrank.com/profile/sameenaraj01";
const LEETCODE   = "https://leetcode.com/u/SameerWalikar/";

const codingBadges: BadgeItem[] = [
  { src: "/images/badges/coding/python.svg",          alt: "HackerRank Python badge",           href: HACKERRANK },
  { src: "/images/badges/coding/problem-solving.svg", alt: "HackerRank Problem Solving badge",  href: HACKERRANK },
  { src: "/images/badges/coding/50-days.png",         alt: "LeetCode 50-day streak badge",      href: LEETCODE   },
];

/* GitHub */
const GITHUB_LINK = "https://github.com/Sameerwalikar";
const githubBadges: BadgeItem[] = [
  { src: "/images/badges/github/pull-shark.png", alt: "GitHub Pull Shark badge",  href: GITHUB_LINK },
  { src: "/images/badges/github/quickdraw.png",  alt: "GitHub Quickdraw badge",   href: GITHUB_LINK },
  { src: "/images/badges/github/yolo.png",       alt: "GitHub YOLO badge",        href: GITHUB_LINK },
];

export interface BadgeGroup {
  label: string;
  badges: BadgeItem[];
}

export const BADGE_GROUPS: BadgeGroup[] = [
  { label: "Google Cloud",  badges: gcpBadges    },
  { label: "Cisco",         badges: ciscoBadges  },
  { label: "Coding",        badges: codingBadges },
  { label: "GitHub",        badges: githubBadges },
];

/** Flat list — used by the badge grid */
export const ALL_BADGES: BadgeItem[] = [
  ...gcpBadges,
  ...ciscoBadges,
  ...codingBadges,
  ...githubBadges,
];
