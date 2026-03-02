'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/projects';

const accentColors: Record<string, string> = {
  ryft: '#22d3ee',
  'ml-soft-robotics': '#8b5cf6',
  'ftc-robotics': '#34d399',
  'web-curriculum': '#ec4899',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const accent = accentColors[project.slug] || 'var(--accent)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div
          className="glass relative overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-opacity-30"
          style={{
            '--card-accent': accent,
          } as React.CSSProperties}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accent}08, transparent 60%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs tracking-wider uppercase mb-1" style={{ color: accent }}>
                  {project.role} &middot; {project.year}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-[var(--accent)] transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <ArrowUpRight
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
                style={{ color: accent }}
              />
            </div>

            <p
              className="text-sm sm:text-base leading-relaxed mb-6"
              style={{ color: 'var(--muted)' }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    color: 'var(--muted)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
