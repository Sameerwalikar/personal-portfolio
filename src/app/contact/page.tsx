import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MailMePanel } from "@/components/contact/MailMePanel";
import { ScheduleCallPanel } from "@/components/contact/ScheduleCallPanel";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Contact | ${portfolioData.person.fullName}`,
  description: "Get in touch via email or schedule a call.",
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  const { person } = portfolioData;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="section-container max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to portfolio
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact {person.firstName}
        </h1>
        <p className="mt-3 text-muted">
          Choose how you&apos;d like to connect — email or a scheduled call.
        </p>

        <div className="mt-10 space-y-6">
          <MailMePanel />
          <ScheduleCallPanel />
        </div>
      </div>
    </div>
  );
}
