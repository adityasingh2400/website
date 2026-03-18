'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    accent: '#000000',
    accentGlow: 'rgba(0,0,0,0.1)',
    stars: 15200,
  },
  {
    name: 'Stanford DSPy',
    logo: '/logos/stanford.svg',
    accent: '#8C1515',
    accentGlow: 'rgba(140,21,21,0.12)',
    stars: 22500,
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    accent: '#E92063',
    accentGlow: 'rgba(233,32,99,0.12)',
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
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span>{formatStars(display)}</span>;
}

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const nodeDelay = (i: number) => ({
    duration: 0.8,
    delay: 0.25 + i * 0.15,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-36" ref={ref}>
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]">
            I love contributing.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[1rem] text-[var(--muted)] sm:mt-5 sm:text-lg">
            Merged PRs in all three.
          </p>
        </motion.div>

        {/* Trifecta: top center + bottom two */}
        <div className="mx-auto mt-14 max-w-3xl sm:mt-20">
          {/* Top node */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={nodeDelay(0)}
            className="flex justify-center"
          >
            <OSSNode contribution={contributions[0]} inView={isInView} />
          </motion.div>

          {/* SVG connecting lines */}
          <div className="relative mx-auto my-6 h-16 max-w-lg sm:my-8 sm:h-20">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 80"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Top center to bottom-left */}
              <motion.line
                x1="200" y1="0" x2="60" y2="80"
                stroke="var(--foreground)"
                strokeWidth="1"
                strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Top center to bottom-right */}
              <motion.line
                x1="200" y1="0" x2="340" y2="80"
                stroke="var(--foreground)"
                strokeWidth="1"
                strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Bottom-left to bottom-right */}
              <motion.line
                x1="60" y1="80" x2="340" y2="80"
                stroke="var(--foreground)"
                strokeWidth="1"
                strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          {/* Bottom two nodes */}
          <div className="flex justify-center gap-8 sm:gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={nodeDelay(1)}
            >
              <OSSNode contribution={contributions[1]} inView={isInView} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={nodeDelay(2)}
            >
              <OSSNode contribution={contributions[2]} inView={isInView} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OSSNode({ contribution, inView }: { contribution: typeof contributions[number]; inView: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center border-2 bg-[var(--surface-strong)] p-4 sm:h-24 sm:w-24 sm:p-5"
        style={{ borderColor: contribution.accent }}
        animate={inView ? {
          boxShadow: [
            `0 0 0 0px ${contribution.accentGlow}`,
            `0 0 0 14px ${contribution.accentGlow}`,
            `0 0 0 0px ${contribution.accentGlow}`,
          ],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contribution.logo}
          alt={contribution.name}
          className="h-full w-full object-contain"
        />
      </motion.div>
      <div className="text-center">
        <p className="text-[13px] font-semibold text-[var(--foreground)] sm:text-[15px]">
          {contribution.name}
        </p>
        <div className="mt-1 flex items-center justify-center gap-1.5">
          <Star size={13} className="fill-[var(--foreground)] text-[var(--foreground)]" />
          <span className="text-[13px] font-medium tabular-nums text-[var(--muted)] sm:text-sm">
            <AnimatedStarCount target={contribution.stars} inView={inView} />
          </span>
        </div>
      </div>
    </div>
  );
}
