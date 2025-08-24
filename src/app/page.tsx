"use client";

import About from "@/components/about";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProjectGallery from "@/components/projectGallery";
import Skill from "@/components/skill";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className="mac-w-7xl w-full font-(family-name:--font-space-sans) bg-optimum-grey">
      <Header />
      <div className="sticky top-0">
        <Hero />
      </div>
      <div className="relative w-full z-10">
        <About />

        <ProjectGallery />
        <Skill/>
      </div>
    </main>
  );
}
