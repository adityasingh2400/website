'use client';

import { motion, useInView } from 'framer-motion';
import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';

type Item =
  | { kind: 'image'; image: string; label: string; rounded?: boolean }
  | { kind: 'icon'; label: string };

const items: Item[] = [
  { kind: 'image', image: '/fun-basketball.jpeg', label: 'Hooping, chasing the IM title', rounded: true },
  { kind: 'image', image: '/fun-tonystark.png', label: 'Always running multiple agents', rounded: true },
  { kind: 'icon', label: 'Will debate anyone on world politics' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Fun() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="life" className="relative flex min-h-[100svh] flex-col px-5 sm:px-8" ref={ref}>
      <div className="chapter-shell my-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-display text-[clamp(1.9rem,5.5vw,2.8rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            When I&apos;m not building
          </h2>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-3.5 transition-colors duration-300 hover:border-[var(--line-strong)] sm:flex-col sm:p-5"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center sm:h-28 sm:w-full">
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
                    size={36}
                    strokeWidth={1.2}
                    className="text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--foreground)] sm:h-[52px] sm:w-[52px]"
                  />
                )}
              </div>
              <p className="max-w-[22ch] font-display text-[1.05rem] leading-snug text-[var(--foreground)] sm:mt-3 sm:text-center sm:text-[1.1rem]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-6 text-[0.92rem] leading-relaxed text-[var(--muted)] sm:text-[1rem]"
        >
          Also late nights vibecoding, guitar, an unreasonable SGA take, and{' '}
          <span className="italic text-[var(--foreground)]">The Matrix</span> on repeat.
        </motion.p>
      </div>

      {/* Footer pinned to the bottom of the last chapter */}
      <footer className="chapter-shell border-t border-[var(--line)] pb-6 pt-5 sm:pb-8 sm:pt-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:adityasingh@ucsb.edu"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--muted)] sm:text-xs"
          >
            adityasingh@ucsb.edu
          </a>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              >
                <social.icon size={14} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[rgba(17,17,17,0.4)] sm:text-[10px]">
          Designed and built by Aditya Singh
        </p>
      </footer>
    </section>
  );
}
