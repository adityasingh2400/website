import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Github } from 'lucide-react';
import { getPinnedProjects, getProjectBySlug } from '@/lib/projects';

export const revalidate = 60 * 60;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [project, projects] = await Promise.all([
    getProjectBySlug(params.slug),
    getPinnedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <main className="min-h-screen px-6 pb-24 pt-28 sm:pt-32">
      <div className="lab-shell">
        <div className="mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>
        </div>

        <header className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="lab-eyebrow mb-4">
              {project.eyebrow} / {project.updatedLabel}
            </p>
            <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.065em] text-[var(--foreground)]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--muted-strong)] sm:text-xl">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              <span>{project.role}</span>
              <span>{project.year}</span>
              <span>{project.primaryLanguage ?? project.stack[0]}</span>
              <span>{project.status}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Github size={14} />
                Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  Live
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.paperUrl && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  <FileText size={14} />
                  Paper
                </a>
              )}
            </div>
          </div>

          <aside
            className="lab-panel p-6"
            style={{
              borderColor: project.accent,
              background: `linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.28)), ${project.accentSoft}`,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Project info
            </p>

            <div className="mt-5 grid gap-3">
              {[
                `${project.repoName} repo`,
                project.updatedLabel,
                project.liveUrl ? 'Has live link' : 'Repo only',
                `${project.stack.length} main tools`,
              ].map((item) => (
                <div key={item} className="border border-[var(--line)] bg-[rgba(255,255,255,0.36)] p-4 text-sm text-[var(--foreground)]">
                  {item}
                </div>
              ))}

              <div className="border border-[var(--line)] bg-[rgba(255,255,255,0.36)] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-[var(--muted)]">
                  {project.stack.slice(0, 6).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </header>

        <section className="mt-14 grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="lab-panel p-5"
              style={{ background: 'rgba(255,255,255,0.42)' }}
            >
              <p className="font-display text-3xl leading-none tracking-[-0.05em] text-[var(--foreground)]">
                {metric.value}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]">
                {metric.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{metric.note}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <article className="space-y-12">
            {project.modules.map((module, index) => (
              <section key={module.title} className="border-t border-[var(--line)] pt-8">
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: project.accent }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-[2rem] leading-[0.95] tracking-[-0.045em] text-[var(--foreground)] sm:text-[2.5rem]">
                      {module.title}
                    </h2>
                    <ul className="mt-5 grid gap-3">
                      {module.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base"
                        >
                          <span
                            className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: project.accent }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </article>
        </section>

        <nav className="mt-20 border-t border-[var(--line)] pt-10">
          <div className="grid gap-4 md:grid-cols-2">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group border border-[var(--line)] bg-[rgba(255,255,255,0.3)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Previous project
                </p>
                <h3 className="mt-3 font-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                  {prevProject.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{prevProject.summary}</p>
              </Link>
            ) : (
              <div className="border border-dashed border-[var(--line)] p-5 text-sm text-[var(--muted)]">
                Start of the pinned sequence.
              </div>
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group border border-[var(--line)] bg-[rgba(255,255,255,0.3)] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] md:text-right"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Next project
                </p>
                <h3 className="mt-3 font-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                  {nextProject.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{nextProject.summary}</p>
              </Link>
            ) : (
              <div className="border border-dashed border-[var(--line)] p-5 text-sm text-[var(--muted)] md:text-right">
                End of the pinned sequence.
              </div>
            )}
          </div>

          <div className="mt-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]"
            >
              Back to explorer
              <ArrowRight size={14} />
            </Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
