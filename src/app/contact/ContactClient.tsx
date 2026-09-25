"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";
import { portfolioData } from "@/data/portfolio";

const MailMePanel = dynamic(() => import("@/components/contact/MailMePanel").then((mod) => mod.MailMePanel), { ssr: false });
const ScheduleCallPanel = dynamic(() => import("@/components/contact/ScheduleCallPanel").then((mod) => mod.ScheduleCallPanel), { ssr: false });

export function ContactClient() {
  const { person } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <FloatingPathsBackground position={-1} className="min-h-screen w-full overflow-hidden">
      <div className="pt-28 pb-20 relative">
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <div className="h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[100px]"></div>
        </div>

        <div className="section-container max-w-2xl relative z-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
            Back to portfolio
          </Link>

          {/* Page Header */}
          <div className="mb-10 text-center md:text-left">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-accent mb-2 uppercase">
              Get in touch
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Contact {person.firstName}
            </h1>
            <p className="mt-3 text-muted">
              Choose how you&apos;d like to connect — email or a scheduled call.
            </p>
          </div>

          {/* Staggered Panels Centered as a Group */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-6 max-w-xl mx-auto w-full"
          >
            {/* Mail Me Card wrapped in IconHover3D */}
            <motion.div variants={cardVariants} className="w-full">
              <MailMePanel />
            </motion.div>

            {/* Schedule Call Card wrapped in IconHover3D */}
            <motion.div variants={cardVariants} className="w-full">
              <ScheduleCallPanel />
            </motion.div>

            {/* Direct copy email bar aligned with cards above */}
            <motion.div 
              variants={cardVariants}
              className="w-full glass rounded-[18px] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-surface shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted">Or copy email directly</p>
                  <p className="text-sm font-semibold text-foreground">{person.email}</p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-surface-elevated hover:bg-accent/15 hover:text-accent text-foreground transition-all duration-200 border border-border hover:border-accent/40 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent animate-pulse" />
                    <span className="text-accent">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </FloatingPathsBackground>
  );
}
