'use client';

import { useRef, useState, useCallback, useEffect, useId } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Volume2,
} from 'lucide-react';

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
        title: 'Click the giant mic. That is it.',
        body: 'A voice agent trained on everything about me — projects, experience, interests. Ask it anything.',
        hintLabel: 'Try asking',
        hintText: prompt,
        cta: 'Click anywhere to start',
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
      ? 'rgba(249,115,22,0.92)'
      : stage === 'blocked'
        ? 'rgba(220,38,38,0.82)'
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

  const cardContent = (
    <div className="relative z-10 flex min-h-[420px] flex-col justify-between px-5 py-6 text-center sm:min-h-[520px] sm:px-8 sm:py-8">
      <div className="flex items-center justify-between gap-3 text-left">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[10px]">
          Live
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
              duration: stage === 'speaking' ? 0.82 : 1.6,
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

        <VoiceReactiveCore
          conversation={conversation}
          stage={stage}
          panelActionable={panelActionable}
        />

        <div className="mt-7 max-w-[560px]">
          <h3 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] tracking-[-0.05em] text-[var(--foreground)]">
            {stageContent.title}
          </h3>
          <p className="mx-auto mt-4 max-w-[520px] text-[0.95rem] leading-relaxed text-[var(--muted)] sm:text-lg">
            {stageContent.body}
          </p>
        </div>

        <div className="mt-7 inline-flex max-w-full items-center gap-2 rounded-full border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.76)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[0_14px_36px_rgba(17,17,17,0.05)] sm:text-[11px]">
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
        ) : null}
      </div>
    </div>
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
            <h2 className="font-display max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.94] tracking-[-0.05em] text-[var(--foreground)]">
              Talk to me.
            </h2>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-[var(--muted)] sm:mt-5 sm:text-lg">
              A voice agent trained on everything about me. Ask it anything.
            </p>

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
