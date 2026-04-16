'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    company: 'Ryft AI',
    role: 'Software Engineering Lead',
    location: 'Cupertino, CA',
    period: 'Aug 2025 — Present',
    accent: '#22d3ee',
    summary:
      'Building backend and agent systems for commission automation. Turning messy contracts into software people can trust.',
  },
  {
    company: 'Techno G.O.A.Ts',
    role: 'Co-Founder & Team Captain',
    location: 'Fremont, CA',
    period: '2018 — 2024',
    accent: '#8b5cf6',
    summary:
      'Co-founded a robotics nonprofit. Built competition robots, led the team, mentored students.',
  },
  {
    company: 'Cambridge / IEEE',
    role: 'Soft Robotics Research',
    location: 'Cambridge, UK',
    period: '2023',
    accent: '#0f766e',
    summary:
      'Soft robotics research at Cambridge. Published at IEEE, presented at MIT URTC.',
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative px-5 py-20 sm:px-8 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-[1280px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--muted)] sm:mb-10 sm:text-sm"
        >
          Experience
        </motion.p>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-[var(--line)] py-6 sm:py-8"
            >
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
                <div>
                  <p className="text-[13px] font-medium text-[var(--muted)] sm:text-sm">
                    {exp.period}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[var(--muted)] sm:text-sm">{exp.location}</p>
                </div>

                <div>
                  <p className="text-[13px] font-semibold sm:text-sm" style={{ color: exp.accent }}>
                    {exp.company}
                  </p>
                  <h3 className="mt-1 font-display text-[1.3rem] leading-[0.96] tracking-[-0.03em] text-[var(--foreground)] sm:text-[1.8rem]">
                    {exp.role}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-[1.05rem]">
                    {exp.summary}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
