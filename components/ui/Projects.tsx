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

  if (!activeProject) {
    return null;
  }

  return (
    <section id="projects" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <div className="grid gap-8 sm:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] xl:gap-14">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 max-w-2xl sm:mb-8"
            >
              <p className="lab-eyebrow mb-3 sm:mb-4">Projects</p>
              <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
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
                className="lab-panel overflow-hidden p-4 sm:p-6 md:p-8"
                style={{
                  borderColor: activeProject.accent,
                  background: `linear-gradient(180deg, rgba(255,255,255,0.56), rgba(255,255,255,0.28)), ${activeProject.accentSoft}`,
                }}
              >
                <div
                  className="pointer-events-none absolute right-3 top-1 font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-[-0.08em] opacity-10 sm:right-5 sm:top-2"
                  style={{ color: activeProject.accent }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>

                <div className="relative">
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mb-4 sm:gap-3 sm:text-[10px]">
                    <span>{activeProject.eyebrow}</span>
                    <span>{activeProject.updatedLabel}</span>
                  </div>

                  <h3 className="font-display text-[clamp(2rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.055em] text-[var(--foreground)]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
                    {activeProject.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-6 sm:gap-x-4 sm:gap-y-2 sm:text-[10px]">
                    <span>{activeProject.role}</span>
                    <span>{activeProject.year}</span>
                    <span>{activeProject.primaryLanguage ?? activeProject.stack[0]}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                    <Link
                      href={`/projects/${activeProject.slug}`}
                      className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-3 sm:text-[11px]"
                    >
                      Details
                      <ArrowRight size={14} />
                    </Link>
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-4 sm:py-3 sm:text-[11px]"
                    >
                      <Github size={14} />
                      Source
                    </a>
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-4 sm:py-3 sm:text-[11px]"
                      >
                        Live
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-2 sm:space-y-3">
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
