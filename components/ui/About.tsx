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
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 sm:gap-10 xl:grid-cols-[300px_minmax(0,1fr)]"
        >
          <div>
            <p className="lab-eyebrow mb-3 sm:mb-4">About</p>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.05em] text-[var(--foreground)]">
              CS at UCSB. SWE Lead at Ryft AI.
            </h2>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-6 sm:text-lg">
              Building Ziri, a voice OS. Background in robotics, computer vision, and ML research at Cambridge.
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-12">
            <div className="lab-panel p-4 sm:p-6 md:col-span-7 md:translate-y-8">
              <p className="font-display text-[clamp(1.5rem,4.5vw,3.4rem)] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                I mostly build full stack infra, voice products, and agent systems.
              </p>
            </div>
            <div className="lab-panel p-4 sm:p-5 md:col-span-5 md:ml-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Ryft
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">
                Building commission automation infra and multi-agent backend systems.
              </p>
            </div>
            <div className="lab-panel p-4 sm:p-5 md:col-span-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Side projects
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">
                Ziri, workflow tools, and whatever AI product idea I am trying next.
              </p>
            </div>
            <div className="lab-panel p-4 sm:p-5 md:col-span-4 md:translate-y-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Vibecoding
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">
                Basically stress-testing agentic IDEs and seeing how much real work I can get out of them.
              </p>
            </div>
            <div className="lab-panel p-4 sm:p-5 md:col-span-4 md:ml-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                School
              </p>
              <p className="mt-2 text-base text-[var(--foreground)] sm:text-lg">UCSB CS, class of 2027</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-3 grid-cols-2 sm:mt-14 sm:gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {quickFacts.map((item) => (
            <div key={item.label} className="lab-panel p-4 sm:p-5">
              <p className="font-display text-[clamp(1.4rem,4vw,3.2rem)] leading-none tracking-[-0.04em] text-[var(--foreground)]">
                {item.value}
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:mt-4 sm:text-[10px]">
                {item.label}
              </p>
              <p className="mt-2 text-[0.75rem] text-[var(--muted)] sm:mt-3 sm:text-sm">{item.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-[180px_minmax(0,1fr)]"
        >
          <p className="lab-eyebrow pt-2">Stack</p>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.title} className="lab-panel p-4 sm:p-5">
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
                  style={{ color: group.accent }}
                >
                  {group.title}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 border border-[var(--line)] bg-[rgba(255,255,255,0.52)] px-2 py-2 text-[0.8rem] text-[var(--foreground)] sm:gap-3 sm:px-3 sm:py-3 sm:text-sm"
                    >
                      <div
                        aria-hidden="true"
                        className="h-7 w-7 flex-shrink-0 rounded-md bg-contain bg-center bg-no-repeat sm:h-8 sm:w-8"
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
