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
    <section className="relative px-6 py-24 sm:py-32" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-[340px_minmax(0,1fr)]"
        >
          <div>
            <p className="lab-eyebrow mb-4">Education</p>
            <h3 className="font-display text-[2.2rem] leading-[0.96] tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.8rem]">
              University of California, Santa Barbara
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              B.S. in Computer Science. GPA 3.97. Expected graduation 2027.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="lab-panel p-5">
                <p className="font-display text-4xl leading-none tracking-[-0.05em] text-[var(--foreground)]">
                  3.97
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  GPA
                </p>
              </div>
              <div className="lab-panel p-5">
                <p className="font-display text-4xl leading-none tracking-[-0.05em] text-[var(--foreground)]">
                  2027
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Expected graduation
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="lab-panel p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Relevant coursework
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {coursework.map((course) => (
                  <div
                    key={course}
                    className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-3 py-2 text-sm text-[var(--foreground)]"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            <div className="lab-panel p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Outside class
              </p>
              <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
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
