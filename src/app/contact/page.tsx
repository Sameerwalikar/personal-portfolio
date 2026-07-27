import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Contact | ${portfolioData.person.fullName}`,
  description: "Get in touch via email or schedule a call.",
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
