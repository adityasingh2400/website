'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge } from 'lucide-react';
import Image from 'next/image';
import stanfordLogo from '@/stanfordlogo.avif';

type Point = {
  x: number;
  y: number;
};

const CANVAS = { width: 1000, height: 1000 };
// We perfectly center the BOUNDING BOX. 
// For an equilateral triangle with R=350 pointing left:
// The bounding box center needs to be precisely at x=500.
// Thus, HUB_X = 500 + 350 / 4 = 587.5. HUB_Y = 500.
const HUB = { x: 587.5, y: 500 };
const HUB_RADIUS = 75;
const OUTER_RADIUS = 125;
const LEAF_LABEL_OFFSET = 'translate-y-[6rem] sm:translate-y-[7.5rem] md:translate-y-[8.5rem]';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 15200,
    position: { x: 237.5, y: 500 }, // Angle 180
    logoClassName: 'h-[8.25rem] w-[8.25rem] sm:h-[10.5rem] sm:w-[10.5rem] md:h-[12rem] md:w-[12rem]',
  },
  {
    name: 'Stanford DSPy',
    logo: stanfordLogo,
    stars: 22500,
    position: { x: 762.5, y: 196.9 }, // Angle -60 (120 degrees apart)
    logoClassName: 'h-[9rem] w-[9rem] sm:h-[11.7rem] sm:w-[11.7rem] md:h-[13.2rem] md:w-[13.2rem]',
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 8700,
    position: { x: 762.5, y: 803.1 }, // Angle 60 (120 degrees apart)
    logoClassName: 'h-[8.25rem] w-[8.25rem] sm:h-[10.5rem] sm:w-[10.5rem] md:h-[12rem] md:w-[12rem]',
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

        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-16 w-full" style={{ aspectRatio: '1 / 1' }}>
          {/* SVG lines */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
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
                    r="4"
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
            className="absolute z-10 h-0 w-0"
            style={{
              left: `${(HUB.x / CANVAS.width) * 100}%`,
              top: `${(HUB.y / CANVAS.height) * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute left-0 top-0 flex h-[4.6rem] w-[4.6rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--foreground)] text-white ring-[10px] ring-white/72 shadow-[0_28px_80px_rgba(17,17,17,0.24)] sm:h-[5.2rem] sm:w-[5.2rem] md:h-[5.5rem] md:w-[5.5rem]">
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
              <div className="absolute left-0 top-0 flex h-[4.9rem] w-[4.9rem] max-w-none -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[5.8rem] sm:w-[5.8rem] md:h-[6.4rem] md:w-[6.4rem]">
                {/* Keep the anchor at the node center so the SVG connector and outer node share the same target. */}
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={250}
                  height={250}
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
