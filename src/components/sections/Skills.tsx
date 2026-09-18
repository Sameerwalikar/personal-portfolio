"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExtraBadgeRow } from "@/components/skills/ExtraBadgeRow";
import { FolderDeck } from "@/components/skills/FolderDeck";
import { FinderModal } from "@/components/skills/FinderModal";
import { FolderItem } from "@/data/folders";

export function Skills() {
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden" aria-labelledby="skills-heading">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Technical Expertise"
            title="Skills & Toolkit"
            description="Explore my technical stack, credentials, badges, metrics, and hardware via interactive folders."
          />
        </motion.div>

        {/* Floating Badges Row (Extra Badge Row) */}
        <ExtraBadgeRow />

        {/* macOS-style Folder Deck */}
        <FolderDeck onSelectFolder={(folder) => setSelectedFolder(folder)} />

        {/* Finder Detail Modal */}
        <FinderModal
          folder={selectedFolder}
          onClose={() => setSelectedFolder(null)}
        />
      </div>
    </section>
  );
}
