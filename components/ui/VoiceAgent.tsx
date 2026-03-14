'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Sparkles,
  Volume2,
} from 'lucide-react';

const topics = ['Projects', 'Ryft', 'Ziri'];
const sampleQuestions = [
  'What do you like building most?',
  'Which project is your favorite?',
  'What kind of work do you want next?',
  'What matters to you when you build AI?',
];

const setupSteps = [
  {
    title: 'Click the giant mic',
    detail: 'The big voice card is the main action. You do not need to hunt for controls.',
  },
  {
    title: 'Allow microphone once',
    detail: 'Your browser may ask for mic permission the first time. After that, it just works.',
  },
  {
    title: 'Ask naturally',
    detail: 'Projects, Ryft, Ziri, what I care about building. Speak like a normal conversation.',
  },
];

const AGENT_ID = 'agent_2901kkeajfaseyw97wxkc2mz646b';
const SPEAKING_LINGER_MS = 1200;

type VoiceStage = 'ready' | 'connecting' | 'listening' | 'speaking' | 'blocked';

function getStageContent(stage: VoiceStage, prompt: string) {
  switch (stage) {
    case 'connecting':
      return {
        badge: 'connecting',
        title: 'Allow the mic and I will join automatically.',
        body: 'If your browser opened a permission popup, press Allow. The connection finishes on its own.',
        hintLabel: 'In a second, try saying',
        hintText: prompt,
        cta: 'Connecting...',
      };
    case 'listening':
      return {
        badge: 'live',
        title: 'You are live. Just talk normally.',
        body: 'No special commands needed. Ask a real question and the agent will respond in voice.',
        hintLabel: 'Good opener',
        hintText: prompt,
        cta: 'Listening now',
      };
    case 'speaking':
      return {
        badge: 'answering',
        title: 'The agent is answering.',
        body: 'Let it finish or interrupt whenever you want to steer the conversation somewhere else.',
        hintLabel: 'Next question idea',
        hintText: prompt,
        cta: 'Voice reply in progress',
      };
    case 'blocked':
      return {
        badge: 'mic blocked',
        title: 'Microphone access is blocked.',
        body: 'Click the lock icon in your address bar, allow microphone access, then press the giant mic again.',
        hintLabel: 'After enabling the mic, try',
        hintText: prompt,
        cta: 'Retry after enabling mic',
      };
    case 'ready':
    default:
      return {
        badge: 'one click start',
        title: 'Click the giant mic. That is it.',
        body: 'One tap starts the voice agent, requests your mic if needed, and drops you straight into the conversation.',
        hintLabel: 'Try asking',
        hintText: prompt,
        cta: 'Click anywhere in this panel to start',
      };
  }
}

