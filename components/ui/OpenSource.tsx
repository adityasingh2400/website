'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge } from 'lucide-react';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 15200,
  },
  {
    name: 'Stanford DSPy',
    logo: '/logos/stanford.avif',
    stars: 22500,
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 8700,
  },
];

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(count);
}

function AnimatedStarCount({ target, inView }: { target: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span>{formatStars(display)}</span>;
}

const CENTER = { x: 50, y: 50 };

const LEAVES = [
  { x: 12, y: 30 },
  { x: 75, y: 12 },
  { x: 78, y: 82 },
];

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-36 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]">
            Code in the repos you use.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[1rem] text-[var(--muted)] sm:mt-5 sm:text-lg">
            Merged PRs across three major open-source projects.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16" style={{ aspectRatio: '5 / 3' }}>
          {/* SVG lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" fill="none">
            {LEAVES.map((leaf, i) => (
              <motion.line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={leaf.x}
                y2={leaf.y}
                stroke="var(--foreground)"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
            {LEAVES.map((leaf, i) => (
              <motion.circle
                key={`dot-${i}`}
                r="0.8"
                fill="var(--foreground)"
                initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                animate={isInView ? {
                  cx: [CENTER.x, leaf.x],
                  cy: [CENTER.y, leaf.y],
                  opacity: [0, 0.4, 0],
                } : {}}
                transition={{
                  duration: 2.5,
                  delay: 0.8 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              />
            ))}
          </svg>

          {/* Center node */}
          <motion.div
            className="absolute z-10"
            style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--foreground)] bg-[var(--foreground)] text-white shadow-[0_0_50px_rgba(17,17,17,0.25)] sm:h-18 sm:w-18 md:h-20 md:w-20">
              <GitMerge size={28} strokeWidth={2} />
            </div>
          </motion.div>

          {/* Leaf nodes */}
          {contributions.map((c, i) => (
            <motion.div
              key={c.name}
              className="absolute z-10"
              style={{ left: `${LEAVES[i].x}%`, top: `${LEAVES[i].y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-16 w-16 object-contain drop-shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28"
                />
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[var(--foreground)] sm:text-[16px]">
                    {c.name}
                  </p>
                  <div className="mt-0.5 flex items-center justify-center gap-1.5">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span className="text-[15px] font-bold tabular-nums text-[var(--foreground)] sm:text-[18px]">
                      <AnimatedStarCount target={c.stars} inView={isInView} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
