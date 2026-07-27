"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { CometCard } from "@/components/ui/comet-card";
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
            className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto"
          >
            {/* Mail Me Card wrapped in CometCard */}
            <motion.div variants={cardVariants} className="w-full flex justify-center">
              <CometCard className="w-full max-w-md">
                <MailMePanel />
              </CometCard>
            </motion.div>

            {/* Schedule Call Card wrapped in CometCard */}
            <motion.div variants={cardVariants} className="w-full flex justify-center">
              <CometCard className="w-full max-w-md">
                <ScheduleCallPanel />
              </CometCard>
            </motion.div>

            {/* Direct copy email bar */}
            <motion.div 
              variants={cardVariants}
              className="w-full max-w-md glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/5">
                  <Mail className="h-5 w-5 text-accent/80" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted">Or copy email directly</p>
                  <p className="text-sm font-medium text-foreground">{person.email}</p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 hover:text-accent text-foreground transition-all duration-200 border border-white/5 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                    <span className="text-emerald-500">Copied!</span>
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
