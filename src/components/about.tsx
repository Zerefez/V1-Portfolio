import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.05"]
  });

  // Create an opacity transformation for the scroll progress
  const opacity = useTransform(scrollYProgress, [1, 1], [0, 1]);
  
  // Define the words of the paragraph
  const words = "Software technology student at Aarhus University with a passion for building and optimizing digital systems. Always eager to learn, solve problems, and refine technology. A strong team player with a customer-focused mindset, bringing both technical skills and a practical, hands-on approach. Looking for real-world challenges to grow and make an impact.".split(" ");

  return (
    <section id="about" className="w-full h-screen">
      <div className="w-[80wh] h-[80vh] flex items-center justify-center rounded-[50px] overflow-hidden bg-neutral-950">
      <motion.div
        ref={container}
        style={{ opacity }}
        className="w-full max-w-7xl flex justify-between relative flex-col sm:flex-row"
      >
        {/* About Title on the left (not animated) */}
        <div className="flex flex-col items-start">
          <h1 className="text-white text-5xl font-bold uppercase px-10 py-10 justify-start ">I am</h1>
        </div>
        
        {/* Word Paragraph on the right (animated) */}
        <div className="w-full max-w-3xl text-center items-end px-10">
          <motion.p className="text-white md:text-4xl sm:text-xl md:leading-7 sm:leading-3 flex flex-wrap max-w-[70ch] uppercase md:px-0">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </motion.p>
        </div>
      </motion.div>
      </div>

    </section>
  );
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mr-3 mt-3">
      {/* Split word into characters and apply animation */}
      {children.split("").map((char: string, i: number) => { // Explicit types for `char` and `i`
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]} char={char} />
        );
      })}
    </span>
  );
};

const Char: React.FC<{char: string, progress: MotionValue<number>, range: [number, number]}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span>
      {/* Shadow effect for the character */}
      <span className="absolute opacity-20">{char}</span>
      {/* Animated character opacity */}
      <motion.span
      style={{ opacity }}
      className="">
        {char}
      </motion.span>
    </span>
  );
};
