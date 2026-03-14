import Image from 'next/image';
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
  const infoItems = [
    project.category,
    project.updatedLabel,
    project.liveUrl ? 'Live product available' : 'Repository-first project',
    `${project.capabilities.length} shipped capabilities`,
  ];

  return (
    <main className="min-h-screen px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="lab-shell">
        <div className="mb-8 sm:mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)] sm:text-[11px]"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>
        </div>

        <header className="grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="lab-eyebrow mb-3 sm:mb-4">
              {project.eyebrow} / {project.updatedLabel}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.065em] text-[var(--foreground)]">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-[0.9rem] leading-relaxed text-[var(--muted-strong)] sm:mt-5 sm:text-xl">
              {project.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-5 sm:gap-x-4 sm:gap-y-2 sm:text-[10px]">
              <span>{project.role}</span>
              <span>{project.year}</span>
              <span>{project.primaryLanguage ?? project.stack[0]}</span>
              <span>{project.status}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-3 sm:text-[11px]"
              >
                <Github size={14} />
                Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-4 sm:py-3 sm:text-[11px]"
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
                  className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-4 sm:py-3 sm:text-[11px]"
                >
                  <FileText size={14} />
                  Paper
                </a>
              )}
            </div>
          </div>

          <aside
            className="lab-panel p-4 sm:p-6"
            style={{
              borderColor: project.accent,
              background: `linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.28)), ${project.accentSoft}`,
            }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
              Project info
            </p>

            <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
              {infoItems.map((item) => (
                <div key={item} className="border border-[var(--line)] bg-[rgba(255,255,255,0.36)] p-3 text-[0.8rem] text-[var(--foreground)] sm:p-4 sm:text-sm">
                  {item}
                </div>
              ))}

              <div className="border border-[var(--line)] bg-[rgba(255,255,255,0.36)] p-3 sm:p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.8rem] text-[var(--muted)] sm:mt-3 sm:gap-y-2 sm:text-sm">
                  {project.stack.slice(0, 6).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </header>

        <section className="mt-10 grid gap-3 sm:mt-14 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div
            className="lab-panel p-5 sm:p-6 md:p-8"
            style={{
              borderColor: project.accent,
              background: `linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.34)), ${project.accentSoft}`,
            }}
          >
            <p className="lab-eyebrow">What this project proves</p>
            <h2 className="mt-4 max-w-4xl font-display text-[1.8rem] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)] sm:text-[2.8rem]">
              {project.heroStatement}
            </h2>
            <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-lg">
              {project.description}
            </p>
          </div>

          <aside className="border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-5 sm:p-6">
            <p className="lab-eyebrow">Readme takeaway</p>
            <p className="mt-4 text-[1rem] leading-relaxed text-[var(--foreground)] sm:text-[1.08rem]">
              {project.pullQuote}
            </p>
          </aside>
        </section>

        {project.showcase && (
          <section className="mt-10 sm:mt-14">
            <figure className="overflow-hidden rounded-[28px] border border-[var(--line-strong)] bg-[rgba(255,255,255,0.58)] shadow-[var(--shadow-strong)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[rgba(255,255,255,0.78)] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.accent }} />
                    <span className="block h-2.5 w-2.5 rounded-full bg-[rgba(17,17,17,0.18)]" />
                    <span className="block h-2.5 w-2.5 rounded-full bg-[rgba(17,17,17,0.1)]" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                    {project.showcase.eyebrow}
                  </span>
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  {project.showcase.kind === 'video' ? 'Motion proof' : 'Surface proof'}
                </span>
              </div>

              {project.showcase.kind === 'video' ? (
                <video
                  className="block aspect-video w-full bg-black object-cover"
                  poster={project.showcase.poster}
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={project.showcase.alt}
                >
                  <source src={project.showcase.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={project.showcase.src}
                  alt={project.showcase.alt}
                  width={1440}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="block h-auto w-full"
                />
              )}

              <figcaption className="grid gap-3 border-t border-[var(--line)] bg-[rgba(255,255,255,0.78)] px-4 py-4 sm:px-6 sm:py-5 md:grid-cols-[180px_minmax(0,1fr)]">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  {project.showcase.eyebrow}
                </p>
                <p className="text-[0.88rem] leading-relaxed text-[var(--muted-strong)] sm:text-base">
                  {project.showcase.caption}
                </p>
              </figcaption>
            </figure>
          </section>
        )}

        <section className="mt-10 grid gap-2 grid-cols-1 sm:mt-14 sm:gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="lab-panel p-4 sm:p-5"
              style={{ background: 'rgba(255,255,255,0.42)' }}
            >
              <p className="font-display text-2xl leading-none tracking-[-0.05em] text-[var(--foreground)] sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:mt-4 sm:text-[10px]">
                {metric.label}
              </p>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-2 sm:text-sm">{metric.note}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 sm:mt-14">
          <article className="space-y-8 sm:space-y-12">
            {project.modules.map((module, index) => (
              <section key={module.title} className="border-t border-[var(--line)] pt-6 sm:pt-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
                    style={{ color: project.accent }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-[1.6rem] leading-[0.95] tracking-[-0.045em] text-[var(--foreground)] sm:text-[2.5rem]">
                      {module.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-[var(--muted-strong)] sm:mt-4 sm:text-base">
                      {module.narrative}
                    </p>
                    <ul className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
                      {module.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:gap-3 sm:text-base"
                        >
                          <span
                            className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full sm:mt-2"
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

        <nav className="mt-14 border-t border-[var(--line)] pt-8 sm:mt-20 sm:pt-10">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group border border-[var(--line)] bg-[rgba(255,255,255,0.3)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] active:scale-[0.99] sm:p-5"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  Previous project
                </p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] sm:mt-3 sm:text-[2rem]">
                  {prevProject.title}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">{prevProject.summary}</p>
              </Link>
            ) : (
              <div className="border border-dashed border-[var(--line)] p-4 text-[0.8rem] text-[var(--muted)] sm:p-5 sm:text-sm">
                Start of the pinned sequence.
              </div>
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group border border-[var(--line)] bg-[rgba(255,255,255,0.3)] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] active:scale-[0.99] sm:p-5 md:text-right"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  Next project
                </p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] sm:mt-3 sm:text-[2rem]">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">{nextProject.summary}</p>
              </Link>
            ) : (
              <div className="border border-dashed border-[var(--line)] p-4 text-[0.8rem] text-[var(--muted)] sm:p-5 sm:text-sm md:text-right">
                End of the pinned sequence.
              </div>
            )}
          </div>

          <div className="mt-5 sm:mt-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-[11px]"
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
