'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const name = 'Aditya Singh';

const socials = [
  { name: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { name: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
  { name: 'Resume', href: '/resume.pdf', icon: FileText },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.15)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/headshot.png"
              alt="Aditya Singh"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm tracking-[0.3em] uppercase mb-5"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          AI Systems &middot; Full-Stack &middot; Research
        </motion.p>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          style={{
            color: '#ffffff',
            textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
              style={char === ' ' ? { width: '0.3em' } : undefined}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            textShadow: '0 1px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          Building AI/LLM systems and full-stack products
          <br className="hidden sm:block" />
          {' '}that turn messy real-world problems into
          <br className="hidden sm:block" />
          {' '}things people can actually trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex items-center justify-center gap-5"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.name}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[var(--accent)]"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <s.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.35)' }}
          >
            scroll
          </span>
          <div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
