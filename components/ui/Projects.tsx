'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/projects';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];
  const activeCapabilities = activeProject?.capabilities.slice(0, 5) ?? [];

  if (!activeProject) {
    return null;
  }

  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.88fr)] xl:gap-14">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 max-w-2xl"
            >
              <p className="lab-eyebrow mb-4">Projects</p>
              <h2 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
                Pinned projects.
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="lab-panel overflow-hidden p-6 sm:p-8"
                style={{
                  borderColor: activeProject.accent,
                  background: `linear-gradient(180deg, rgba(255,255,255,0.56), rgba(255,255,255,0.28)), ${activeProject.accentSoft}`,
                }}
              >
                <div
                  className="pointer-events-none absolute right-5 top-2 font-display text-[clamp(5rem,14vw,10rem)] leading-none tracking-[-0.08em] opacity-10"
                  style={{ color: activeProject.accent }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      <span>{activeProject.eyebrow}</span>
                      <span>{activeProject.updatedLabel}</span>
                    </div>

                    <h3 className="font-display text-[clamp(3rem,6vw,4.6rem)] leading-[0.9] tracking-[-0.055em] text-[var(--foreground)]">
                      {activeProject.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                      {activeProject.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      <span>{activeProject.role}</span>
                      <span>{activeProject.year}</span>
                      <span>{activeProject.primaryLanguage ?? activeProject.stack[0]}</span>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {activeCapabilities.map((capability) => (
                        <div
                          key={capability}
                          className="border border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.38)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]"
                        >
                          {capability}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/projects/${activeProject.slug}`}
                        className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Details
                        <ArrowRight size={14} />
                      </Link>
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                      >
                        <Github size={14} />
                        Source
                      </a>
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                        >
                          Live
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative space-y-4 xl:pt-14">
                    <div className="absolute -left-6 top-8 h-24 w-24 rounded-full opacity-70 blur-2xl" style={{ background: activeProject.accentSoft }} />
                    <div className="relative grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                      {activeProject.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="border border-[var(--line)] bg-[rgba(255,255,255,0.3)] p-4"
                        >
                          <p className="font-display text-2xl leading-none tracking-[-0.04em] text-[var(--foreground)]">
                            {metric.value}
                          </p>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="relative overflow-hidden border border-[var(--line)] bg-[rgba(255,255,255,0.38)] p-5">
                      <div
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ background: `linear-gradient(90deg, ${activeProject.accent}, transparent)` }}
                      />
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
                        {activeProject.stack.slice(0, 6).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                isActive={index === activeIndex}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
