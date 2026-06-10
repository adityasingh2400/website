'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { VoiceAgent } from './VoiceAgent';
import { PointillismPortrait } from './PointillismPortrait';

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Intro() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col px-5 sm:px-8">
      <div className="chapter-shell my-auto pb-8 pt-12 sm:pb-20 sm:pt-20">
        {/* Name + portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease }}
          className="flex items-center gap-4 sm:gap-10"
        >
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[clamp(2.2rem,8vw,5.4rem)] leading-[0.95] tracking-[-0.01em] text-[var(--foreground)]">
              Aditya Singh
            </h1>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                >
                  <social.icon size={19} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <PointillismPortrait
            src="/headshot.png"
            alt="Aditya Singh"
            className="h-[96px] w-[96px] flex-shrink-0 sm:h-[208px] sm:w-[208px]"
          />
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="prose-story mt-5 sm:mt-10"
        >
          <p>
            I&apos;m a computer science student at UC Santa Barbara, a block from the ocean in Isla
            Vista. Most of my time goes into agents and voice interfaces, software you can talk to
            that actually goes and does the thing.
          </p>
          <p>
            Robotics got me here. I started a robotics nonprofit back home in Fremont, then spent
            six months on soft robotics research with a Cambridge lab that ended up{' '}
            <a className="story-link" href="#hackathons">published</a> through IEEE at MIT.
            Somewhere in there I realized the part I loved wasn&apos;t the hardware. It was getting
            a machine to understand what you mean and act on it.
          </p>
          <p>
            So that&apos;s what I do now. I ship <a className="story-link" href="#work">side
            projects</a>, spend most weekends building at{' '}
            <a className="story-link" href="#hackathons">hackathons</a>, and contribute to the{' '}
            <a className="story-link" href="#open-source">open source libraries</a> I use every
            day. The rest is <a className="story-link" href="#life">basketball</a>, late nights,
            and arguments about politics I refuse to lose.
          </p>
          <p>
            If you&apos;re building something good,{' '}
            <a className="story-link" href="mailto:adityasingh@ucsb.edu">reach out</a>.
          </p>
        </motion.div>

        {/* Voice row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease }}
          className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10"
        >
          <VoiceAgent />
          <span className="text-[0.85rem] text-[var(--muted)]">or just read on.</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)] opacity-60">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
