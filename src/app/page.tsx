'use client';

import About from '@/components/about';
import Header from '@/components/header';
import Hero from '@/components/hero';

export default function Home() {
  return (
      <main className="mac-w-7xl w-full font-[family-name:var(--font-space-sans)]">
        <Header />
        <Hero />
        <About/>
      </main>
  );
}
