'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Dribbble, Globe, Sparkles, Music } from 'lucide-react';

const items = [
  {
    icon: Dribbble,
    label: 'Basketball',
    detail: 'Never say no to runs',
    accent: '#f97316',
  },
  {
    icon: Music,
    label: 'Music',
    detail: 'Always on shuffle',
    accent: '#1DB954',
    isSpotify: true,
  },
  {
    icon: Globe,
    label: 'World Politics',
    detail: 'Will debate anyone',
    accent: '#3b82f6',
  },
  {
    icon: Sparkles,
    label: 'Tony Stark Mode',
    detail: 'Multiple concurrent agents, always',
    accent: '#8b5cf6',
  },
];

export function Fun() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-28" ref={ref}>
      <div className="lab-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="lab-eyebrow mb-6 sm:mb-8">Off The Clock</p>
        </motion.div>

        <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lab-panel p-4 sm:p-5"
            >
              <div
                className="mb-3 inline-flex h-10 w-10 items-center justify-center border sm:mb-4 sm:h-12 sm:w-12"
                style={{ borderColor: item.accent, color: item.accent }}
              >
                <item.icon size={18} strokeWidth={1.8} />
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-[10px]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[0.8rem] leading-snug text-[var(--muted)] sm:mt-2 sm:text-sm">
                {item.detail}
              </p>
              {item.isSpotify && (
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1DB954] transition-opacity duration-200 hover:opacity-70 sm:text-[10px]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Playlist
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-[0.85rem] text-[var(--muted)] sm:mt-8 sm:text-base"
        >
          Spontaneous plans are the best plans.
        </motion.p>
      </div>
    </section>
  );
}
