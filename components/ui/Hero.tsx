'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { FluidBackground } from './FluidBackground';

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
  { label: 'Resume', href: '/resume.pdf', icon: FileText },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
      <FluidBackground className="hero-fluid opacity-100" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,242,0.06),rgba(250,248,242,0.46)_72%,rgba(250,248,242,0.94))]" />

      <div className="lab-shell relative min-h-[calc(100svh-6rem)] sm:min-h-[calc(100vh-7rem)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[calc(100svh-6rem)] flex-col justify-end pb-4 sm:min-h-[calc(100vh-7rem)] sm:pb-8 lg:pb-14"
        >
          <div className="relative z-10 max-w-[720px]">
            <p className="lab-eyebrow mb-4 text-[rgba(17,17,17,0.54)] sm:mb-6">Aditya Singh</p>
            <h1 className="font-display text-[clamp(3rem,12vw,9.5rem)] leading-[0.82] tracking-[-0.08em] text-[var(--foreground)]">
              Aditya
              <br />
              Singh
            </h1>

            <div className="mt-5 grid max-w-[560px] gap-2 text-[0.95rem] font-semibold leading-tight text-[var(--foreground)] sm:mt-8 sm:gap-3 sm:text-[1.28rem]">
              <p>CS @ UCSB</p>
              <p>SWE Lead @ Ryft AI</p>
              <p>Building Ziri, a voice OS</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-10 sm:gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-3 sm:text-[11px]"
              >
                Projects
                <ArrowDownRight size={14} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[rgba(17,17,17,0.16)] bg-[rgba(255,255,255,0.38)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-4 sm:py-3 sm:text-[11px]"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="absolute bottom-4 right-0 z-20 flex gap-2 sm:bottom-8 lg:bottom-10 lg:flex-col">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(17,17,17,0.14)] bg-[rgba(255,255,255,0.38)] text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:h-11 sm:w-11"
              >
                <social.icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>

          <div className="absolute bottom-10 left-0 z-20 hidden items-center gap-3 sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(17,17,17,0.44)]">
              scroll
            </span>
            <div className="h-px w-16 bg-[rgba(17,17,17,0.24)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
