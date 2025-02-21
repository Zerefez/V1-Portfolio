"use client";

import { useState } from "react";
import Modal from "../components/modal";
import Project from "../components/project";
import { projects } from "../lib/data";


export default function ProjectGallery() {
  const [modal, setModal] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-optimum-grey">
      <div className="w-[1400px] flex flex-col items-center justify-center">
        {projects.map((project, index) => (
          <Project key={index} index={index} title={project.title} setModal={setModal} />
        ))}
      </div>
      <Modal modal={modal} />
    </div>
  );
}
