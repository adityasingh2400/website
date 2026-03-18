'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-20" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-[var(--line)] pt-6 sm:pt-8"
        >
          <p className="lab-eyebrow mb-4 sm:mb-5">Education</p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4">
            <span className="font-display text-[1.3rem] leading-none tracking-[-0.04em] text-[var(--foreground)] sm:text-[2rem]">
              UCSB
            </span>
            <span className="text-[0.85rem] text-[var(--muted)] sm:text-base">B.S. Computer Science</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[11px]">3.97 GPA</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[11px]">Class of 2027</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
