"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      setTextWidth(width);
    }
  }, []);

  return (
    <section id="Home" className="w-full h-screen">
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.4] flex items-center justify-center relative">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-radial-fade" />
        <div className="relative flex flex-row items-center justify-center w-full h-full">
          <div className="absolute top-[45%] transform -translate-y-1/2 w-full overflow-hidden">
            <motion.div 
              className="flex whitespace-nowrap will-change-transform"
              animate={textWidth > 0 ? {
                x: [0, -textWidth]
              } : {}}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: textWidth > 0 ? Math.max(textWidth / 60, 8) : 8,
                  ease: "linear"
                }
              }}
              style={{
                transform: textWidth === 0 ? 'translateX(0)' : undefined
              }}
            >
              <div 
                ref={textRef}
                className="flex shrink-0"
                style={{ width: textWidth > 0 ? `${textWidth}px` : 'auto' }}
              >
                <span className="text-white dark:text-white text-[150px] sm:text-[180px] md:text-[200px] lg:text-[230px] xl:text-[260px] font-medium mx-[60px] inline-block select-none whitespace-nowrap futura-hero-text">
                  John Nguyen
                </span>
              </div>
              <div 
                className="flex shrink-0"
                style={{ width: textWidth > 0 ? `${textWidth}px` : 'auto' }}
              >
                <span className="text-white dark:text-white text-[150px] sm:text-[180px] md:text-[200px] lg:text-[230px] xl:text-[260px] font-medium mx-[60px] inline-block select-none whitespace-nowrap futura-hero-text">
                  John Nguyen
                </span>
              </div>

              <div 
                className="flex shrink-0"
                style={{ width: textWidth > 0 ? `${textWidth}px` : 'auto' }}
              >
                <span className="text-white dark:text-white text-[150px] sm:text-[180px] md:text-[200px] lg:text-[230px] xl:text-[260px] font-medium mx-[60px] inline-block select-none whitespace-nowrap futura-hero-text">
                  John Nguyen
                </span>
              </div>
            </motion.div>
          </div>
        </div>


        <div className="absolute top-0 right-0 ">
          <p>
            <span className="text-white dark:text-white text-[20px] font-medium futura-hero-text">John Nguyen</span>
          </p>
        </div>
      </div>
    </div>
    </section>
  );
}
