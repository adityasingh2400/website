'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge } from 'lucide-react';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 15200,
    position: { x: 12, y: 30 },
  },
  {
    name: 'Stanford DSPy',
    logo: '/logos/stanford.avif',
    stars: 22500,
    position: { x: 75, y: 12 },
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 8700,
    position: { x: 78, y: 82 },
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
const LEAF_LABEL_OFFSET = 'translate-y-[2.75rem] sm:translate-y-[4rem] md:translate-y-[4.5rem]';

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="open-source" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36" ref={ref}>
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
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {contributions.map(({ position }, i) => (
              <motion.line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={position.x}
                y2={position.y}
                stroke="var(--foreground)"
                strokeWidth="0.35"
                strokeOpacity="0.35"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
            {contributions.map(({ position }, i) => (
              <motion.circle
                key={`dot-${i}`}
                r="1"
                fill="var(--foreground)"
                initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                animate={isInView ? {
                  cx: [CENTER.x, position.x],
                  cy: [CENTER.y, position.y],
                  opacity: [0, 0.5, 0],
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
              className="absolute z-10 h-0 w-0"
              style={{ left: `${c.position.x}%`, top: `${c.position.y}%` }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Keep the anchor at the logo center so the SVG connector and icon share the same target. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                className="absolute left-0 top-0 h-16 w-16 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28"
              />
              <div className={`absolute left-0 top-0 min-w-max -translate-x-1/2 text-center ${LEAF_LABEL_OFFSET}`}>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
