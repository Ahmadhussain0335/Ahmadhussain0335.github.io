import { JsonLd, homeGraph } from "@/lib/structured-data";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Highlights } from "@/components/sections/Highlights";
import { Statement } from "@/components/sections/Statement";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { Reviews } from "@/components/sections/Reviews";
import { Skills } from "@/components/sections/Skills";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Education } from "@/components/sections/Education";
import { AiAndLearning } from "@/components/sections/AiAndLearning";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <TechMarquee />
      <Highlights />
      <About />
      <Statement />
      <Experience />
      <Projects />
      <OpenSource />
      <Reviews />
      <Skills />
      <EngineeringApproach />
      <Education />
      <AiAndLearning />
      <Contact />
    </>
  );
}
