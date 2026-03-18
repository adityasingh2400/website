'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge } from 'lucide-react';

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 15200,
    angle: 0,
  },
  {
    name: 'Stanford DSPy',
    logo: '/logos/stanford.svg',
    stars: 22500,
    angle: 1,
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 8700,
    angle: 2,
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

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const lineVariant = (i: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.4 + i * 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  });

  const nodeVariant = (i: number) => ({
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.8 + i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  });

  // Leaf node positions (center of each node) in the SVG viewBox
  // Arranged: left, top-right, bottom-right
  const cx = 300, cy = 250;
  const radius = 180;
  const leaves = [
    { x: cx - radius, y: cy - 40 },
    { x: cx + radius * 0.7, y: cy - radius * 0.9 },
    { x: cx + radius * 0.7, y: cy + radius * 0.7 },
  ];

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

        {/* Radial graph: center node + 3 leaf nodes */}
        <div className="relative mx-auto mt-12 max-w-2xl sm:mt-16" style={{ aspectRatio: '600 / 500' }}>
          {/* SVG lines from center to each leaf */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 600 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {leaves.map((leaf, i) => (
              <motion.line
                key={i}
                x1={cx}
                y1={cy}
                x2={leaf.x}
                y2={leaf.y}
                stroke="var(--foreground)"
                strokeWidth="1.5"
                strokeOpacity="0.18"
                strokeDasharray="6 4"
                variants={lineVariant(i)}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              />
            ))}
            {/* Animated dots traveling along lines */}
            {leaves.map((leaf, i) => (
              <motion.circle
                key={`dot-${i}`}
                r="3"
                fill="var(--foreground)"
                opacity="0.3"
                initial={{ cx, cy, opacity: 0 }}
                animate={isInView ? {
                  cx: [cx, leaf.x],
                  cy: [cy, leaf.y],
                  opacity: [0, 0.5, 0],
                } : {}}
                transition={{
                  duration: 2,
                  delay: 0.6 + i * 0.25,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ))}
          </svg>

          {/* Center node */}
          <motion.div
            className="absolute"
            style={{
              left: `${(cx / 600) * 100}%`,
              top: `${(cy / 500) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--foreground)] bg-[var(--foreground)] text-white shadow-[0_0_40px_rgba(17,17,17,0.2)] sm:h-20 sm:w-20">
              <GitMerge size={24} strokeWidth={2} className="sm:hidden" />
              <GitMerge size={30} strokeWidth={2} className="hidden sm:block" />
            </div>
          </motion.div>

          {/* Leaf nodes */}
          {contributions.map((c, i) => (
            <motion.div
              key={c.name}
              className="absolute"
              style={{
                left: `${(leaves[i].x / 600) * 100}%`,
                top: `${(leaves[i].y / 500) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              variants={nodeVariant(i)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-14 w-14 object-contain drop-shadow-lg sm:h-20 sm:w-20"
                />
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[var(--foreground)] sm:text-[15px]">
                    {c.name}
                  </p>
                  <div className="mt-0.5 flex items-center justify-center gap-1.5">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-[14px] font-semibold tabular-nums text-[var(--foreground)] sm:text-[16px]">
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
