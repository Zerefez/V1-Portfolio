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
    <section id="projects" className="flex h-screen w-full">
      <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-optimum-grey">
        <div className="flex items-center justify-start w-full h-[150px] md:m-20 md:p-10 sm:m-10 sm:p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 md:w-36 md:h-36 sm:w-6 sm:h-6 m-8"
          >
            <path
              fillRule="evenodd"
              d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className=" md:text-8xl sm:text-4xl text-center font-bold uppercase ">
            Projects
          </h1>
        </div>

        <div className="lg:w-[1400px] md:w-[550px] sm:w-[350px] flex flex-col items-center justify-center">
          {projects.map((project, index) => (
            <Project
              key={index}
              index={index}
              title={project.title}
              setModal={setModal}
            />
          ))}
        </div>
        <Modal modal={modal} />
      </div>
    </section>
  );
}
