"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CERTIFICATES } from "@/data/certificates";
import { CardModal } from "@/components/skills/CardModal";

const PREVIEW_COUNT = 4;

/* Single certificate thumbnail */
function CertCard({
  cert,
  onClick,
}: {
  cert: (typeof CERTIFICATES)[number];
  onClick?: () => void;
}) {
  const El = onClick ? "button" : "div";
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 0 28px rgba(34,197,94,0.2)",
        transition: { type: "spring", stiffness: 360, damping: 22 },
      }}
      className="overflow-hidden rounded-xl border border-border/50 bg-surface-elevated"
    >
      <El
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={`block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${onClick ? "cursor-pointer" : ""}`}
        aria-label={onClick ? `View all certificates` : cert.title}
      >
        <div className="relative aspect-[4/3] w-full bg-background/60">
          <Image
            src={cert.src}
            alt={cert.alt}
            fill
            sizes="(max-width: 640px) 50vw, 280px"
            className="object-contain p-2"
          />
        </div>
        <div className="p-3">
          <p className="truncate text-xs font-semibold text-foreground">{cert.title}</p>
          <p className="truncate text-[10px] text-muted">{cert.issuer}</p>
        </div>
      </El>
    </motion.div>
  );
}

/* Modal: full grid of all certs */
function AllCertificates() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {CERTIFICATES.map((cert) => (
        <div
          key={cert.src}
          className="overflow-hidden rounded-xl border border-border/50 bg-surface-elevated"
        >
          <div className="relative aspect-[4/3] w-full bg-background/60">
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              sizes="280px"
              className="object-contain p-2"
            />
          </div>
          <div className="p-3">
            <p className="truncate text-xs font-semibold text-foreground">{cert.title}</p>
            <p className="truncate text-[10px] text-muted">{cert.issuer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CertificatesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const preview = CERTIFICATES.slice(0, PREVIEW_COUNT);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {preview.map((cert) => (
          <CertCard key={cert.src} cert={cert} />
        ))}
      </div>

      {CERTIFICATES.length > PREVIEW_COUNT && (
        <motion.button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-4 flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-xs font-semibold text-accent transition-all hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          View All {CERTIFICATES.length} Certificates
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </motion.button>
      )}

      <CardModal
        title="Certificates"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <AllCertificates />
      </CardModal>
    </>
  );
}
