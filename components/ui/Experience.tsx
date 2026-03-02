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
    highlights: [
      'Architected a scalable Python/FastAPI backend spanning 40 REST endpoints for a 3-tier multi-agent orchestrator, driving platform to 30k ARR',
      'Designed an autonomous agentic loop using GPT-4o with 12 discrete tools, achieving 95% extraction accuracy across unstructured PDF contracts',
      'Engineered pgvector RAG with cross-session memory compaction, reducing per-session LLM costs by 60–70%',
      'Built AI validation agent eliminating 350–400 hours of manual QA per quarter',
    ],
  },
  {
    company: 'Techno G.O.A.Ts',
    role: 'Co-Founder & Team Captain',
    location: 'Fremont, CA',
    period: 'Sep 2018 — Jan 2024',
    accent: '#8b5cf6',
    highlights: [
      'Co-founded 501(c)(3) robotics nonprofit — 3D-modeled 30+ competition robots, ran weekly build sprints',
      'Engineered TensorFlow/OpenCV computer vision pipeline with CNN, reducing autonomous task latency by 40%+ at 96% detection accuracy',
      'Mentored neurodivergent learners via 4-year Serendipity STEM partnership, secured 5k Apple grant',
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-32 sm:py-40 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase mb-12"
          style={{ color: 'var(--accent)' }}
        >
          Experience
        </motion.p>

        <div className="relative">
          {/* Glowing timeline line */}
          <div
            className="absolute left-0 sm:left-4 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, var(--accent), rgba(139, 92, 246, 0.3), transparent)',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative pl-8 sm:pl-14"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 sm:left-4 top-1 w-2 h-2 rounded-full -translate-x-[3.5px]"
                  style={{
                    backgroundColor: exp.accent,
                    boxShadow: `0 0 12px ${exp.accent}60`,
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <p className="text-sm" style={{ color: exp.accent }}>
                      {exp.company}
                      <span style={{ color: 'var(--muted)' }}> — {exp.location}</span>
                    </p>
                  </div>
                  <p
                    className="text-xs tracking-wider uppercase whitespace-nowrap"
                    style={{ color: 'var(--muted)' }}
                  >
                    {exp.period}
                  </p>
                </div>

                <ul className="space-y-2.5 mt-4">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed flex items-start gap-3"
                      style={{ color: 'var(--muted)' }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: exp.accent, opacity: 0.6 }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
