'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const project = getProjectBySlug(params.slug as string);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-accent hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Get adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  // Color accents for different projects
  const accentColors: Record<string, string> = {
    'ryft': '#22d3ee',
    'ml-soft-robotics': '#a78bfa',
    'ftc-robotics': '#34d399',
    'web-curriculum': '#f472b6',
  };

  const accent = accentColors[project.slug] || 'var(--accent)';

  return (
    <main className="min-h-screen py-20">
      {/* Back link */}
      <div className="container mb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>

      {/* Header */}
      <header className="container mb-16">
        <div className="max-w-3xl">
          <p className="font-mono text-sm mb-4" style={{ color: accent }}>
            Case Study
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted mb-6">{project.description}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted mb-8">
            <div>
              <span className="block text-foreground font-medium">Role</span>
              {project.role}
            </div>
            <div>
              <span className="block text-foreground font-medium">Year</span>
              {project.year}
            </div>
            <div>
              <span className="block text-foreground font-medium">Stack</span>
              {project.technologies.slice(0, 3).join(', ')}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-background rounded font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accent }}
              >
                <ExternalLink size={16} />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border text-foreground rounded font-medium hover:text-accent transition-colors"
                style={{ borderColor: 'var(--card-border)' }}
              >
                <Github size={16} />
                Source Code
              </a>
            )}
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border text-foreground rounded font-medium hover:text-accent transition-colors"
                style={{ borderColor: 'var(--card-border)' }}
              >
                <FileText size={16} />
                Read Paper
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Project image placeholder */}
      <div className="container mb-20">
        <div 
          className="aspect-video rounded-lg overflow-hidden border"
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--card-border)' 
          }}
        >
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, transparent 50%)`
            }}
          >
            <span 
              className="text-8xl font-bold opacity-20"
              style={{ color: accent }}
            >
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Case study content */}
      <article className="container">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* The Problem */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="font-mono text-lg" style={{ color: accent }}>01.</span>
              The Problem
            </h2>
            <p className="text-muted leading-relaxed">{project.problem}</p>
          </section>

          {/* The Approach */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="font-mono text-lg" style={{ color: accent }}>02.</span>
              The Approach
            </h2>
            <p className="text-muted leading-relaxed">{project.approach}</p>
          </section>

          {/* The Solution */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="font-mono text-lg" style={{ color: accent }}>03.</span>
              The Solution
            </h2>
            <p className="text-muted leading-relaxed">{project.solution}</p>
          </section>

          {/* The Impact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="font-mono text-lg" style={{ color: accent }}>04.</span>
              The Impact
            </h2>
            <ul className="space-y-3">
              {project.impact.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted">
                  <span style={{ color: accent }} className="mt-1">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech stack */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: `${accent}15`,
                    color: accent
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Project navigation */}
      <nav className="container mt-20 pt-12 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group"
            >
              <span className="text-sm text-muted block mb-1">Previous</span>
              <span className="text-lg font-medium group-hover:text-accent transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group text-right"
            >
              <span className="text-sm text-muted block mb-1">Next</span>
              <span className="text-lg font-medium group-hover:text-accent transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </main>
  );
}
