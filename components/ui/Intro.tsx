'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { VoiceAgent } from './VoiceAgent';

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Intro() {
  return (
    <section id="top" className="relative px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
      <div className="mx-auto w-full max-w-[760px]">
        {/* Name + headshot */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
        >
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
              Santa Barbara, California
            </p>
            <h1 className="mt-2.5 font-display text-[clamp(3.2rem,11vw,6rem)] leading-[0.95] tracking-[-0.01em] text-[var(--foreground)]">
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

          <div className="h-[112px] w-[112px] flex-shrink-0 overflow-hidden rounded-full border border-[var(--line-strong)] shadow-[0_18px_50px_rgba(17,17,17,0.14)] sm:h-[136px] sm:w-[136px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/headshot.png"
              alt="Aditya Singh"
              className="h-full w-full object-cover object-center"
              style={{ filter: 'contrast(1.04) saturate(0.96)' }}
            />
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="prose-story mt-9 sm:mt-11"
        >
          <p>
            I&apos;m a computer science student at UC Santa Barbara, living a block from the ocean in
            Isla Vista. I build AI systems like voice interfaces, agents, and automation tools, the
            kind of thing that&apos;s a little weird but that I actually want to use every day.
          </p>
          <p>
            I got here through robotics. I started a robotics nonprofit back home in Fremont, then
            spent six months on soft robotics research at Cambridge that I{' '}
            <a className="story-link" href="#hackathons">published and presented</a> through IEEE at
            MIT. Somewhere along the way I fell for the messier, more interesting side of the work.
            Getting machines to understand language, take real actions, and be trusted with them.
          </p>
          <p>
            These days most of my time goes to agentic systems and where voice computing heads next.
            I ship a lot of <a className="story-link" href="#work">side projects</a>, and I help
            maintain the <a className="story-link" href="#open-source">open source libraries</a> the
            whole field is built on, like OpenAI&apos;s Agents SDK, Stanford&apos;s DSPy, and
            Pydantic AI.
          </p>
          <p>
            When I&apos;m not building, I&apos;m <a className="story-link" href="#life">hooping</a>, up
            late vibecoding, or arguing about world politics. I just like learning things. If
            you&apos;re working on something good,{' '}
            <a className="story-link" href="mailto:adityasingh@ucsb.edu">reach out</a>.
          </p>
        </motion.div>

        {/* Voice + contact row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10"
        >
          <VoiceAgent />
          <span className="text-[0.85rem] text-[var(--muted)]">
            or just read on, it&apos;s all right here.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
