
import React from "react";
import Image from "next/image";
import { Trophy, Medal, Award, FileText, Users } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export function Achievements() {
  const { achievements } = portfolioData;

  // Map achievement IDs to icons and images
  const cardData = achievements.map((achievement) => {
    let Icon = Award;
    let imageSrc = "";
    let gridClass = "";

    switch (achievement.id) {
      case "backend-heist":
        Icon = Trophy;
        imageSrc = "/images/achievement/gdg.jpg";
        gridClass = "lg:col-span-2 lg:row-span-1";
        break;
      case "build-with-ai":
        Icon = Trophy;
        imageSrc = "/images/achievement/bwai.jpg";
        gridClass = "lg:col-span-1 lg:row-span-2 h-full lg:h-[45rem]";
        break;
      case "sih-2025":
        Icon = Medal;
        imageSrc = "/images/achievement/sih.jpg";
        gridClass = "lg:col-span-1 lg:row-span-1";
        break;
      case "edc-lor":
        Icon = FileText;
        imageSrc = "/images/achievement/lor.jpg";
        gridClass = "lg:col-span-1 lg:row-span-1";
        break;
      case "techbizz":
        Icon = Users;
        imageSrc = ""; // No image, gradient background instead
        gridClass = "lg:col-span-2 lg:row-span-1";
        break;
      default:
        Icon = Award;
        imageSrc = "";
        gridClass = "lg:col-span-1 lg:row-span-1";
    }

    return {
      ...achievement,
      Icon,
      imageSrc,
      gridClass,
    };
  });

  return (
    <section id="achievements" className="py-24 sm:py-32" aria-labelledby="achievements-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition & Impact"
          description="Hackathon wins, national competition rankings, and leadership recognition from industry partners."
        />

        <BentoGrid className="lg:grid-rows-3 lg:auto-rows-auto">
          {cardData.map((card) => {
            const background = card.imageSrc ? (
              <div className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={card.id === "backend-heist" || card.id === "build-with-ai"}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-950/20 opacity-60 transition-all duration-300 group-hover:from-emerald-500/15">
                <Users className="absolute right-4 bottom-4 h-32 w-32 text-emerald-500/5 transform translate-x-4 translate-y-4" />
              </div>
            );

            return (
              <BentoCard
                key={card.id}
                name={card.title}
                className={card.gridClass}
                description={card.description || ""}
                Icon={card.Icon}
                background={background}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
