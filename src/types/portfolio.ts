export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "leetcode" | "github" | "mail" | "phone";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  category: string;
  href?: string;
  github?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface PortfolioData {
  person: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    availability: string;
    summary: string;
    heroTagline: string;
  };
  socials: SocialLink[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  skills: SkillCategory[];
  contact: {
    headline: string;
    subheadline: string;
    perks: string[];
  };
}
