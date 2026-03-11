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

export function VoiceAgent() {
  const publicAgentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ?? '';
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
    <section id="voice" className="relative px-6 py-28 sm:py-36" ref={ref}>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        onLoad={() => setWidgetLoaded(true)}
      />

      <div className="lab-shell">
        <div className="grid gap-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lab-eyebrow mb-4">Voice</p>
            <h2 className="font-display max-w-4xl text-[clamp(2.8rem,6vw,4.6rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
              Ask by voice.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Live ElevenLabs agent trained on my work, projects, and background.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="border border-[var(--line)] bg-[rgba(255,255,255,0.34)] px-3 py-2 text-sm text-[var(--foreground)]"
                >
                  {topic}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openVoiceLine}
                disabled={buttonDisabled}
                className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PhoneCall size={14} />
                {buttonLabel}
              </button>

              <a
                href="mailto:adityasingh@ucsb.edu"
                className="inline-flex items-center gap-2 border-b border-[var(--foreground)] pb-2 text-sm font-medium text-[var(--foreground)] transition-opacity duration-300 hover:opacity-65"
              >
                Email instead
                <ArrowUpRight size={16} />
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
              <Mic size={15} />
              Works best on desktop with mic access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lab-panel relative overflow-hidden p-6 sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(14,165,233,0.18), transparent 36%), radial-gradient(circle at bottom left, rgba(249,115,22,0.18), transparent 32%)',
              }}
            />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Live voice
                </p>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
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
                <div className="flex min-h-[560px] flex-col items-center justify-center gap-8 border border-[var(--line)] bg-[rgba(255,255,255,0.44)] px-6 py-10 text-center">
                  <div className="relative flex h-36 w-36 items-center justify-center">
                    <motion.div
                      className="absolute h-36 w-36 rounded-full border border-[rgba(14,165,233,0.22)]"
                      animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.18, 0.45] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute h-24 w-24 rounded-full border border-[rgba(249,115,22,0.24)]"
                      animate={{ scale: [1, 0.92, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-[0_24px_80px_rgba(17,17,17,0.16)]">
                      <PhoneCall size={20} />
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <h3 className="font-display text-3xl tracking-[-0.04em] text-[var(--foreground)]">
                      Start talking.
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      Click start, allow your mic, and ask a real question.
                    </p>

                    <div className="mt-6 grid gap-2 text-left">
                      {sampleQuestions.map((question) => (
                        <div
                          key={question}
                          className="border border-[var(--line)] bg-[rgba(255,255,255,0.48)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)]"
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
          min-height: 560px;
        }
      `}</style>
    </section>
  );
}
