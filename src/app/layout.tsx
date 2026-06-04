import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { person } = portfolioData;

export const metadata: Metadata = {
  title: `${person.fullName} | ${person.title}`,
  description: person.summary,
  keywords: [
    "Sameer Walikar",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Blockchain",
    "Bengaluru",
    "Computer Engineering",
  ],
  authors: [{ name: person.fullName }],
  openGraph: {
    title: `${person.fullName} | ${person.title}`,
    description: person.heroTagline,
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
