'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, GitMerge, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { contributions, TOTAL_PR_COUNT, formatStars } from '@/lib/contributions';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="open-source" className="relative flex min-h-[100svh] flex-col px-5 sm:px-8" ref={ref}>
      <div className="chapter-shell my-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[clamp(1.9rem,5.5vw,2.8rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            I help build the tools the field runs on
          </h2>
          <p className="mt-3 max-w-[54ch] text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-[1.04rem]">
            <span className="font-medium text-[var(--foreground)]">{TOTAL_PR_COUNT} merged pull requests</span>{' '}
            into the open source libraries behind modern AI agents.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {contributions.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-4 transition-colors duration-300 hover:border-[var(--line-strong)] sm:flex-col sm:items-start sm:p-5"
            >
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
              <div className="min-w-0">
                <p className="text-[0.95rem] font-semibold text-[var(--foreground)]">{repo.name}</p>
                <div className="mt-1.5 flex items-center gap-4">
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
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <Link
            href="/open-source"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
          >
            Every merged PR
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
