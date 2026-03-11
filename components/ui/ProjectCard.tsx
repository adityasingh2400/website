'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

export function ProjectCard({ project, index, isActive, onSelect }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className="group w-full border p-4 text-left transition-all duration-300 active:scale-[0.99] sm:p-5 md:p-6"
      style={{
        borderColor: isActive ? project.accent : 'var(--line)',
        background: isActive ? project.accentSoft : 'rgba(255, 255, 255, 0.3)',
        boxShadow: isActive ? `0 18px 48px ${project.accentSoft}` : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="mt-1 h-8 w-px flex-shrink-0 sm:h-10" style={{ background: isActive ? project.accent : 'var(--line-strong)' }} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:gap-3 sm:text-[10px]">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span style={{ color: isActive ? project.accent : 'var(--muted)' }}>{project.eyebrow}</span>
            </div>
            <h3 className="mt-2 font-display text-[1.4rem] leading-[0.92] tracking-[-0.045em] text-[var(--foreground)] sm:mt-3 sm:text-[2rem]">
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-3 sm:gap-x-4 sm:gap-y-2 sm:text-[10px]">
              <span>{project.primaryLanguage ?? project.stack[0]}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>

        <div className="hidden flex-shrink-0 sm:flex sm:pt-1">
          <ArrowUpRight
            size={18}
            className={`transition-transform duration-300 ${
              isActive ? 'translate-x-0.5 -translate-y-0.5' : ''
            } text-[var(--foreground)]`}
          />
        </div>
      </div>
    </motion.button>
  );
}
