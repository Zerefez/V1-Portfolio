"use client";

import { links } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// Motion Variants
const menuVariants = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

// MobileMenu Component
const MobileMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => (
  <button
    className={`hamburger hamburger--vortex fixed bottom-6 right-6 z-[1000] scale-50 ${
      isOpen ? "is-active" : "is-close"
    }`}
    type="button"
    onClick={toggleMenu}
  >
    <span className="hamburger-box">
      <span className="hamburger-inner"></span>
    </span>
  </button>
);

// NavigationLinks Component
const NavigationLinks = ({
  isMobile,
  isOpen,
}: {
  isMobile: boolean;
  isOpen: boolean;
}) => {
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-[80px] right-12 w-[100px] p-3 rounded-lg z-[999] bg-white/20 backdrop-blur-lg dark:bg-optimum-grey/10 origin-bottom"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={menuVariants}
          >
            <motion.ul className="flex flex-col items-center">
              {links.map((link, i) => (
                <motion.li
                  key={link.hash}
                  variants={menuVariants}
                  custom={i}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Link
                    className="flex w-full justify-center py-1 px-2 text-[12px] hover:text-neutral-950 transition"
                    href={link.hash}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop navbar
  return (
    <div className="fixed bottom-6 left-1/2 w-[20rem] sm:w-[40rem] h-[3rem] flex items-center justify-around rounded-[10px] translate-x-[-50%] opacity-100 scale-100 z-[999] bg-white/20 backdrop-blur-lg dark:bg-optimum-grey/10">
      <ul className="w-[22rem] flex justify-center gap-y-2 sm:flex-nowrap sm:gap-5">
        {links.map((link) => (
          <li
            className="flex items-center justify-center relative"
            key={link.hash}
          >
            <Link
              className="flex w-full justify-center py-2 px-2 hover:text-neutral-950 transition"
              href={link.hash}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const mobileView = window.innerWidth < 1040;
        setIsMobile(mobileView);
        if (!mobileView) setIsOpen(false); // Close menu on desktop
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="z-[999] relative font-[family-name:var(--font-space-mono)]">
      <NavigationLinks isMobile={isMobile} isOpen={isOpen} />
      {isMobile && <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />}
    </header>
  );
}
