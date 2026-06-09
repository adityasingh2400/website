'use client';

import { motion, useInView } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useRef } from 'react';

type Item =
  | { kind: 'image'; image: string; label: string; rounded?: boolean }
  | { kind: 'icon'; label: string };

const items: Item[] = [
  { kind: 'image', image: '/fun-basketball.jpeg', label: 'Hooping — chasing the IM title', rounded: true },
  { kind: 'image', image: '/fun-tonystark.png', label: 'Always running multiple agents', rounded: true },
  { kind: 'icon', label: 'Will debate anyone on world politics' },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Fun() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="life" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24" ref={ref}>
      <div className="mx-auto w-full max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
            Off the clock
          </p>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,6vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            When I&apos;m not building
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="group flex flex-col items-center rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-5 text-center transition-colors duration-300 hover:border-[var(--line-strong)]"
            >
              <div className="flex h-28 w-full items-center justify-center sm:h-32">
                {item.kind === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.label}
                    className={`h-full w-auto max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04] ${
                      item.rounded ? 'rounded-xl' : ''
                    }`}
                  />
                ) : (
                  <Globe
                    size={56}
                    strokeWidth={1.2}
                    className="text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)]"
                  />
                )}
              </div>
              <p className="mt-4 max-w-[22ch] font-display text-[1.15rem] leading-snug text-[var(--foreground)]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-7 text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-[1.02rem]"
        >
          Also: late-night vibecoding, a little guitar, an unreasonable SGA take, and{' '}
          <span className="italic text-[var(--foreground)]">The Matrix</span> on repeat.
        </motion.p>
      </div>
    </section>
  );
}
