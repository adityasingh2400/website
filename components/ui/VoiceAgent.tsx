'use client';

import { useRef, useState, useCallback, useEffect, useId } from 'react';
import { useConversation } from '@elevenlabs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LoaderCircle, Mic, MicOff, PhoneOff, Volume2, X } from 'lucide-react';

const sampleQuestions = [
  'What do you like building most?',
  'Which project is your favorite?',
  'What got you into agents and voice?',
  'What kind of work do you want next?',
  'What matters to you when you build AI?',
];

const AGENT_ID = 'agent_2901kkeajfaseyw97wxkc2mz646b';
const SPEAKING_LINGER_MS = 1200;
const RING_VIEWBOX = 280;
const RING_CENTER = RING_VIEWBOX / 2;
const RING_BUCKETS = 48;

type VoiceStage = 'ready' | 'connecting' | 'listening' | 'speaking' | 'blocked';

type VoiceVisualizerApi = {
  getOutputByteFrequencyData: () => Uint8Array | undefined;
  getOutputVolume: () => number;
};

type Point = {
  x: number;
  y: number;
};

type VoiceRingFrame = {
  primaryPath: string;
  secondaryPath: string;
  glowPath: string;
  energy: number;
  auraOpacity: number;
  auraScale: number;
  coreScale: number;
  strokeWidth: number;
  secondaryStrokeWidth: number;
  rotation: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function average(values: number[]) {
  if (values.length === 0) return 0;

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function averageRange(values: number[], start: number, end: number) {
  const safeStart = clamp(Math.floor(start), 0, values.length);
  const safeEnd = clamp(Math.floor(end), safeStart + 1, values.length);

  return average(values.slice(safeStart, safeEnd));
}

function smoothValue(current: number, target: number, attack: number, release: number) {
  const factor = target > current ? attack : release;
  return current + (target - current) * factor;
}

function midpoint(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function buildClosedPath(points: Point[]) {
  if (points.length < 2) return '';

  const firstMidpoint = midpoint(points[0], points[1]);
  let path = `M ${firstMidpoint.x.toFixed(2)} ${firstMidpoint.y.toFixed(2)}`;

  for (let index = 1; index <= points.length; index += 1) {
    const current = points[index % points.length];
    const next = points[(index + 1) % points.length];
    const nextMidpoint = midpoint(current, next);

    path += ` Q ${current.x.toFixed(2)} ${current.y.toFixed(2)} ${nextMidpoint.x.toFixed(
      2
    )} ${nextMidpoint.y.toFixed(2)}`;
  }

  return `${path} Z`;
}

function bucketFrequencyData(data: Uint8Array, bucketCount: number) {
  if (data.length === 0) {
    return new Array(bucketCount).fill(0);
  }

  const start = Math.floor(data.length * 0.02);
  const end = Math.max(start + bucketCount, Math.floor(data.length * 0.6));
  const usable = data.subarray(start, end);
  const width = usable.length / bucketCount;

  return Array.from({ length: bucketCount }, (_, bucketIndex) => {
    const rangeStart = Math.floor(bucketIndex * width);
    const rangeEnd = Math.max(rangeStart + 1, Math.floor((bucketIndex + 1) * width));
    let weightedTotal = 0;
    let totalWeight = 0;

    for (let index = rangeStart; index < rangeEnd; index += 1) {
      const normalized = usable[index] / 255;
      const frequencyWeight = 1.08 - (index / Math.max(usable.length - 1, 1)) * 0.4;

      weightedTotal += Math.pow(normalized, 1.35) * frequencyWeight;
      totalWeight += frequencyWeight;
    }

    return totalWeight > 0 ? weightedTotal / totalWeight : 0;
  });
}

function createSyntheticSpectrum(stage: VoiceStage, time: number, energy: number) {
  const base =
    stage === 'speaking'
      ? 0.14
      : stage === 'listening'
        ? 0.05
        : stage === 'connecting'
          ? 0.08
          : stage === 'blocked'
            ? 0.02
            : 0.035;
  const swing =
    stage === 'speaking'
      ? 0.18 + energy * 0.18
      : stage === 'connecting'
        ? 0.08
        : stage === 'listening'
          ? 0.05
          : 0.025;

  return Array.from({ length: RING_BUCKETS }, (_, index) => {
    const progress = index / RING_BUCKETS;
    const waveA = (Math.sin(time * 0.0022 + progress * Math.PI * 6) + 1) / 2;
    const waveB = (Math.sin(time * 0.0011 - progress * Math.PI * 10) + 1) / 2;
    const waveC = (Math.sin(time * 0.0033 + progress * Math.PI * 14) + 1) / 2;

    return clamp(base + swing * (waveA * 0.52 + waveB * 0.31 + waveC * 0.17), 0, 1);
  });
}

function buildRingPath(
  samples: number[],
  time: number,
  baseRadius: number,
  amplitude: number,
  swirl: number,
  phase = 0
) {
  const points = samples.map((sample, index) => {
    const angle = (index / samples.length) * Math.PI * 2 - Math.PI / 2;
    const previous = samples[(index - 1 + samples.length) % samples.length];
    const next = samples[(index + 1) % samples.length];
    const shapedSample = sample * 0.56 + ((previous + next) / 2) * 0.44;
    const ridge = Math.pow(shapedSample, 1.45) * amplitude;
    const ripple =
      Math.sin(angle * 3 + time * 0.0018 + phase) * swirl +
      Math.sin(angle * 7 - time * 0.0011 + phase * 1.35) * swirl * 0.55;
    const radius = baseRadius + ridge + ripple;

    return {
      x: RING_CENTER + Math.cos(angle) * radius,
      y: RING_CENTER + Math.sin(angle) * radius,
    };
  });

  return buildClosedPath(points);
}

function createRingFrame(
  stage: VoiceStage,
  samples: number[],
  energy: number,
  time: number
): VoiceRingFrame {
  const speaking = stage === 'speaking';
  const amplitude =
    (speaking ? 20 : stage === 'listening' ? 8 : stage === 'connecting' ? 11 : stage === 'blocked' ? 5 : 4) +
    energy * (speaking ? 23 : 7);
  const primaryPath = buildRingPath(
    samples,
    time,
    94 + energy * 6,
    amplitude,
    speaking ? 5.4 + energy * 2.8 : 2.6,
    0
  );
  const secondaryPath = buildRingPath(
    samples.map((sample) => sample * 0.72),
    time,
    80 + energy * 4,
    amplitude * 0.62,
    speaking ? 2.9 + energy * 1.4 : 1.4,
    Math.PI / 5
  );
  const glowPath = buildRingPath(
    samples.map((sample) => clamp(sample * 1.18, 0, 1)),
    time,
    98 + energy * 8,
    amplitude * 1.08,
    speaking ? 6.8 + energy * 2.4 : 2.3,
    Math.PI / 3
  );

  return {
    primaryPath,
    secondaryPath,
    glowPath,
    energy,
    auraOpacity: clamp(0.16 + energy * (speaking ? 0.62 : 0.18), 0.16, 0.9),
    auraScale: 1 + energy * (speaking ? 0.22 : 0.06),
    coreScale: 1 + energy * (speaking ? 0.12 : 0.04),
    strokeWidth: 4.5 + energy * (speaking ? 6.5 : 2.3),
    secondaryStrokeWidth: 1.8 + energy * (speaking ? 2.4 : 1.1),
    rotation: time * (speaking ? 0.006 : 0.0024),
  };
}

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
        title: 'Talking.',
        body: 'Let it finish or interrupt whenever you want to steer the conversation somewhere else.',
        hintLabel: 'Next question idea',
        hintText: prompt,
        cta: 'Talking now',
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
        title: 'Click the mic.',
        body: 'A voice agent trained on everything about me — projects, experience, interests. Ask it anything.',
        hintLabel: 'Try asking',
        hintText: prompt,
        cta: '',
      };
  }
}

