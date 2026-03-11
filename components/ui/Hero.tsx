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
    <section className="relative min-h-screen overflow-hidden px-6 pb-12 pt-28 sm:pb-16 sm:pt-32">
      <FluidBackground className="hero-fluid opacity-100" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,242,0.06),rgba(250,248,242,0.46)_72%,rgba(250,248,242,0.94))]" />
      <div className="absolute left-[-10vw] top-[16vh] h-[28vw] w-[28vw] min-h-[220px] min-w-[220px] rounded-full bg-[rgba(93,168,255,0.24)] blur-[100px]" />
      <div className="absolute right-[10vw] top-[8vh] h-[30vw] w-[30vw] min-h-[240px] min-w-[240px] rounded-full bg-[rgba(109,94,252,0.22)] blur-[120px]" />
      <div className="absolute bottom-[10vh] right-[28vw] h-[20vw] w-[20vw] min-h-[180px] min-w-[180px] rounded-full bg-[rgba(236,72,153,0.18)] blur-[90px]" />
      <div className="absolute inset-y-0 right-0 w-[42vw] min-w-[280px] bg-[linear-gradient(270deg,rgba(17,17,17,0.08),transparent_70%)]" />
      <div className="absolute left-[8vw] top-[22vh] h-px w-[14vw] bg-[rgba(17,17,17,0.16)]" />
      <div className="absolute bottom-[18vh] left-[12vw] h-px w-[10vw] bg-[rgba(17,17,17,0.12)]" />

      <div className="lab-shell relative min-h-[calc(100vh-7rem)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[calc(100vh-7rem)]"
        >
          <div className="pointer-events-none absolute left-0 top-[7vh] hidden lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[rgba(17,17,17,0.44)]">
              Santa Barbara / Cupertino / Cambridge
            </p>
          </div>

          <div className="pointer-events-none absolute right-0 top-[12vh] hidden lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[rgba(17,17,17,0.42)]">
              CS / SWE / Research
            </p>
          </div>

          <div className="grid min-h-[calc(100vh-7rem)] items-end gap-12 lg:grid-cols-[minmax(0,1fr)_32vw]">
            <div className="relative z-10 max-w-[720px] pb-8 lg:pb-14">
              <p className="lab-eyebrow mb-6 text-[rgba(17,17,17,0.54)]">Aditya Singh</p>
              <h1 className="font-display text-[clamp(4.2rem,14vw,9.5rem)] leading-[0.82] tracking-[-0.08em] text-[var(--foreground)]">
                Aditya
                <br />
                Singh
              </h1>

              <div className="mt-8 grid max-w-[560px] gap-3 text-[1.08rem] font-semibold leading-tight text-[var(--foreground)] sm:text-[1.28rem]">
                <p>CS @ UCSB</p>
                <p>SWE Lead @ Ryft AI</p>
                <p>Building Ziri, a voice OS</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
                <span>Robotics background</span>
                <span>Cambridge research</span>
                <span>IEEE MIT URTC</span>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Projects
                  <ArrowDownRight size={14} />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[rgba(17,17,17,0.16)] bg-[rgba(255,255,255,0.38)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  Resume
                </a>
              </div>

              <div className="mt-16 grid max-w-[620px] gap-4 sm:grid-cols-[180px_1fr] lg:translate-x-[8vw]">
                <div className="border-l border-[rgba(17,17,17,0.18)] pl-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(17,17,17,0.48)]">
                    right now
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[rgba(17,17,17,0.72)]">
                    Ryft during the day. Ziri and other AI builds after that.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[rgba(17,17,17,0.68)]">
                  <span>Basically stress-testing agentic IDEs until something useful ships.</span>
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[62vh]">
              <div className="absolute bottom-0 right-0 top-0 w-full lg:top-[4vh]">
                <div className="absolute left-[6%] top-[18%] h-[56%] w-[46%] border border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.14)]" />
                <div className="absolute right-[6%] top-[8%] h-[78%] w-[60%] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/headshot.png"
                    alt="Aditya Singh"
                    className="hero-portrait h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-0 z-20 flex gap-2 lg:bottom-10 lg:flex-col">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(17,17,17,0.14)] bg-[rgba(255,255,255,0.38)] text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
              >
                <social.icon size={16} strokeWidth={1.8} />
              </a>
            ))}
          </div>

          <div className="absolute bottom-10 left-0 z-20 hidden sm:flex items-center gap-3">
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
