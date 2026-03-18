'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const chips = ['agents', 'voice', 'full-stack', 'research'];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative px-5 py-20 sm:px-8 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--muted)] sm:text-sm">About</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-[var(--foreground)] sm:mt-4">
            I build agent systems and voice products.
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-[var(--muted)] sm:mt-6 sm:text-[1.15rem]">
            CS at UCSB, engineering lead at Ryft AI, building Ziri on the side. Background in robotics research at Cambridge and an IEEE publication at MIT URTC.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--foreground)] sm:px-4 sm:py-2 sm:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
