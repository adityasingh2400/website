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
    <section className="relative min-h-[100svh] overflow-hidden">
      <FluidBackground className="hero-fluid opacity-100" />

      {/* subtle bottom fade so content below blends */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12"
          >
            {/* Left: name + info */}
            <div>
              <h1 className="font-display text-[clamp(3.5rem,14vw,10rem)] leading-[0.82] tracking-[-0.06em] text-[var(--foreground)]">
                Aditya
                <br />
                Singh
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[1rem] font-medium text-[var(--foreground)] sm:mt-7 sm:gap-x-7 sm:text-[1.2rem]">
                <span>CS @ UCSB</span>
                <span className="hidden sm:inline text-[var(--line-strong)]">/</span>
                <span>SWE Lead @ Ryft AI</span>
                <span className="hidden sm:inline text-[var(--line-strong)]">/</span>
                <span>Building Ziri</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2.5 text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-sm"
                >
                  Projects
                  <ArrowDownRight size={15} />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[rgba(17,17,17,0.2)] bg-[rgba(255,255,255,0.5)] px-4 py-2.5 text-[13px] font-medium tracking-wide text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] sm:px-5 sm:py-3 sm:text-sm"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Right: headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="relative h-[340px] w-[260px] overflow-hidden border-2 border-[rgba(255,255,255,0.3)] shadow-[0_30px_100px_rgba(17,17,17,0.2)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/headshot.png"
                  alt="Aditya Singh"
                  className="h-full w-full object-cover object-center"
                  style={{ filter: 'contrast(1.06) saturate(0.9)' }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar: socials + scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex items-center justify-between sm:mt-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium tracking-widest uppercase text-[rgba(17,17,17,0.5)] sm:text-[13px]">
                scroll
              </span>
              <div className="h-px w-12 bg-[rgba(17,17,17,0.25)] sm:w-16" />
            </div>

            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(17,17,17,0.15)] bg-[rgba(255,255,255,0.4)] text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  <social.icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
