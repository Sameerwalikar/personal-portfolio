import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Education />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </>
  );
}
