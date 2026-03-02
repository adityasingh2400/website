'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featuredProjects = getFeaturedProjects();

  return (
    <section id="projects" className="relative py-32 sm:py-40 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase mb-12"
          style={{ color: 'var(--accent)' }}
        >
          Selected Work
        </motion.p>

        <div className="grid gap-4 sm:gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
