'use client';

import { createElement, useRef, useState } from 'react';
import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mic, PhoneCall, Sparkles } from 'lucide-react';

const topics = ['Projects', 'Ryft', 'Ziri'];
const sampleQuestions = [
  'What do you like building most?',
  'Which project is your favorite?',
  'What kind of work do you want next?',
  'What matters to you when you build AI?',
];

type VoiceLineState = 'idle' | 'loading' | 'ready' | 'error';

const AGENT_ID = 'agent_2901kkeajfaseyw97wxkc2mz646b';

export function VoiceAgent() {
  const publicAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() || AGENT_ID;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [state, setState] = useState<VoiceLineState>('idle');
  const [signedUrl, setSignedUrl] = useState('');
  const [usePublicAgent, setUsePublicAgent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openVoiceLine = async () => {
    if (!widgetLoaded || state === 'loading') {
      return;
    }

    setState('loading');
    setErrorMessage('');
    setUsePublicAgent(false);

    if (publicAgentId) {
      setSignedUrl('');
      setUsePublicAgent(true);
      setState('ready');
      return;
    }

    try {
      const response = await fetch('/api/voice-agent', { cache: 'no-store' });
      const payload = (await response.json()) as { signedUrl?: string; error?: string };

      if (!response.ok || !payload.signedUrl) {
        throw new Error(payload.error || 'Could not start voice chat.');
      }

      setSignedUrl(payload.signedUrl);
      setState('ready');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not start voice chat.');
      setState('error');
    }
  };

  const buttonLabel = !widgetLoaded ? 'Loading...' : state === 'loading' ? 'Starting...' : state === 'ready' ? 'Ready below' : 'Start talking';
  const buttonDisabled = !widgetLoaded || state === 'loading' || state === 'ready';

  return (
    <section id="voice" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={ref}>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        onLoad={() => setWidgetLoaded(true)}
      />

      <div className="lab-shell">
        <div className="grid gap-8 sm:gap-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lab-eyebrow mb-3 sm:mb-4">Voice</p>
            <h2 className="font-display max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
              Ask by voice.
            </h2>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
              Live ElevenLabs agent trained on my work, projects, and background.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="border border-[var(--line)] bg-[rgba(255,255,255,0.34)] px-2.5 py-1.5 text-[0.8rem] text-[var(--foreground)] sm:px-3 sm:py-2 sm:text-sm"
                >
                  {topic}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <button
                type="button"
                onClick={openVoiceLine}
                disabled={buttonDisabled}
                className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3 sm:text-[11px]"
              >
                <PhoneCall size={14} />
                {buttonLabel}
              </button>

              <a
                href="mailto:adityasingh@ucsb.edu"
                className="inline-flex items-center gap-2 border-b border-[var(--foreground)] pb-2 text-[0.8rem] font-medium text-[var(--foreground)] transition-opacity duration-300 hover:opacity-65 sm:text-sm"
              >
                Email instead
                <ArrowUpRight size={16} />
              </a>
            </div>

            <p className="mt-3 flex items-center gap-2 text-[0.8rem] text-[var(--muted)] sm:mt-4 sm:text-sm">
              <Mic size={15} />
              Works best on desktop with mic access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lab-panel relative p-4 sm:p-6 md:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(14,165,233,0.18), transparent 36%), radial-gradient(circle at bottom left, rgba(249,115,22,0.18), transparent 32%)',
              }}
            />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[10px]">
                  Live voice
                </p>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[10px]">
                  <Sparkles size={12} />
                  {state === 'ready' ? 'ready' : state === 'loading' ? 'starting' : 'waiting'}
                </div>
              </div>

              {state === 'ready' && (signedUrl || usePublicAgent) ? (
                createElement('elevenlabs-convai', {
                  ...(usePublicAgent ? { 'agent-id': publicAgentId } : { 'signed-url': signedUrl }),
                  className: 'voice-agent-widget',
                })
              ) : (
                <div className="flex min-h-[360px] flex-col items-center justify-center gap-6 border border-[var(--line)] bg-[rgba(255,255,255,0.44)] px-4 py-8 text-center sm:min-h-[560px] sm:gap-8 sm:px-6 sm:py-10">
                  <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                    <motion.div
                      className="absolute h-28 w-28 rounded-full border border-[rgba(14,165,233,0.22)] sm:h-36 sm:w-36"
                      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.18, 0.45] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute h-20 w-20 rounded-full border border-[rgba(249,115,22,0.24)] sm:h-24 sm:w-24"
                      animate={{ scale: [1, 0.92, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-[0_24px_80px_rgba(17,17,17,0.16)] sm:h-16 sm:w-16">
                      <PhoneCall size={18} />
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
                      Start talking.
                    </h3>
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base">
                      Click start, allow your mic, and ask a real question.
                    </p>

                    <div className="mt-4 grid gap-2 text-left sm:mt-6">
                      {sampleQuestions.map((question) => (
                        <div
                          key={question}
                          className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-3 py-2.5 text-[0.8rem] leading-relaxed text-[var(--foreground)] sm:px-4 sm:py-3 sm:text-sm"
                        >
                          {question}
                        </div>
                      ))}
                    </div>

                    {state === 'error' && (
                      <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]">{errorMessage}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        elevenlabs-convai.voice-agent-widget {
          display: block;
          width: 100%;
          min-height: 360px;
        }
        #voice .lab-panel {
          overflow: visible;
        }
        #voice .lab-panel::before {
          border-radius: inherit;
        }
        @media (min-width: 640px) {
          elevenlabs-convai.voice-agent-widget {
            min-height: 560px;
          }
        }
      `}</style>
    </section>
  );
}
