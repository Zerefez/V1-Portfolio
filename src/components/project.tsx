"use client";

import React from "react";

interface ProjectProps {
  index: number;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>;
}

export default function Project({ index, title, setModal }: ProjectProps) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="group flex sm:flex-row w-full justify-between items-center p-[50px] px-[100px] border-t border-gray-300 cursor-pointer transition-opacity duration-200 hover:opacity-50 last:border-b"
    >
      <h2 className=" md:text-[60px] pr-10 sm:text-[40px] m-0 font-normal transition-transform duration-400 group-hover:-translate-x-2">
        {title}
      </h2>
      <p className="pl-10 font-light sm:text-[12px] md:text-[20px] transition-transform duration-400 group-hover:translate-x-2">
        Design & Development
      </p>
    </div>
  );
}