export function VoiceAgent() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() || AGENT_ID;
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [errorMessage, setErrorMessage] = useState('');
  const [micDenied, setMicDenied] = useState(false);
  const [stableSpeaking, setStableSpeaking] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const lingerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const conversation = useConversation({
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setErrorMessage(typeof error === 'string' ? error : 'Voice connection failed. Try again.');
    },
  });

  useEffect(() => {
    if (conversation.isSpeaking) {
      if (lingerTimeout.current) {
        clearTimeout(lingerTimeout.current);
        lingerTimeout.current = null;
      }
      setStableSpeaking(true);
    } else {
      lingerTimeout.current = setTimeout(() => {
        setStableSpeaking(false);
        lingerTimeout.current = null;
      }, SPEAKING_LINGER_MS);
    }

    return () => {
      if (lingerTimeout.current) {
        clearTimeout(lingerTimeout.current);
      }
    };
  }, [conversation.isSpeaking]);

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';
  const isIdle = conversation.status === 'disconnected';
  const activePrompt = sampleQuestions[activePromptIndex];

  useEffect(() => {
    if (!isIdle || micDenied) return;

    const interval = setInterval(() => {
      setActivePromptIndex((current) => (current + 1) % sampleQuestions.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isIdle, micDenied]);

  const startConversation = useCallback(async () => {
    setErrorMessage('');
    setMicDenied(false);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setMicDenied(true);
      setErrorMessage(
        'Microphone access was denied. Allow mic access in your browser settings, then try again.'
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
      setErrorMessage('Could not connect to the voice agent. Please try again.');
    }
  }, [agentId, conversation]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error('Failed to end session:', err);
    }
  }, [conversation]);

  const stage: VoiceStage = micDenied
    ? 'blocked'
    : isConnected
      ? stableSpeaking
        ? 'speaking'
        : 'listening'
      : isConnecting
        ? 'connecting'
        : 'ready';

  const stageContent = getStageContent(stage, activePrompt);
  const pulseColor =
    stage === 'speaking'
      ? 'rgba(249,115,22,0.9)'
      : stage === 'blocked'
        ? 'rgba(220,38,38,0.8)'
        : 'rgba(14,165,233,0.86)';
  const panelActionable = !isConnected;

  const getStepState = (index: number) => {
    if (index === 0) return stage === 'ready' || stage === 'blocked' ? 'active' : 'done';
    if (index === 1) {
      if (stage === 'connecting' || stage === 'blocked') return 'active';
      return isConnected ? 'done' : 'idle';
    }
    return isConnected ? 'active' : 'idle';
  };

  const waveformHeights =
    stage === 'speaking'
      ? [26, 48, 34, 54, 28]
      : stage === 'listening'
        ? [18, 28, 22, 30, 18]
        : stage === 'connecting'
          ? [12, 22, 16, 22, 12]
          : stage === 'blocked'
            ? [8, 14, 10, 14, 8]
            : [10, 18, 12, 18, 10];

  const cardContent = (
    <>
      <div className="relative z-10 flex min-h-[420px] flex-col justify-between px-5 py-6 text-center sm:min-h-[520px] sm:px-8 sm:py-8">
        <div className="flex items-center justify-between gap-3 text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[10px]">
            Live voice
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.72)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--foreground)] shadow-[0_10px_30px_rgba(17,17,17,0.05)] sm:text-[10px]">
            <motion.span
              className="h-2 w-2 rounded-full"
              animate={{
                scale: stage === 'blocked' ? [1, 0.9, 1] : [0.9, 1.2, 0.9],
                opacity: [0.45, 1, 0.45],
                backgroundColor: [pulseColor, pulseColor, pulseColor],
              }}
              transition={{
                duration: stage === 'speaking' ? 0.85 : 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {stageContent.badge}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[14%] top-[18%] h-24 w-24 rounded-full blur-3xl sm:h-36 sm:w-36"
            animate={{
              x: [0, 18, -10, 0],
              y: [0, -14, 10, 0],
              opacity: [0.28, 0.42, 0.3, 0.28],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'rgba(14,165,233,0.18)' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[12%] right-[12%] h-28 w-28 rounded-full blur-3xl sm:h-40 sm:w-40"
            animate={{
              x: [0, -14, 12, 0],
              y: [0, 12, -10, 0],
              opacity: [0.22, 0.38, 0.26, 0.22],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                stage === 'speaking' ? 'rgba(249,115,22,0.18)' : 'rgba(251,146,60,0.16)',
            }}
          />

          <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full"
              animate={{
                rotate: panelActionable ? 360 : 0,
                scale: stage === 'speaking' ? [1, 1.06, 1] : [1, 1.02, 1],
              }}
              transition={{
                rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                background:
                  stage === 'blocked'
                    ? 'conic-gradient(from 90deg, rgba(220,38,38,0.18), rgba(248,113,113,0.42), rgba(220,38,38,0.18))'
                    : stage === 'speaking'
                      ? 'conic-gradient(from 90deg, rgba(249,115,22,0.16), rgba(249,115,22,0.48), rgba(14,165,233,0.16), rgba(249,115,22,0.16))'
                      : 'conic-gradient(from 90deg, rgba(14,165,233,0.14), rgba(14,165,233,0.44), rgba(249,115,22,0.16), rgba(14,165,233,0.14))',
                filter: 'blur(0.5px)',
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[14%] rounded-full border"
              animate={{
                scale: stage === 'speaking' ? [1, 1.1, 1] : [1, 1.05, 1],
                opacity: stage === 'blocked' ? [0.5, 0.3, 0.5] : [0.38, 0.12, 0.38],
              }}
              transition={{
                duration: stage === 'speaking' ? 1.1 : 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                borderColor:
                  stage === 'blocked' ? 'rgba(220,38,38,0.38)' : 'rgba(255,255,255,0.75)',
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[24%] rounded-full"
              animate={{
                scale: stage === 'speaking' ? [1, 0.9, 1] : [1, 0.96, 1],
                opacity: stage === 'blocked' ? [0.24, 0.15, 0.24] : [0.28, 0.18, 0.28],
              }}
              transition={{
                duration: stage === 'speaking' ? 0.95 : 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background:
                  stage === 'blocked'
                    ? 'rgba(255,255,255,0.55)'
                    : 'radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.2) 72%)',
              }}
            />
            <motion.div
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(255,255,255,0.78)] bg-[rgba(255,255,255,0.8)] text-[var(--foreground)] shadow-[0_34px_120px_rgba(17,17,17,0.14)] sm:h-36 sm:w-36"
              animate={{
                y: panelActionable ? [0, -4, 0] : [0, -2, 0],
                boxShadow:
                  stage === 'speaking'
                    ? [
                        '0 34px 120px rgba(249,115,22,0.15)',
                        '0 40px 130px rgba(249,115,22,0.25)',
                        '0 34px 120px rgba(249,115,22,0.15)',
                      ]
                    : [
                        '0 30px 110px rgba(17,17,17,0.1)',
                        '0 36px 124px rgba(17,17,17,0.16)',
                        '0 30px 110px rgba(17,17,17,0.1)',
                      ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {stage === 'connecting' ? (
                <LoaderCircle size={40} className="animate-spin" />
              ) : stage === 'blocked' ? (
                <MicOff size={38} />
              ) : stage === 'speaking' ? (
                <Volume2 size={40} />
              ) : (
                <Mic size={40} />
              )}
            </motion.div>
          </div>

          <div className="mt-8 max-w-[540px]">
            <h3 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] tracking-[-0.05em] text-[var(--foreground)]">
              {stageContent.title}
            </h3>
            <p className="mx-auto mt-4 max-w-[520px] text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-lg">
              {stageContent.body}
            </p>
          </div>

          <div className="mt-6 flex items-end gap-1.5">
            {waveformHeights.map((height, index) => (
              <motion.span
                key={`${stage}-${index}`}
                className="w-1.5 rounded-full"
                animate={{
                  height: [Math.max(8, height - 8), height, Math.max(10, height - 4)],
                  opacity: [0.35, 0.92, 0.45],
                  backgroundColor: [pulseColor, pulseColor, pulseColor],
                }}
                transition={{
                  duration: stage === 'speaking' ? 0.72 : 1.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.08,
                }}
                style={{ height }}
              />
            ))}
          </div>

          <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.76)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[0_14px_36px_rgba(17,17,17,0.05)] sm:text-[11px]">
            {stage === 'blocked' ? <MicOff size={14} /> : <PhoneCall size={14} />}
            {stageContent.cta}
          </div>

          <div className="mt-5 max-w-[540px] rounded-[28px] border border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.62)] px-4 py-3 shadow-[0_16px_42px_rgba(17,17,17,0.05)] sm:px-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
              {stageContent.hintLabel}
            </p>
            <motion.p
              key={`${stage}-${activePrompt}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-sm font-medium leading-relaxed text-[var(--foreground)] sm:text-base"
            >
              <span aria-hidden>&ldquo;</span>
              {stageContent.hintText}
              <span aria-hidden>&rdquo;</span>
            </motion.p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 text-left">
          <p className="max-w-[280px] text-[0.78rem] leading-relaxed text-[var(--muted)] sm:text-sm">
            Chrome or Safari work best. If the browser asks for the mic, allow it once and you are done.
          </p>

          {isConnected ? (
            <button
              type="button"
              onClick={stopConversation}
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-red-500 bg-red-500 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-5 sm:text-[11px]"
            >
              <PhoneOff size={14} />
              End call
            </button>
          ) : (
            <div className="hidden items-center gap-2 rounded-full border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.76)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)] sm:inline-flex">
              <Sparkles size={12} />
              click the big card
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <section id="voice" className="relative px-4 py-20 sm:px-6 sm:py-36" ref={sectionRef}>
      <div className="lab-shell">
        <div className="grid gap-8 sm:gap-10 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lab-eyebrow mb-3 sm:mb-4">Voice</p>
            <h2 className="font-display max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
              Voice, without guesswork.
            </h2>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
              One giant button. One mic prompt. Then just talk.
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

            <div className="mt-8 grid gap-3 sm:mt-10">
              {setupSteps.map((step, index) => {
                const stepState = getStepState(index);
                const isActive = stepState === 'active';
                const isDone = stepState === 'done';

                return (
                  <div
                    key={step.title}
                    className="border px-4 py-4 transition-colors duration-300 sm:px-5"
                    style={{
                      borderColor: isDone
                        ? 'rgba(14,165,233,0.28)'
                        : isActive
                          ? 'rgba(17,17,17,0.24)'
                          : 'var(--line)',
                      background: isDone
                        ? 'rgba(14,165,233,0.08)'
                        : isActive
                          ? 'rgba(255,255,255,0.72)'
                          : 'rgba(255,255,255,0.44)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-[11px]"
                        style={{
                          borderColor: isDone
                            ? 'rgba(14,165,233,0.32)'
                            : isActive
                              ? 'rgba(17,17,17,0.18)'
                              : 'rgba(17,17,17,0.12)',
                          background: isDone ? 'rgba(14,165,233,0.12)' : 'rgba(255,255,255,0.74)',
                        }}
                      >
                        {isDone ? <Check size={14} /> : index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)] sm:text-[0.98rem]">
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[var(--muted)] sm:text-sm">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                Good first questions
              </p>
              <div className="mt-3 grid gap-2">
                {sampleQuestions.map((question, index) => {
                  const isSelected = index === activePromptIndex;

                  return (
                    <button
                      key={question}
                      type="button"
                      onClick={() => setActivePromptIndex(index)}
                      className="flex items-center justify-between gap-4 border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 sm:px-5"
                      style={{
                        borderColor: isSelected ? 'rgba(17,17,17,0.22)' : 'var(--line)',
                        background: isSelected ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.46)',
                      }}
                    >
                      <span className="text-[0.84rem] leading-relaxed text-[var(--foreground)] sm:text-sm">
                        {question}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        {isSelected ? 'queued' : 'hint'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="mailto:adityasingh@ucsb.edu"
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--foreground)] pb-2 text-[0.8rem] font-medium text-[var(--foreground)] transition-opacity duration-300 hover:opacity-65 sm:mt-10 sm:text-sm"
            >
              Email instead
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lab-panel relative overflow-hidden p-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.68)), radial-gradient(circle at top left, rgba(14,165,233,0.08), transparent 34%), radial-gradient(circle at bottom right, rgba(249,115,22,0.08), transparent 38%)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.12), transparent 32%), radial-gradient(circle at 18% 12%, rgba(14,165,233,0.12), transparent 28%), radial-gradient(circle at 88% 84%, rgba(249,115,22,0.12), transparent 28%)',
              }}
            />

            {isConnected ? (
              <div className="relative">{cardContent}</div>
            ) : (
              <motion.button
                type="button"
                onClick={startConversation}
                disabled={isConnecting}
                className="relative block w-full text-left disabled:cursor-progress"
                whileHover={isConnecting ? undefined : { y: -4, scale: 1.005 }}
                whileTap={isConnecting ? undefined : { scale: 0.995 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {cardContent}
              </motion.button>
            )}

            {errorMessage && (
              <div className="border-t border-[rgba(220,38,38,0.14)] bg-[rgba(254,242,242,0.88)] px-5 py-4 text-sm leading-relaxed text-red-700 sm:px-8">
                {errorMessage}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
