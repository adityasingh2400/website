'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <div className="lab-shell border-t border-[var(--line)] pt-8 sm:pt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lab-eyebrow mb-3 sm:mb-4"
        >
          Contact
        </motion.p>

        <div className="grid gap-8 sm:gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]"
            >
              Email works best.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg"
            >
              If you want to build something together, reach out.
            </motion.p>

            <motion.a
              href="mailto:adityasingh@ucsb.edu"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex max-w-3xl items-center justify-between gap-3 border border-[var(--line-strong)] bg-[rgba(255,255,255,0.7)] px-4 py-4 text-[clamp(1rem,3vw,2rem)] font-semibold text-[var(--foreground)] shadow-[0_20px_50px_rgba(17,17,17,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:mt-8 sm:gap-4 sm:px-6 sm:py-6"
            >
              <span className="break-all text-[0.9rem] sm:text-[clamp(1.25rem,3vw,2rem)]">adityasingh@ucsb.edu</span>
              <ArrowUpRight size={18} className="flex-shrink-0" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 grid gap-3 grid-cols-1 sm:mt-12 sm:gap-4 md:grid-cols-2"
            >
              <div className="lab-panel p-4 sm:p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  Location
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">
                  Santa Barbara / Goleta
                </p>
              </div>
              <div className="lab-panel p-4 sm:p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  Looking for
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-3 sm:text-sm">
                  product engineering, AI systems, voice products
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid gap-2 sm:gap-3"
          >
            <p className="lab-eyebrow mb-1">Elsewhere</p>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between border border-[var(--line)] bg-[rgba(255,255,255,0.5)] px-4 py-3.5 text-[0.85rem] font-medium text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] active:scale-[0.99] sm:py-4 sm:text-sm"
              >
                <span className="flex items-center gap-3">
                  <social.icon size={16} strokeWidth={1.8} />
                  {social.label}
                </span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 font-mono text-[9px] uppercase tracking-[0.22em] text-[rgba(17,17,17,0.45)] sm:mt-20 sm:text-[10px]"
        >
          Designed and built by Aditya Singh
        </motion.p>
      </div>
    </section>
  );
}