function VoiceReactiveCore({
  conversation,
  stage,
  panelActionable,
}: {
  conversation: VoiceVisualizerApi;
  stage: VoiceStage;
  panelActionable: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState(() =>
    createRingFrame('ready', createSyntheticSpectrum('ready', 0, 0.06), 0.06, 0)
  );
  const gradientId = useId().replace(/:/g, '');
  const smoothedSpectrumRef = useRef<number[]>(new Array(RING_BUCKETS).fill(0.04));
  const previousBucketsRef = useRef<number[]>(new Array(RING_BUCKETS).fill(0));
  const smoothedEnergyRef = useRef(0.06);

  useEffect(() => {
    if (reduceMotion) {
      const reducedEnergy =
        stage === 'speaking'
          ? 0.58
          : stage === 'listening'
            ? 0.16
            : stage === 'connecting'
              ? 0.18
              : stage === 'blocked'
                ? 0.06
                : 0.08;

      setFrame(createRingFrame(stage, createSyntheticSpectrum(stage, 0, reducedEnergy), reducedEnergy, 0));
      return;
    }

    let animationFrame = 0;
    let mounted = true;

    const loop = (time: number) => {
      const outputData = conversation.getOutputByteFrequencyData();
      const volume = clamp(conversation.getOutputVolume(), 0, 1);
      const liveBuckets = outputData?.length ? bucketFrequencyData(outputData, RING_BUCKETS) : null;
      const syntheticBuckets = createSyntheticSpectrum(stage, time, smoothedEnergyRef.current);

      let flux = 0;

      if (liveBuckets) {
        flux = average(
          liveBuckets.map((bucket, index) => Math.max(0, bucket - previousBucketsRef.current[index]))
        );
        previousBucketsRef.current = liveBuckets;
      }

      const liveMix =
        stage === 'speaking' ? 0.88 : stage === 'listening' ? 0.34 : stage === 'connecting' ? 0.26 : 0.18;
      const targetBuckets = syntheticBuckets.map((bucket, index) =>
        liveBuckets ? clamp(bucket * (1 - liveMix) + liveBuckets[index] * liveMix, 0, 1) : bucket
      );

      const lowBand = averageRange(targetBuckets, 0, RING_BUCKETS * 0.28);
      const midBand = averageRange(targetBuckets, RING_BUCKETS * 0.28, RING_BUCKETS * 0.68);
      const highBand = averageRange(targetBuckets, RING_BUCKETS * 0.68, RING_BUCKETS);
      const spectralEnergy = average(targetBuckets);

      let targetEnergy = Math.max(
        volume * 1.45,
        spectralEnergy * 1.7,
        lowBand * 0.82 + midBand * 0.96 + highBand * 0.56,
        flux * 1.45
      );

      if (stage === 'speaking') {
        targetEnergy = Math.max(targetEnergy, 0.14);
      } else if (stage === 'listening') {
        targetEnergy = Math.max(targetEnergy * 0.45, 0.06);
      } else if (stage === 'connecting') {
        targetEnergy = 0.12;
      } else if (stage === 'blocked') {
        targetEnergy = 0.05;
      } else {
        targetEnergy = 0.04;
      }

      targetEnergy = clamp(targetEnergy, 0, 1);

      const attack = stage === 'speaking' ? 0.32 : 0.22;
      const release = stage === 'speaking' ? 0.16 : 0.1;

      smoothedEnergyRef.current = smoothValue(
        smoothedEnergyRef.current,
        targetEnergy,
        attack,
        release
      );
      smoothedSpectrumRef.current = smoothedSpectrumRef.current.map((current, index) => {
        const target = clamp(
          targetBuckets[index] * (0.6 + smoothedEnergyRef.current * 0.95),
          0,
          1
        );

        return smoothValue(current, target, attack, release * 0.94);
      });

      if (mounted) {
        setFrame(createRingFrame(stage, smoothedSpectrumRef.current, smoothedEnergyRef.current, time));
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => {
      mounted = false;
      cancelAnimationFrame(animationFrame);
    };
  }, [conversation, stage, reduceMotion]);

  const isSpeaking = stage === 'speaking';
  const isBlocked = stage === 'blocked';
  const isConnecting = stage === 'connecting';
  const Icon = isConnecting ? LoaderCircle : isBlocked ? MicOff : isSpeaking ? Volume2 : Mic;
  const startColor = isBlocked ? '#fb7185' : isSpeaking ? '#38bdf8' : '#7dd3fc';
  const midColor = isBlocked ? '#fecaca' : '#ffffff';
  const endColor = isBlocked ? '#f87171' : isSpeaking ? '#fb923c' : '#fdba74';
  const glowColor = isBlocked ? 'rgba(248,113,113,0.32)' : isSpeaking ? 'rgba(249,115,22,0.42)' : 'rgba(14,165,233,0.2)';

  return (
    <div className="relative flex h-64 w-64 items-center justify-center sm:h-[22rem] sm:w-[22rem]">
      <div
        aria-hidden
        className="absolute inset-[9%] rounded-full blur-[54px] transition-transform duration-300"
        style={{
          opacity: frame.auraOpacity,
          transform: `scale(${frame.auraScale})`,
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0.14) 48%, transparent 76%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[18%] rounded-full blur-[26px]"
        style={{
          opacity: 0.26 + frame.energy * 0.24,
          background:
            stage === 'speaking'
              ? 'radial-gradient(circle, rgba(255,255,255,0.48) 0%, rgba(251,146,60,0.16) 58%, transparent 78%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(125,211,252,0.12) 58%, transparent 78%)',
        }}
      />

      <svg
        aria-hidden
        viewBox={`0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`ring-gradient-${gradientId}`} x1="12%" y1="10%" x2="88%" y2="86%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="48%" stopColor={midColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
          <linearGradient id={`ring-secondary-${gradientId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="52%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="100%" stopColor={startColor} />
          </linearGradient>
          <filter
            id={`ring-blur-${gradientId}`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <g style={{ transformOrigin: `${RING_CENTER}px ${RING_CENTER}px`, transform: `rotate(${frame.rotation}deg)` }}>
          <path
            d={frame.glowPath}
            fill="none"
            stroke={`url(#ring-gradient-${gradientId})`}
            strokeWidth={frame.strokeWidth + 14}
            strokeLinecap="round"
            opacity={0.22 + frame.energy * 0.44}
            filter={`url(#ring-blur-${gradientId})`}
          />
          <path
            d={frame.secondaryPath}
            fill="none"
            stroke={`url(#ring-secondary-${gradientId})`}
            strokeWidth={frame.secondaryStrokeWidth}
            strokeLinecap="round"
            opacity={0.34 + frame.energy * 0.34}
          />
          <path
            d={frame.primaryPath}
            fill="none"
            stroke={`url(#ring-gradient-${gradientId})`}
            strokeWidth={frame.strokeWidth}
            strokeLinecap="round"
            opacity={0.95}
          />
        </g>
      </svg>

      <div
        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(255,255,255,0.82)] bg-[rgba(255,255,255,0.84)] text-[var(--foreground)] shadow-[0_30px_120px_rgba(17,17,17,0.14)] sm:h-36 sm:w-36"
        style={{
          transform: `scale(${frame.coreScale}) translateY(${panelActionable ? -2 : 0}px)`,
          boxShadow: isSpeaking
            ? `0 0 0 1px rgba(255,255,255,0.66), 0 34px 140px rgba(249,115,22,${0.18 + frame.energy * 0.18})`
            : '0 30px 120px rgba(17,17,17,0.14)',
        }}
      >
        <Icon
          size={40}
          className={isConnecting ? 'animate-spin' : undefined}
          strokeWidth={1.9}
        />
      </div>
    </div>
  );
}

export function VoiceAgent() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() || AGENT_ID;
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
      ? 'rgba(249,115,22,0.92)'
      : stage === 'blocked'
        ? 'rgba(220,38,38,0.82)'
        : 'rgba(14,165,233,0.86)';
  const panelActionable = !isConnected;

  const [open, setOpen] = useState(false);

  const openVoice = useCallback(() => {
    setOpen(true);
    void startConversation();
  }, [startConversation]);

  const closeVoice = useCallback(() => {
    void stopConversation();
    setOpen(false);
    setMicDenied(false);
    setErrorMessage('');
  }, [stopConversation]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeVoice();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeVoice]);

  return (
    <>
      <button
        type="button"
        onClick={openVoice}
        className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-[rgba(255,255,255,0.5)] px-4 py-2.5 text-[0.82rem] font-medium text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:bg-[rgba(255,255,255,0.82)] sm:text-[0.9rem]"
      >
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
        </span>
        Talk to me
        <Mic
          size={15}
          strokeWidth={1.8}
          className="opacity-55 transition-opacity duration-300 group-hover:opacity-100"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-[rgba(244,238,227,0.74)] backdrop-blur-xl"
              onClick={closeVoice}
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Talk to Aditya"
              className="relative z-10 flex w-full max-w-[480px] flex-col items-center rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.74)] px-6 py-8 text-center shadow-[0_40px_120px_rgba(17,17,17,0.18)] backdrop-blur-2xl sm:px-10 sm:py-10"
            >
              <button
                type="button"
                onClick={closeVoice}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              >
                <X size={16} />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.7)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--foreground)] sm:text-[10px]">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.45, 1, 0.45] }}
                  transition={{
                    duration: stage === 'speaking' ? 0.82 : 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ backgroundColor: pulseColor }}
                />
                {stageContent.badge}
              </div>

              <VoiceReactiveCore conversation={conversation} stage={stage} panelActionable={panelActionable} />

              <h3 className="-mt-2 font-display text-[clamp(1.9rem,6vw,2.9rem)] leading-[1.02] text-[var(--foreground)]">
                {stageContent.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[360px] text-[0.9rem] leading-relaxed text-[var(--muted)] sm:text-[0.98rem]">
                {stageContent.body}
              </p>

              <div className="mt-5 w-full max-w-[380px] rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.6)] px-4 py-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                  {stageContent.hintLabel}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${stage}-${activePrompt}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1.5 text-[0.92rem] font-medium text-[var(--foreground)]"
                  >
                    &ldquo;{stageContent.hintText}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {isConnected ? (
                  <button
                    type="button"
                    onClick={closeVoice}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(220,38,38,0.4)] bg-[rgba(220,38,38,0.06)] px-5 py-2.5 text-[0.82rem] font-medium text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(220,38,38,0.12)]"
                  >
                    <PhoneOff size={15} />
                    End conversation
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openVoice}
                    disabled={isConnecting}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-2.5 text-[0.82rem] font-medium text-[var(--background)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-70"
                  >
                    {stage === 'blocked' ? <MicOff size={15} /> : <Mic size={15} />}
                    {stage === 'blocked' ? 'Retry mic' : isConnecting ? 'Connecting…' : 'Start talking'}
                  </button>
                )}
              </div>

              <p className="mt-4 max-w-[320px] text-[0.72rem] leading-relaxed text-[var(--muted)]">
                Chrome or Safari work best. Allow the mic once and just talk.
              </p>

              {errorMessage && (
                <p className="mt-3 max-w-[340px] text-[0.78rem] leading-relaxed text-red-600">{errorMessage}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
