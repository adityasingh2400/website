'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/projects';

const accentColors: Record<string, string> = {
  ziri: '#8b5cf6',
  'ryft-ai': '#22d3ee',
  'soft-robot-system': '#34d399',
  'soft-continuum-research': '#ec4899',
};

export default function ProjectPage() {
  const params = useParams();
  const project = getProjectBySlug(params.slug as string);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];
  const accent = accentColors[project.slug] || 'var(--accent)';

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <div className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16">
          <p className="text-xs tracking-wider uppercase mb-4" style={{ color: accent }}>
            {project.role} &middot; {project.year}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  color: accent,
                  background: `${accent}15`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: accent, color: '#000' }}
              >
                <ExternalLink size={14} />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full glass font-medium transition-colors hover:text-[var(--accent)]"
              >
                <Github size={14} />
                Source
              </a>
            )}
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full glass font-medium transition-colors hover:text-[var(--accent)]"
              >
                <FileText size={14} />
                Paper
              </a>
            )}
          </div>
        </header>

        {/* Case study content */}
        <article className="space-y-14">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-sm" style={{ color: accent }}>01</span>
              The Problem
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-sm" style={{ color: accent }}>02</span>
              The Approach
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.approach}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-sm" style={{ color: accent }}>03</span>
              The Solution
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.solution}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-sm" style={{ color: accent }}>04</span>
              The Impact
            </h2>
            <ul className="space-y-3">
              {project.impact.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* Project navigation */}
        <nav
          className="mt-20 pt-12"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="group">
                <span className="text-xs block mb-1" style={{ color: 'var(--muted)' }}>
                  Previous
                </span>
                <span className="text-lg font-medium group-hover:text-[var(--accent)] transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="group text-right">
                <span className="text-xs block mb-1" style={{ color: 'var(--muted)' }}>
                  Next
                </span>
                <span className="text-lg font-medium group-hover:text-[var(--accent)] transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
