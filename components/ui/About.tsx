'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  { label: '3.97 GPA', detail: 'UCSB CS' },
  { label: 'IEEE Published', detail: 'Cambridge' },
  { label: 'MIT URTC', detail: 'Presenter' },
  { label: '30k ARR', detail: 'Ryft AI' },
  { label: '1st Place', detail: 'ACSEF' },
];

const skillGroups = [
  { category: 'Languages', items: ['Python', 'Java', 'C++', 'Go', 'Rust', 'JavaScript', 'TypeScript'] },
  { category: 'AI & Frameworks', items: ['LangGraph', 'Langfuse', 'pgvector', 'FastAPI', 'TensorFlow', 'React', 'Next.js'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Bedrock', 'Lambda', 'Docker', 'Kubernetes', 'GitHub Actions'] },
  { category: 'Data & Tools', items: ['PostgreSQL', 'Supabase', 'RESTful APIs', 'Git', 'Linux', 'Prometheus'] },
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
            <span style={{ color: 'var(--foreground)' }}>UC Santa Barbara</span>{' '}
            building AI/LLM systems and full-stack products. Currently an SWE Intern at{' '}
            <span style={{ color: 'var(--foreground)' }}>Ryft AI</span>{' '}
            where I architect multi-agent orchestrators and LLM pipelines.
            Published at{' '}
            <span style={{ color: 'var(--foreground)' }}>IEEE</span>, presented at{' '}
            <span style={{ color: 'var(--foreground)' }}>MIT URTC</span>, researched at{' '}
            <span style={{ color: 'var(--foreground)' }}>Cambridge</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-3 mb-16"
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
          className="space-y-6"
        >
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--accent)', opacity: 0.7 }}
              >
                {group.category}
              </p>
              <p className="text-sm leading-loose" style={{ color: 'var(--muted)' }}>
                {group.items.map((skill, i) => (
                  <span key={skill}>
                    <span className="inline-block transition-colors duration-200 hover:text-[var(--accent)] cursor-default">
                      {skill}
                    </span>
                    {i < group.items.length - 1 && (
                      <span className="mx-2 opacity-20">/</span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
