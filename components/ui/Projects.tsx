'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    <section id="work" className="relative flex min-h-[100svh] flex-col px-5 sm:px-8" ref={ref}>
      <div className="chapter-shell my-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[clamp(1.9rem,5.5vw,2.8rem)] leading-[1] tracking-[-0.01em] text-[var(--foreground)]">
            Things I&apos;ve built
          </h2>
        </motion.div>

        <div className="mt-6 sm:mt-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.05, ease }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 border-t border-[var(--line)] py-4 last:border-b sm:py-5"
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: project.accent }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="font-display text-[1.4rem] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--muted-strong)] sm:text-[1.7rem]">
                    {project.title}
                  </span>
                  <span className="mt-1 line-clamp-1 text-[0.88rem] leading-relaxed text-[var(--muted)] sm:text-[0.94rem]">
                    {project.summary}
                  </span>
                </span>
                <ArrowUpRight
                  size={17}
                  className="self-center text-[var(--muted)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://github.com/adityasingh2400"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          More on GitHub
          <ArrowUpRight size={14} />
        </motion.a>
      </div>
    </section>
  );
}
