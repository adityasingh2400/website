'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge } from 'lucide-react';

type Point = {
  x: number;
  y: number;
};

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 15200,
    position: { x: 110, y: 150 },
    logoClassName: 'h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16',
  },
  {
    name: 'Stanford DSPy',
    logo: '/logos/stanford.avif',
    stars: 22500,
    position: { x: 320, y: 28.76 },
    logoClassName: 'h-12 w-12 sm:h-[3.9rem] sm:w-[3.9rem] md:h-[4.4rem] md:w-[4.4rem]',
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 8700,
    position: { x: 320, y: 271.24 },
    logoClassName: 'h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16',
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

const CANVAS = { width: 500, height: 300 };
const HUB = { x: 250, y: 150 };
const HUB_RADIUS = 28;
const OUTER_RADIUS = 34;
const LEAF_LABEL_OFFSET = 'translate-y-[5.4rem] sm:translate-y-[6.45rem] md:translate-y-[7.15rem]';

function insetLine(from: Point, to: Point, startInset: number, endInset: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  return {
    x1: from.x + ux * startInset,
    y1: from.y + uy * startInset,
    x2: to.x - ux * endInset,
    y2: to.y - uy * endInset,
  };
}

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

        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-16" style={{ aspectRatio: '5 / 3' }}>
          {/* SVG lines */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <filter id="oss-connector-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {contributions.map(({ position }, i) => {
                const line = insetLine(HUB, position, HUB_RADIUS, OUTER_RADIUS);

                return (
                  <linearGradient
                    key={`gradient-${i}`}
                    id={`oss-connector-${i}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#111111" stopOpacity="0.58" />
                    <stop offset="52%" stopColor="#4b5563" stopOpacity="0.36" />
                    <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.18" />
                  </linearGradient>
                );
              })}
            </defs>

            {contributions.map(({ position }, i) => {
              const line = insetLine(HUB, position, HUB_RADIUS, OUTER_RADIUS);

              return (
                <g key={i}>
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#111111"
                    strokeWidth="7.5"
                    strokeOpacity="0.09"
                    strokeLinecap="round"
                    filter="url(#oss-connector-glow)"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={`url(#oss-connector-${i})`}
                    strokeWidth="3.3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#ffffff"
                    strokeWidth="1.1"
                    strokeOpacity="0.56"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.circle
                    r="3"
                    fill="#f4b400"
                    initial={{ cx: line.x1, cy: line.y1, opacity: 0 }}
                    animate={isInView ? {
                      cx: [line.x1, line.x2],
                      cy: [line.y1, line.y2],
                      opacity: [0, 0.85, 0],
                    } : {}}
                    transition={{
                      duration: 2.8,
                      delay: 0.7 + i * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                      repeat: Infinity,
                      repeatDelay: 4.2,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center node */}
          <motion.div
            className="absolute z-10"
            style={{
              left: `${(HUB.x / CANVAS.width) * 100}%`,
              top: `${(HUB.y / CANVAS.height) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full bg-[var(--foreground)] text-white ring-[10px] ring-white/72 shadow-[0_28px_80px_rgba(17,17,17,0.24)] sm:h-[5.2rem] sm:w-[5.2rem] md:h-[5.5rem] md:w-[5.5rem]">
              <GitMerge size={30} strokeWidth={2.2} />
            </div>
          </motion.div>

          {/* Leaf nodes */}
          {contributions.map((c, i) => (
            <motion.div
              key={c.name}
              className="absolute z-10 h-0 w-0"
              style={{
                left: `${(c.position.x / CANVAS.width) * 100}%`,
                top: `${(c.position.y / CANVAS.height) * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute left-0 top-0 flex h-[4.9rem] w-[4.9rem] max-w-none -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.75rem] border border-[rgba(17,17,17,0.09)] bg-[rgba(255,255,255,0.82)] shadow-[0_24px_70px_rgba(17,17,17,0.12)] backdrop-blur-sm sm:h-[5.8rem] sm:w-[5.8rem] md:h-[6.4rem] md:w-[6.4rem]">
                <div className="absolute inset-[10%] rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.58))]" />
                <div className="absolute inset-[18%] rounded-[1.15rem] border border-[rgba(17,17,17,0.05)]" />
                {/* Keep the anchor at the node center so the SVG connector and outer node share the same target. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className={`relative z-10 max-w-none object-contain drop-shadow-[0_10px_24px_rgba(17,17,17,0.14)] ${c.logoClassName}`}
                />
              </div>
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
