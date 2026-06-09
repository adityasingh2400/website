'use client';

import { motion, useInView } from 'framer-motion';
import { MapPin, Trophy, Zap } from 'lucide-react';
import { useRef } from 'react';

type Milestone = {
  id: string;
  date: string;
  event: string;
  host: string;
  location: string;
  project: string;
  outcome: string;
  summary: string;
  details: string[];
  accent: string;
  accentSoft: string;
};

const milestones: Milestone[] = [
  {
    id: 'beachhacks',
    date: 'Mar 21–22, 2026',
    event: 'BeachHacks 9.0 · CSULB',
    host: 'CSU Long Beach ACM',
    location: 'The Pointe, CSULB',
    project: 'ReRoute',
    outcome: '1st overall + Best Sustainability',
    summary:
      'Record a video of your unused stuff, then let AI agents identify items, estimate resale value, pick the best route, and publish listings.',
    details: [
      'Multi-agent valuation and routing across resale, return, trade-in, repair, and bundle paths.',
      'Auto-generated marketplace-ready listings from one narrated capture.',
    ],
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.12)',
  },
  {
    id: 'glitch-ucla',
    date: 'Mar 27–28, 2026',
    event: 'GLITCH@UCLA × Google DeepMind',
    host: 'Glitch at UCLA + Google',
    location: 'Carnesale Commons, UCLA',
    project: 'Gemini multimodal build',
    outcome: '24-hour Gemini hackathon',
    summary:
      'A UCLA build weekend around Gemini video, image, and audio models with Google mentors and engineers in the room.',
    details: [
      'Built in the first Glitch hackathon cohort, focused on fast multimodal prototypes.',
      'Centered on shipping with Gemini and exploring new Google AI surfaces.',
    ],
    accent: '#f43f5e',
    accentSoft: 'rgba(244, 63, 94, 0.11)',
  },
  {
    id: 'diamondhacks',
    date: 'Apr 4–5, 2026',
    event: 'DiamondHacks 2026 · UC San Diego',
    host: 'ACM at UC San Diego',
    location: 'UC San Diego',
    project: 'SwarmSell',
    outcome: 'Best AI/ML Project',
    summary:
      'Film clutter once, then have browser agents swarm across eBay, Facebook Marketplace, Mercari, and Depop to list everything fast.',
    details: [
      'Analyzed frames from a single video to detect items and coordinate parallel marketplace posting.',
      'Designed for sub-two-minute listing workflows across several resale channels.',
    ],
    accent: '#10b981',
    accentSoft: 'rgba(16, 185, 129, 0.12)',
  },
  {
    id: 'cactus-yc',
    date: 'Apr 18–19, 2026',
    event: 'Cactus × Google DeepMind × YC',
    host: 'Cactus + Google DeepMind + Y Combinator',
    location: 'YC HQ, San Francisco',
    project: 'On-device voice agents',
    outcome: 'Built at YC HQ',
    summary:
      'A two-day voice-agents hackathon around on-device Gemma and low-latency Cactus inference, hosted at Y Combinator HQ.',
    details: [
      'Voice-controlled agents that run locally on phones and wearables.',
      'Prize track included a guaranteed YC interview for the winning build.',
    ],
    accent: '#a855f7',
    accentSoft: 'rgba(168, 85, 247, 0.12)',
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function isWin(outcome: string) {
  return outcome.includes('Best') || outcome.includes('1st');
}

export function Milestones() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="hackathons" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24" ref={ref}>
      <div className="mx-auto w-full max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
            Hackathons
          </p>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,6vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            A month of building under a clock
          </h2>
          <p className="mt-3.5 max-w-[54ch] text-[0.98rem] leading-relaxed text-[var(--muted)] sm:text-[1.08rem]">
            I build something new most weekends. A recent stretch, from a beach in Long Beach to Y
            Combinator&apos;s HQ.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-10">
          {milestones.map((m, index) => {
            const won = isWin(m.outcome);
            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.08, ease }}
                className="grid gap-x-8 gap-y-3 border-t border-[var(--line)] py-7 last:border-b sm:grid-cols-[160px_1fr] sm:py-8"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {m.date}
                  </p>
                  <div
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      borderColor: m.accent,
                      backgroundColor: m.accentSoft,
                      color: m.accent,
                    }}
                  >
                    {won ? <Trophy size={12} /> : <Zap size={12} />}
                    {m.outcome}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-[1.7rem] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)] sm:text-[2.1rem]">
                    {m.project}
                  </h3>
                  <p className="mt-1 text-[0.92rem] font-semibold text-[var(--muted-strong)]">{m.event}</p>
                  <p className="mt-2.5 max-w-[52ch] text-[0.93rem] leading-relaxed text-[var(--muted)] sm:text-[1rem]">
                    {m.summary}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {m.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-2.5 text-[0.86rem] leading-snug text-[var(--muted)]"
                      >
                        <span
                          className="mt-[0.55rem] block h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: m.accent }}
                          aria-hidden
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    <MapPin size={12} />
                    {m.location}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
