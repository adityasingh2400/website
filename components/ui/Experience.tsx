'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    company: 'Ryft AI',
    role: 'Software Engineering Intern',
    location: 'Cupertino, CA',
    period: 'Aug 2025 — Present',
    accent: '#22d3ee',
    summary:
      'Building backend and agent systems for commission automation. A lot of the work is turning messy contracts into software people can trust.',
  },
  {
    company: 'Techno G.O.A.Ts',
    role: 'Co-Founder & Team Captain',
    location: 'Fremont, CA',
    period: 'Sep 2018 — Jan 2024',
    accent: '#8b5cf6',
    summary:
      'Co-founded a robotics nonprofit. Built competition robots, led the team, and mentored students.',
  },
  {
    company: 'University of Cambridge / IEEE',
    role: 'Soft Robotics Research Collaborator',
    location: 'Cambridge, UK',
    period: '2023',
    accent: '#0f766e',
    summary:
      'Worked on soft robotics research at Cambridge and turned it into published work.',
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative px-4 py-20 sm:px-6 sm:py-32" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-10"
        >
          <p className="lab-eyebrow mb-3 sm:mb-4">Experience</p>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-[var(--line)] py-6 sm:py-8"
            >
              <div className="grid gap-2 sm:gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                    {exp.period}
                  </p>
                  <p className="mt-1 text-[0.8rem] text-[var(--muted)] sm:text-sm">{exp.location}</p>
                </div>

                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
                    style={{ color: exp.accent }}
                  >
                    {exp.company}
                  </p>
                  <h3 className="mt-1 font-display text-[1.3rem] leading-[0.96] tracking-[-0.04em] text-[var(--foreground)] sm:mt-2 sm:text-[2rem]">
                    {exp.role}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[0.85rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-base">
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
