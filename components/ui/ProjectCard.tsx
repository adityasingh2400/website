'use client';

import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid md:grid-cols-12 gap-4 items-center py-8">
      {/* Project image/placeholder */}
      <div 
        className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        <Link href={`/projects/${project.slug}`} className="block group">
          <div 
            className="relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 group-hover:border-accent"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderColor: 'var(--card-border)' 
            }}
          >
            {/* Placeholder gradient */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(135deg, var(--accent) 0%, transparent 50%)`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold opacity-10">
                {project.title.charAt(0)}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        </Link>
      </div>

      {/* Project content */}
      <div 
        className={`md:col-span-5 ${isEven ? 'md:order-2 md:text-right' : 'md:order-1'}`}
      >
        <p className="text-accent text-sm font-mono mb-2">Featured Project</p>
        
        <h3 className="text-xl font-semibold mb-4">
          <Link 
            href={`/projects/${project.slug}`}
            className="hover:text-accent transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <div 
          className="p-5 rounded-lg mb-4 shadow-lg"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <p className="text-muted text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <ul className={`flex flex-wrap gap-3 mb-4 text-sm text-muted ${isEven ? 'md:justify-end' : ''}`}>
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech} className="font-mono text-xs">
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className={`flex items-center gap-4 ${isEven ? 'md:justify-end' : ''}`}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Live site"
            >
              <ExternalLink size={20} />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-muted hover:text-accent transition-colors flex items-center gap-1 text-sm"
          >
            Case Study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
