"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Hero() {
  const firstText = useRef<HTMLParagraphElement | null>(null);
  const secondText = useRef<HTMLParagraphElement | null>(null);
  const xPercent = useRef(0);

  useEffect(() => {
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }

    const animate = () => {
      if (xPercent.current <= -100) {
        xPercent.current = 0;
      }
      if (xPercent.current > 0) {
        xPercent.current = -100;
      }
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
      }
      xPercent.current -= 0.1;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="w-full h-full bg-optimum-grey dark:bg-optimum-grey dark:bg-grid-small-white/[0.4] bg-grid-small-black/[0.2] flex items-center justify-center relative">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-optimum-grey dark:bg-optimum-grey [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative flex flex-row items-center justify-center w-full h-full">
          <div className="absolute top-[45%] transform -translate-y-1/2">
            <div className="relative whitespace-nowrap flex">
              <p ref={firstText} className="text-white dark:text-white text-[230px] font-medium pr-[40px]">
                John Nguyen
              </p>
              <p ref={secondText} className="absolute left-full top-0 text-white dark:text-white text-[230px] font-medium">
                John Nguyen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
