import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, GitMerge, GitPullRequest, Star } from 'lucide-react';
import { contributions, TOTAL_PR_COUNT, formatStars } from '@/lib/contributions';

export const metadata: Metadata = {
  title: 'Open source · Aditya Singh',
  description: `Every one of the ${TOTAL_PR_COUNT} pull requests merged into OpenAI's Agents SDK, Stanford's DSPy, and Pydantic AI.`,
};

export default function OpenSourcePage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-16 sm:px-8 sm:pt-20">
      <div className="chapter-shell">
        <Link
          href="/#open-source"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)] sm:text-[11px]"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <header className="mt-8 sm:mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
            Open source
          </p>
          <h1 className="mt-2.5 font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-[1.02] tracking-[-0.01em] text-[var(--foreground)]">
            Every merged pull request
          </h1>
          <p className="mt-3.5 max-w-[58ch] text-[0.98rem] leading-relaxed text-[var(--muted)] sm:text-[1.08rem]">
            <span className="font-medium text-[var(--foreground)]">{TOTAL_PR_COUNT} merged PRs</span> into
            the libraries behind modern AI agents. Mostly correctness fixes: race conditions, state
            that should survive a retry, schemas that should not mutate.
          </p>
        </header>

        <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
          {contributions.map((repo) => (
            <section key={repo.name}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                  <Image
                    src={repo.logo}
                    alt={repo.name}
                    width={40}
                    height={40}
                    unoptimized
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[1.1rem] font-semibold text-[var(--foreground)]">{repo.name}</h2>
                  <div className="mt-0.5 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <GitMerge size={14} className={repo.color} />
                      <span className="text-[0.84rem] font-medium tabular-nums text-[var(--foreground)]">
                        {repo.prs.length} merged
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-[0.84rem] tabular-nums text-[var(--muted)]">
                        {formatStars(repo.stars)}
                      </span>
                    </span>
                  </div>
                </div>
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                >
                  On GitHub
                  <ArrowUpRight size={13} />
                </a>
              </div>

              <ul className="mt-5 border-t border-[var(--line)]">
                {repo.prs.map((pr) => (
                  <li key={pr.url} className="border-b border-[var(--line)]">
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline gap-3 py-3 sm:gap-4"
                    >
                      <GitPullRequest
                        size={13}
                        className={`flex-shrink-0 self-center opacity-70 ${repo.color}`}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 text-[0.88rem] leading-snug text-[var(--muted-strong)] transition-colors duration-200 group-hover:text-[var(--foreground)] sm:text-[0.92rem]">
                        {pr.title}
                      </span>
                      <span className="hidden flex-shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--muted)] sm:block">
                        {pr.date}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
