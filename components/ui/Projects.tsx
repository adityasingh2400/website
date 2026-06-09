'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { useRef } from 'react';
import type { Project } from '@/lib/projects';

interface ProjectsProps {
  projects: Project[];
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (!projects.length) return null;

  return (
    <section id="work" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24" ref={ref}>
      <div className="mx-auto w-full max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[clamp(2rem,6vw,3.2rem)] leading-[1] tracking-[-0.01em] text-[var(--foreground)]">
            Things I&apos;ve built
          </h2>
        </motion.div>

        <div className="mt-7 sm:mt-9">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.06, ease }}
              className="group border-t border-[var(--line)] py-7 last:border-b sm:py-8"
            >
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: project.accent }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-1.5 inline-flex items-center gap-2"
                  >
                    <h3 className="font-display text-[1.9rem] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--muted-strong)] sm:text-[2.4rem]">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 flex-shrink-0 text-[var(--muted)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>

                  <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-[1.02rem]">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-start gap-2 sm:justify-end">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                  >
                    Details
                    <ArrowRight size={13} />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source on GitHub`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  >
                    <Github size={13} />
                    Source
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                    >
                      Live
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.a
          href="https://github.com/adityasingh2400"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          More on GitHub
          <ArrowUpRight size={14} />
        </motion.a>
      </div>
    </section>
  );
}
