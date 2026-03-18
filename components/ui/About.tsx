'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const chips = ['agents', 'voice', 'full-stack', 'research'];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-32" ref={ref}>
      <div className="lab-shell max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="lab-eyebrow mb-3 sm:mb-4">About</p>
          <h2 className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.05em] text-[var(--foreground)]">
            I build agent systems and voice products.
          </h2>
          <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-6 sm:text-lg">
            CS at UCSB, engineering lead at Ryft AI, building Ziri on the side. Background in robotics research at Cambridge and an IEEE publication at MIT URTC.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            {chips.map((chip) => (
              <span
                key={chip}
                className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:px-4 sm:py-2 sm:text-[11px]"
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
