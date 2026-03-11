'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const quickFacts = [
  { value: 'Ryft AI', label: 'work', detail: 'sales compensation infra' },
  { value: 'Robotics', label: 'background', detail: 'nonprofit + competition bots' },
  { value: 'Soft robotics', label: 'research', detail: 'Cambridge + ML' },
  { value: 'IEEE MIT URTC', label: 'paper + talk', detail: 'published + presented' },
];

const stackGroups = [
  {
    title: 'Languages',
    accent: '#3b82f6',
    items: [
      { label: 'Python', icon: 'python' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'Rust', icon: 'rust' },
      { label: 'Go', icon: 'go' },
    ],
  },
  {
    title: 'Frameworks',
    accent: '#22c55e',
    items: [
      { label: 'FastAPI', icon: 'fastapi' },
      { label: 'Next.js', icon: 'nextjs' },
      { label: 'React', icon: 'react' },
      { label: 'Node.js', icon: 'nodejs' },
    ],
  },
  {
    title: 'Infra & tools',
    accent: '#f59e0b',
    items: [
      { label: 'AWS', icon: 'aws' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Postgres', icon: 'postgres' },
      { label: 'Linux', icon: 'linux' },
    ],
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative px-6 py-28 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 xl:grid-cols-[300px_minmax(0,1fr)]"
        >
          <div>
            <p className="lab-eyebrow mb-4">About</p>
            <h2 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.05em] text-[var(--foreground)]">
              CS at UCSB. SWE Lead at Ryft AI.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Building Ziri, a voice OS. Background in robotics, computer vision, and ML research at Cambridge.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            <div className="lab-panel p-6 md:col-span-7 md:translate-y-8">
              <p className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                I mostly build full stack infra, voice products, and agent systems.
              </p>
            </div>
            <div className="lab-panel p-5 md:col-span-5 md:ml-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Ryft
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Building commission automation infra and multi-agent backend systems.
              </p>
            </div>
            <div className="lab-panel p-5 md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Side projects
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Ziri, workflow tools, and whatever AI product idea I am trying next.
              </p>
            </div>
            <div className="lab-panel p-5 md:col-span-4 md:translate-y-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Vibecoding
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Basically stress-testing agentic IDEs and seeing how much real work I can get out of them.
              </p>
            </div>
            <div className="lab-panel p-5 md:col-span-4 md:ml-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                School
              </p>
              <p className="mt-3 text-lg text-[var(--foreground)]">UCSB CS, class of 2027</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {quickFacts.map((item) => (
            <div key={item.label} className="lab-panel p-5">
              <p className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-[-0.04em] text-[var(--foreground)]">
                {item.value}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                {item.label}
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]"
        >
          <p className="lab-eyebrow pt-2">Stack</p>
          <div className="grid gap-4 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.title} className="lab-panel p-5">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: group.accent }}
                >
                  {group.title}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 border border-[var(--line)] bg-[rgba(255,255,255,0.52)] px-3 py-3 text-sm text-[var(--foreground)]"
                    >
                      <div
                        aria-hidden="true"
                        className="h-8 w-8 flex-shrink-0 rounded-md bg-contain bg-center bg-no-repeat"
                        style={{
                          backgroundColor: `${group.accent}12`,
                          backgroundImage: `url(https://skillicons.dev/icons?i=${item.icon})`,
                        }}
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
