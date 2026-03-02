'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socials = [
  { name: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adityasingh2400', icon: Linkedin },
  { name: 'X', href: 'https://x.com/NoeticPraxis', icon: Twitter },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-32 sm:py-40 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase mb-8"
          style={{ color: 'var(--accent)' }}
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
        >
          Let&apos;s talk.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg mb-10 max-w-md mx-auto"
          style={{ color: 'var(--muted)' }}
        >
          Open to interesting conversations, collaborations, and opportunities.
        </motion.p>

        <motion.a
          href="mailto:adityasingh@ucsb.edu"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ color: 'var(--foreground)' }}
        >
          <Mail size={16} />
          adityasingh@ucsb.edu
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="transition-all duration-200 hover:text-[var(--accent)] hover:-translate-y-0.5"
              style={{ color: 'var(--muted)' }}
            >
              <s.icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-24 text-xs"
          style={{ color: 'var(--muted)', opacity: 0.5 }}
        >
          Designed & built by Aditya Singh
        </motion.p>
      </div>
    </section>
  );
}
