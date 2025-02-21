"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "../lib/data";

interface ModalProps {
  modal: { active: boolean; index: number };
}

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Modal({ modal }: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this code runs only on the client

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  if (!isClient || isMobile) return null; // Avoid SSR issues and hide on mobile

  return (
    <>
      {/* Modal Container (Tracks Mouse, Responsive Size) */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="fixed flex items-center justify-center overflow-hidden pointer-events-none"
        style={{
          width: window.innerWidth < 640 ? "300px" : "400px",
          height: window.innerWidth < 640 ? "250px" : "350px",
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: index * -100 + "%" }}
        >
          {projects.map((project, idx) => (
            <div
              key={`modal_${idx}`}
              className="h-full w-full flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <Image src={`/images/${project.src}`} width={250} height={0} alt="image" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor Effect (Scaled for Small Screens) */}
      <motion.div
        ref={cursor}
        className="fixed rounded-full bg-[#455CE9] text-white flex items-center justify-center text-sm font-light pointer-events-none z-10"
        style={{
          width: window.innerWidth < 640 ? "50px" : "80px",
          height: window.innerWidth < 640 ? "50px" : "80px",
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>

      {/* Cursor Label (Hides on Small Screens) */}
      <motion.div
        ref={cursorLabel}
        className="fixed flex items-center justify-center text-sm font-light pointer-events-none z-10"
        style={{
          display: window.innerWidth < 640 ? "none" : "flex",
          width: "80px",
          height: "80px",
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}
