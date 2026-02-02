'use client';

import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, FileText } from 'lucide-react';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  // Color accents for different projects
  const accentColors: Record<string, string> = {
    'ryft': '#22d3ee',
    'ml-soft-robotics': '#a78bfa',
    'ftc-robotics': '#34d399',
    'web-curriculum': '#f472b6',
  };

  const accent = accentColors[project.slug] || 'var(--accent)';

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
            {/* Gradient background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, transparent 60%)`
              }}
            />
            {/* Project initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-7xl font-bold opacity-20"
                style={{ color: accent }}
              >
                {project.title.charAt(0)}
              </span>
            </div>
            {/* Year badge */}
            <div 
              className="absolute top-4 right-4 px-2 py-1 rounded text-xs font-mono"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: accent }}
            >
              {project.year}
            </div>
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: accent }}
            />
          </div>
        </Link>
      </div>

      {/* Project content */}
      <div 
        className={`md:col-span-5 ${isEven ? 'md:order-2 md:text-right' : 'md:order-1'}`}
      >
        <p className="text-sm font-mono mb-2" style={{ color: accent }}>
          Featured Project
        </p>
        
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
          <p className="text-xs text-muted mt-3 opacity-70">
            {project.role}
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
          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Paper"
            >
              <FileText size={20} />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-muted hover:text-accent transition-colors flex items-center gap-1 text-sm"
          >
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
