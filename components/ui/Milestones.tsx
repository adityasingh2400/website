'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Trophy, Zap } from 'lucide-react';
import { useRef } from 'react';
import { milestones, isWin } from '@/lib/milestones';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Milestones() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="hackathons" className="relative flex min-h-[100svh] flex-col px-5 sm:px-8" ref={ref}>
      <div className="chapter-shell my-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[clamp(1.9rem,5.5vw,2.8rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            A month of building under a clock
          </h2>
          <p className="mt-3 max-w-[54ch] text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-[1.04rem]">
            I build something new most weekends. A recent stretch, from a beach in Long Beach to Y
            Combinator&apos;s HQ.
          </p>
        </motion.div>

        <div className="mt-6 sm:mt-8">
          {milestones.map((milestone, index) => {
            const won = isWin(milestone.outcome);
            return (
              <motion.article
                key={milestone.id}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.06, ease }}
                className="grid gap-x-6 gap-y-1.5 border-t border-[var(--line)] py-4 last:border-b sm:grid-cols-[130px_1fr_auto] sm:items-center sm:py-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {milestone.date}
                </p>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.3rem] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)] sm:text-[1.5rem]">
                    {milestone.project}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[0.85rem] text-[var(--muted)]">
                    {milestone.event}
                  </p>
                </div>
                <div
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    borderColor: milestone.accent,
                    backgroundColor: milestone.accentSoft,
                    color: milestone.accent,
                  }}
                >
                  {won ? <Trophy size={12} /> : <Zap size={12} />}
                  {milestone.outcome}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <Link
            href="/hackathons"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
          >
            The full stories
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
