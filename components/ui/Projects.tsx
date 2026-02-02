'use client';

import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

export function Projects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Section id="projects">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-12 flex items-center gap-3">
          <span className="text-accent font-mono text-lg">02.</span>
          Some Things I've Built
        </h2>

        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
