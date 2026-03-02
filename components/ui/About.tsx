'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  { label: '4.0 GPA', detail: 'UCSB CS' },
  { label: 'IEEE Published', detail: 'ML Research' },
  { label: 'MIT URTC', detail: 'Presenter' },
  { label: 'Engineering Lead', detail: 'AI Products' },
];

const skills = [
  'TypeScript', 'Python', 'Next.js', 'React', 'FastAPI',
  'PostgreSQL', 'Supabase', 'LLM Pipelines', 'AWS',
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 sm:py-40 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-sm tracking-[0.2em] uppercase mb-8"
            style={{ color: 'var(--accent)' }}
          >
            About
          </p>

          <p
            className="text-xl sm:text-2xl leading-relaxed mb-12"
            style={{ color: 'var(--muted)' }}
          >
            CS student at{' '}
            <span style={{ color: 'var(--foreground)' }}>UC Santa Barbara</span>.
            I build copilots that augment human decision-making -- especially where
            spreadsheets and ambiguity create real costs. I care about{' '}
            <span style={{ color: 'var(--foreground)' }}>clarity</span>,{' '}
            <span style={{ color: 'var(--foreground)' }}>auditability</span>, and{' '}
            <span style={{ color: 'var(--foreground)' }}>shipping</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="glass-subtle px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                {item.label}
              </span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                {item.detail}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--muted)' }}
          >
            Technologies I work with
          </p>
          <p className="text-sm leading-loose" style={{ color: 'var(--muted)' }}>
            {skills.map((skill, i) => (
              <span key={skill}>
                <span
                  className="inline-block transition-colors duration-200 hover:text-[var(--accent)] cursor-default"
                >
                  {skill}
                </span>
                {i < skills.length - 1 && (
                  <span className="mx-2 opacity-30">/</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
