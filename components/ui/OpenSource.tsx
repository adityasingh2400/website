'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    repo: 'openai/openai-agents-python',
    logo: '/logos/openai.svg',
    accent: '#000000',
    accentGlow: 'rgba(0,0,0,0.12)',
    stars: 15200,
  },
  {
    name: 'DSPy',
    repo: 'stanfordnlp/dspy',
    logo: '/logos/stanford.svg',
    accent: '#8C1515',
    accentGlow: 'rgba(140,21,21,0.14)',
    stars: 22500,
  },
  {
    name: 'Pydantic AI',
    repo: 'pydantic/pydantic-ai',
    logo: '/logos/pydantic.svg',
    accent: '#E92063',
    accentGlow: 'rgba(233,32,99,0.14)',
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
  const ref = useRef({ value: 0 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        ref.current.value = v;
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span>{formatStars(display)}</span>;
}

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.25,
      transition: {
        duration: 1.2,
        delay: 0.6 + i * 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="lab-eyebrow mb-3 sm:mb-4">Open Source</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4.4rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
            I love contributing.
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-2xl sm:mt-20">
          {/* SVG connecting lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 600 440"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Top to bottom-left */}
            <motion.line
              x1="300" y1="80" x2="130" y2="360"
              stroke="var(--foreground)"
              strokeWidth="1"
              variants={lineVariants}
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
            {/* Top to bottom-right */}
            <motion.line
              x1="300" y1="80" x2="470" y2="360"
              stroke="var(--foreground)"
              strokeWidth="1"
              variants={lineVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
            {/* Bottom-left to bottom-right */}
            <motion.line
              x1="130" y1="360" x2="470" y2="360"
              stroke="var(--foreground)"
              strokeWidth="1"
              variants={lineVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
          </svg>

          {/* Trifecta nodes */}
          <div className="relative" style={{ paddingBottom: '73%' }}>
            {/* Top node: OpenAI */}
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2"
              variants={nodeVariants}
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <OSSNode contribution={contributions[0]} inView={isInView} />
            </motion.div>

            {/* Bottom-left: Stanford / DSPy */}
            <motion.div
              className="absolute bottom-0 left-0 sm:left-[5%]"
              variants={nodeVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <OSSNode contribution={contributions[1]} inView={isInView} />
            </motion.div>

            {/* Bottom-right: Pydantic */}
            <motion.div
              className="absolute bottom-0 right-0 sm:right-[5%]"
              variants={nodeVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <OSSNode contribution={contributions[2]} inView={isInView} />
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-10 sm:text-[11px]"
        >
          Merged PRs in all three
        </motion.p>
      </div>
    </section>
  );
}

function OSSNode({ contribution, inView }: { contribution: typeof contributions[number]; inView: boolean }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center border bg-[var(--surface-strong)] p-4 shadow-lg sm:h-28 sm:w-28 sm:p-5"
        style={{ borderColor: contribution.accent }}
        animate={inView ? {
          boxShadow: [
            `0 0 0 0px ${contribution.accentGlow}`,
            `0 0 0 12px ${contribution.accentGlow}`,
            `0 0 0 0px ${contribution.accentGlow}`,
          ],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contribution.logo}
          alt={contribution.name}
          className="h-full w-full object-contain"
          style={{ color: contribution.accent }}
        />
      </motion.div>
      <div className="text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--foreground)] sm:text-[10px]">
          {contribution.name}
        </p>
        <div className="mt-1 flex items-center justify-center gap-1">
          <Star size={11} className="fill-[var(--foreground)] text-[var(--foreground)]" />
          <span className="font-mono text-[10px] tabular-nums tracking-wide text-[var(--muted)] sm:text-[11px]">
            <AnimatedStarCount target={contribution.stars} inView={inView} />
          </span>
        </div>
      </div>
    </div>
  );
}
