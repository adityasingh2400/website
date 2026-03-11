'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const coursework = [
  'Data Structures & Algorithms',
  'Computer Architecture',
  'Object-Oriented Programming',
  'Linear Algebra',
  'Differential Equations',
  'Multivariable Calculus',
  'Problem Solving with C++',
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-32" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 border-t border-[var(--line)] pt-6 sm:gap-8 sm:pt-8 lg:grid-cols-[340px_minmax(0,1fr)]"
        >
          <div>
            <p className="lab-eyebrow mb-3 sm:mb-4">Education</p>
            <h3 className="font-display text-[1.6rem] leading-[0.96] tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.8rem]">
              University of California, Santa Barbara
            </h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base">
              B.S. in Computer Science. GPA 3.97. Expected graduation 2027.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
              <div className="lab-panel p-4 sm:p-5">
                <p className="font-display text-3xl leading-none tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl">
                  3.97
                </p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-3 sm:text-[10px]">
                  GPA
                </p>
              </div>
              <div className="lab-panel p-4 sm:p-5">
                <p className="font-display text-3xl leading-none tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl">
                  2027
                </p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-3 sm:text-[10px]">
                  Expected graduation
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="lab-panel p-4 sm:p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Relevant coursework
              </p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
                {coursework.map((course) => (
                  <div
                    key={course}
                    className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-2.5 py-1.5 text-[0.8rem] text-[var(--foreground)] sm:px-3 sm:py-2 sm:text-sm"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            <div className="lab-panel p-4 sm:p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Outside class
              </p>
              <div className="mt-4 grid gap-2 text-[0.8rem] text-[var(--muted)] sm:mt-5 sm:gap-3 sm:text-sm">
                <p>Building products</p>
                <p>Doing research</p>
                <p>Shipping open source work</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
