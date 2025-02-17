"use client";

import { links } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and update state
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const mobileView = window.innerWidth < 1040;
        setIsMobile(mobileView);

        // Close the menu if switching to desktop mode
        if (!mobileView) setIsOpen(false);
      };

      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Only run once after the component mounts

  return (
    <header className="z-[999] relative font-[family-name:var(--font-space-mono)]">
      {/* Floating navbar: Always visible on desktop, toggle on mobile */}
      <div
        className={`fixed z-[999] w-full bg-white/30 backdrop-blur-lg dark:bg-neutral-800/30 transition-all duration-300 ${
          isMobile
            ? "bottom-[80px] right-12 w-[150px] p-2 rounded-lg"
            : "bottom-6 left-1/2 w-[20rem] sm:w-[40rem] h-[3rem] flex items-center justify-around rounded-[10px] translate-x-[-50%] opacity-100 scale-100"
        }`}
        style={{
          display: isMobile ? (isOpen ? "block" : "none") : "flex",
        }}
      >
        <ul
          className={`flex ${
            isMobile
              ? "flex-col space-y-2 items-center"
              : "w-[22rem] flex justify-center gap-y-2 sm:flex-nowrap sm:gap-5"
          }`}
        >
          {links.map((link) => (
            <li className="flex items-center justify-center relative" key={link.hash}>
              <Link
                className="flex w-full justify-center py-2 px-2 hover:text-neutral-950 transition"
                href={link.hash}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger button for mobile */}
      {isMobile && (
        <button
          className={`hamburger hamburger--vortex fixed bottom-6 right-6 z-[1000] scale-75 ${isOpen ? "is-active" : ""}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      )}
    </header>
  );
}
