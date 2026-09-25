"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { IconHover3D } from "@/components/ui/icon-3d-hover";

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
    <IconHover3D
      heading="Mail Me"
      text="Prefer email? Reveal my address and reach out directly."
      className="w-full max-w-xl"
    >
      {!revealed ? (
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="w-auto"
          onClick={() => setRevealed(true)}
        >
          Mail Me
        </Button>
      ) : (
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 transition-opacity duration-300">
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
    </IconHover3D>
  );
}

