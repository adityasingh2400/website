'use client';

import { useRef, useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mic, MicOff, PhoneCall, PhoneOff, Sparkles } from 'lucide-react';

const topics = ['Projects', 'Ryft', 'Ziri'];
const sampleQuestions = [
  'What do you like building most?',
  'Which project is your favorite?',
  'What kind of work do you want next?',
  'What matters to you when you build AI?',
];

const AGENT_ID = 'agent_2901kkeajfaseyw97wxkc2mz646b';

export function VoiceAgent() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() || AGENT_ID;
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [errorMessage, setErrorMessage] = useState('');
  const [micDenied, setMicDenied] = useState(false);

  const conversation = useConversation({
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setErrorMessage(typeof error === 'string' ? error : 'Voice connection failed. Try again.');
    },
  });

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';
  const isIdle = conversation.status === 'disconnected';

  const startConversation = useCallback(async () => {
    setErrorMessage('');
    setMicDenied(false);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setMicDenied(true);
      setErrorMessage(
        'Microphone access was denied. Please allow mic access in your browser settings and try again.'
      );
      return;
    }

    try {
      await conversation.startSession({
        agentId,
        connectionType: 'webrtc',
      });
    } catch (err) {
      console.error('Failed to start session:', err);
      setErrorMessage('Could not connect to voice agent. Please try again.');
    }
  }, [agentId, conversation]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error('Failed to end session:', err);
    }
  }, [conversation]);

  const statusLabel = isConnected
    ? conversation.isSpeaking
      ? 'speaking'
      : 'listening'
    : isConnecting
      ? 'connecting'
      : 'waiting';

  return (
    <section id="voice" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={sectionRef}>
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
              {isConnected ? (
                <button
                  type="button"
                  onClick={stopConversation}
                  className="inline-flex items-center gap-2 border border-red-500 bg-red-500 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-[11px]"
                >
                  <PhoneOff size={14} />
                  End call
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startConversation}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3 sm:text-[11px]"
                >
                  <PhoneCall size={14} />
                  {isConnecting ? 'Connecting...' : 'Start talking'}
                </button>
              )}

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
              Requires mic access. Chrome or Safari work best.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lab-panel relative overflow-visible p-4 sm:p-6 md:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
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
                  {statusLabel}
                </div>
              </div>

              {isConnected ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center gap-8 border border-[var(--line)] bg-[rgba(255,255,255,0.44)] px-4 py-10 text-center sm:min-h-[480px] sm:px-6">
                  <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
                    <motion.div
                      className="absolute h-36 w-36 rounded-full border-2 sm:h-44 sm:w-44"
                      style={{
                        borderColor: conversation.isSpeaking
                          ? 'rgba(249,115,22,0.4)'
                          : 'rgba(14,165,233,0.3)',
                      }}
                      animate={{
                        scale: conversation.isSpeaking ? [1, 1.15, 1] : [1, 1.06, 1],
                        opacity: conversation.isSpeaking ? [0.6, 0.2, 0.6] : [0.4, 0.15, 0.4],
                      }}
                      transition={{
                        duration: conversation.isSpeaking ? 1.2 : 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute h-24 w-24 rounded-full border-2 sm:h-32 sm:w-32"
                      style={{
                        borderColor: conversation.isSpeaking
                          ? 'rgba(249,115,22,0.3)'
                          : 'rgba(14,165,233,0.25)',
                      }}
                      animate={{
                        scale: conversation.isSpeaking ? [1, 0.88, 1] : [1, 0.94, 1],
                        opacity: conversation.isSpeaking ? [0.5, 0.15, 0.5] : [0.35, 0.1, 0.35],
                      }}
                      transition={{
                        duration: conversation.isSpeaking ? 1 : 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full shadow-[0_24px_80px_rgba(17,17,17,0.16)] transition-colors duration-500 sm:h-20 sm:w-20"
                      style={{
                        background: conversation.isSpeaking ? '#f97316' : 'var(--foreground)',
                        color: 'var(--background)',
                      }}
                    >
                      {conversation.isSpeaking ? (
                        <Mic size={22} />
                      ) : (
                        <Mic size={22} />
                      )}
                    </div>
                  </div>

                  <div className="max-w-xs">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
                      {conversation.isSpeaking ? 'Talking...' : 'Listening...'}
                    </h3>
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:text-base">
                      {conversation.isSpeaking
                        ? 'The agent is responding. Feel free to interrupt.'
                        : 'Speak naturally. Ask about projects, work, or anything.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={stopConversation}
                    className="inline-flex items-center gap-2 border border-red-400 bg-[rgba(255,255,255,0.6)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 sm:text-[11px]"
                  >
                    <PhoneOff size={14} />
                    End call
                  </button>
                </div>
              ) : (
                <div className="flex min-h-[360px] flex-col items-center justify-center gap-6 border border-[var(--line)] bg-[rgba(255,255,255,0.44)] px-4 py-8 text-center sm:min-h-[480px] sm:gap-8 sm:px-6 sm:py-10">
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
                      {micDenied ? <MicOff size={18} /> : <PhoneCall size={18} />}
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
                      {micDenied ? 'Mic blocked.' : 'Start talking.'}
                    </h3>
                    <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-base">
                      {micDenied
                        ? 'Click the lock icon in your address bar, allow microphone, and reload.'
                        : 'Click the button, allow your mic, and ask a real question.'}
                    </p>

                    {!micDenied && (
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
                    )}

                    {errorMessage && (
                      <p className="mt-4 text-sm leading-relaxed text-red-600">{errorMessage}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
