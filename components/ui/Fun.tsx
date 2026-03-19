'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const items = [
  {
    image: '/fun-basketball.svg',
    label: 'Never say no to runs',
    isRound: true,
  },
  {
    image: '/fun-politics.svg',
    label: 'Will debate anyone on world politics',
    isRound: false,
  },
  {
    image: '/fun-spontaneous.svg',
    label: 'Spontaneous plans are the best plans',
    isRound: false,
  },
  {
    image: '/fun-tonystark.png',
    label: 'Multiple concurrent agents, always',
    isRound: false,
  },
];

export function Fun() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-28" ref={ref}>
      <div className="mx-auto max-w-[1280px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--muted)] sm:mb-10 sm:text-sm"
        >
          Off The Clock
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-4 overflow-hidden sm:mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
                    item.isRound
                      ? 'h-24 w-24 sm:h-32 sm:w-32'
                      : 'h-24 w-auto sm:h-32'
                  }`}
                />
              </div>
              <p className="max-w-[180px] text-[0.9rem] leading-snug text-[var(--foreground)] sm:text-[1rem]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Spotify link */}
        <motion.a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#1DB954] transition-opacity duration-200 hover:opacity-70 sm:mt-10 sm:text-[15px]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          My playlist
        </motion.a>
      </div>
    </section>
  );
}
