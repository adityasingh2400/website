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
    proof: ['40 REST endpoints', '30k ARR', '350-400 hours saved / quarter'],
    highlights: [
      'Architected a scalable Python/FastAPI backend spanning 40 REST endpoints for a 3-tier multi-agent orchestrator.',
      'Designed an autonomous tool-driven loop for extracting commission logic from messy PDF contracts with high-accuracy structured output.',
      'Engineered pgvector-based context systems and memory compaction to cut recurring LLM cost by 60-70%.',
      'Built validation tooling that removed 350-400 hours of manual QA per quarter.',
    ],
  },
  {
    company: 'Techno G.O.A.Ts',
    role: 'Co-Founder & Team Captain',
    location: 'Fremont, CA',
    period: 'Sep 2018 — Jan 2024',
    accent: '#8b5cf6',
    summary:
      'Co-founded a robotics nonprofit. Built competition robots, led the team, and mentored students.',
    proof: ['30+ robots modeled', '4 years mentoring', '$5k Apple grant'],
    highlights: [
      '3D-modeled 30+ competition robots and ran weekly build sprints across mechanical, software, and strategy work.',
      'Built a TensorFlow/OpenCV vision pipeline that reduced autonomous task latency by 40%+ at 96% detection accuracy.',
      'Mentored neurodivergent learners through a 4-year Serendipity STEM partnership and helped secure a $5k Apple grant.',
    ],
  },
  {
    company: 'University of Cambridge / IEEE',
    role: 'Soft Robotics Research Collaborator',
    location: 'Cambridge, UK',
    period: '2023',
    accent: '#0f766e',
    summary:
      'Worked on soft robotics research at Cambridge and turned it into published work.',
    proof: ['IEEE publication', 'MIT URTC presenter', 'Cambridge collaboration'],
    highlights: [
      'Worked on learned forward-kinematics approaches for soft continuum robots where analytical models break down.',
      'Formalized the project into research rigorous enough to publish and present outside the lab.',
      'Used the research process itself as a training ground for making complex technical systems explainable.',
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 max-w-3xl sm:mb-10"
        >
          <p className="lab-eyebrow mb-3 sm:mb-4">Experience</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.96] tracking-[-0.05em] text-[var(--foreground)]">
            Work, robotics, and research.
          </h2>
          <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
            The main thread is building real systems and making them useful to other people.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid gap-4 border-t border-[var(--line)] pt-6 sm:gap-6 sm:pt-8 lg:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div className="flex items-center gap-3 lg:block">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  {exp.period}
                </p>
                <p className="text-[0.8rem] text-[var(--muted)] lg:mt-3 lg:text-sm">{exp.location}</p>
              </div>

              <div className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]" style={{ color: exp.accent }}>
                    {exp.company}
                  </p>
                  <h3 className="mt-2 font-display text-[1.6rem] leading-[0.94] tracking-[-0.045em] text-[var(--foreground)] sm:text-[2.8rem]">
                    {exp.role}
                  </h3>
                  <p className="mt-3 max-w-3xl text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-lg">
                    {exp.summary}
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:mt-6 sm:gap-3">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:gap-3 sm:text-base"
                      >
                        <span
                          className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full sm:mt-2"
                          style={{ backgroundColor: exp.accent }}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lab-panel p-4 sm:p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                    Proof points
                  </p>
                  <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
                    {exp.proof.map((item) => (
                      <div key={item} className="border border-[var(--line)] bg-[rgba(255,255,255,0.32)] p-3 sm:p-4">
                        <p className="text-[0.8rem] font-medium text-[var(--foreground)] sm:text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
