import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin, Trophy, Zap } from 'lucide-react';
import { milestones, isWin } from '@/lib/milestones';

export const metadata: Metadata = {
  title: 'Hackathons · Aditya Singh',
  description:
    'The full stories from a stretch of weekend hackathons, from BeachHacks at CSULB to a voice-agents build at Y Combinator HQ.',
};

export default function HackathonsPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-16 sm:px-8 sm:pt-20">
      <div className="chapter-shell">
        <Link
          href="/#hackathons"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)] sm:text-[11px]"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <header className="mt-8 sm:mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
            Hackathons
          </p>
          <h1 className="mt-2.5 font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-[1.02] tracking-[-0.01em] text-[var(--foreground)]">
            Building under a clock
          </h1>
          <p className="mt-3.5 max-w-[58ch] text-[0.98rem] leading-relaxed text-[var(--muted)] sm:text-[1.08rem]">
            I build something new most weekends. Here is the full story from a recent stretch, from
            a beach in Long Beach to Y Combinator&apos;s HQ.
          </p>
        </header>

        <div className="mt-8 sm:mt-12">
          {milestones.map((milestone) => {
            const won = isWin(milestone.outcome);
            return (
              <article
                key={milestone.id}
                className="grid gap-x-8 gap-y-3 border-t border-[var(--line)] py-7 last:border-b sm:grid-cols-[160px_1fr] sm:py-8"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {milestone.date}
                  </p>
                  <div
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      borderColor: milestone.accent,
                      backgroundColor: milestone.accentSoft,
                      color: milestone.accent,
                    }}
                  >
                    {won ? <Trophy size={12} /> : <Zap size={12} />}
                    {milestone.outcome}
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-[1.7rem] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)] sm:text-[2.1rem]">
                    {milestone.project}
                  </h2>
                  <p className="mt-1 text-[0.92rem] font-semibold text-[var(--muted-strong)]">
                    {milestone.event}
                  </p>
                  <p className="mt-2.5 max-w-[52ch] text-[0.93rem] leading-relaxed text-[var(--muted)] sm:text-[1rem]">
                    {milestone.summary}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {milestone.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-2.5 text-[0.86rem] leading-snug text-[var(--muted)]"
                      >
                        <span
                          className="mt-[0.55rem] block h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: milestone.accent }}
                          aria-hidden
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    <MapPin size={12} />
                    {milestone.location}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
