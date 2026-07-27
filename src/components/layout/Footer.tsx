import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { SocialIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const { person, socials } = portfolioData;

  return (
    <footer className="border-t border-border/60 bg-surface/50">
      <div className="section-container flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-foreground">{person.fullName}</p>
          <p className="mt-1 text-sm text-muted">{person.title} · <span className="india-underline">{person.location}</span></p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent hover:glow-ring"
              aria-label={social.label}
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-muted sm:text-right">
          © {year} {person.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
