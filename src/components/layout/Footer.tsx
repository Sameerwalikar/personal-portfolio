
"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import dynamic from "next/dynamic";
import { LazyMounted } from "@/components/ui/lazy-mounted";

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
  { ssr: false }
);
import { Card } from "@/components/ui/Card";
import { Spotlight } from "@/components/ui/spotlight";

export function Footer() {
  const year = new Date().getFullYear();
  const { person } = portfolioData;

  return (
    <footer className="w-full">
      <Card 
        hover={false}
        className="w-full min-h-[500px] bg-black/[0.96] relative overflow-hidden rounded-none border-t border-x-0 border-b-0 border-border/60 p-0 flex flex-col md:flex-row"
      >
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Main Content Area */}
        <div className="flex flex-col-reverse md:flex-row w-full h-full min-h-[500px]">
          
          {/* Left content (Text and Info) */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Thanks for Visiting
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg text-sm md:text-base mx-auto md:mx-0">
              {"I appreciate you taking the time to explore my work. Let's build something great together."}
            </p>

            {/* Existing footer content adapted for the new layout */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col gap-4 items-center md:items-start">
              <div>
                <p className="font-semibold text-foreground">{person.fullName}</p>
                <p className="mt-1 text-sm text-muted">
                  {person.title} · <span className="india-underline">{person.location}</span>
                </p>
              </div>

              {/* Copyright */}
              <p className="text-xs text-muted">
                © {year} {person.fullName}. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right content (3D Robot Scene) */}
          <div className="flex-1 relative w-full h-[300px] md:h-auto min-h-[300px] md:min-h-0">
            
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            
          </div>

        </div>
      </Card>
    </footer>
  );
}
