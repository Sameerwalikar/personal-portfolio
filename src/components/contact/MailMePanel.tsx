"use client";

import { useState } from "react";
import { Copy, Check, Mail, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";

export function MailMePanel() {
  const { person } = portfolioData;
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass glow-ring rounded-2xl p-6 sm:p-8 border border-white/10 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-500/30 transition-all duration-300">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
        <Mail className="h-6 w-6 text-accent" aria-hidden />
      </div>

      <h2 className="text-xl font-semibold text-foreground">Mail Me</h2>
      <p className="mt-2 text-sm text-muted">
        Prefer email? Reveal my address and reach out directly.
      </p>

      {!revealed ? (
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="mt-6 w-full sm:w-auto"
          onClick={() => setRevealed(true)}
        >
          Mail Me
        </Button>
      ) : (
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 transition-opacity duration-300">
          <p className="text-sm font-medium text-muted">Gmail</p>
          <p className="mt-1 break-all text-lg font-semibold text-accent">
            {person.email}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              href={`mailto:${person.email}?subject=Hello%20from%20your%20portfolio`}
              variant="outline"
              size="sm"
              external
            >
              <ExternalLink className="h-4 w-4" />
              Open in Mail
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
