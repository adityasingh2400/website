'use client';

import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge, GitPullRequest, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

type Point = {
  x: number;
  y: number;
};

const CANVAS = { width: 1000, height: 1000 };
// We perfectly center the BOUNDING BOX.
// For an equilateral triangle with R=350 pointing left:
// The bounding box center needs to be precisely at x=500.
// Thus, HUB_X = 500 + 350 / 4 = 587.5. HUB_Y = 500.
const HUB = { x: 587.5, y: 500 };
const HUB_RADIUS = 75;
const OUTER_RADIUS = 125;
const LEAF_LABEL_OFFSET = 'translate-y-[6rem] sm:translate-y-[7.5rem] md:translate-y-[8.5rem]';
const MAX_PRS_VISIBLE = 10;

const contributions = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 26364,
    repoUrl: 'https://github.com/openai/openai-agents-python/pulls?q=is%3Apr+author%3Aadityasingh2400+is%3Amerged',
    position: { x: 237.5, y: 500 }, // Angle 180
    logoClassName: 'h-[8.25rem] w-[8.25rem] sm:h-[10.5rem] sm:w-[10.5rem] md:h-[12rem] md:w-[12rem]',
    color: 'text-emerald-500',
    textColor: 'text-[var(--foreground)] hover:text-emerald-500',
    align: 'left',
    layoutClasses: 'top-[45%] -translate-y-1/2 left-[5vw]',
    prs: [
      { title: 'fix(tracing): keep BatchTraceProcessor worker alive on exporter errors', url: 'https://github.com/openai/openai-agents-python/pull/3216', date: 'May 9, 2026' },
      { title: 'fix(realtime): validate RealtimeAgent fields in __post_init__', url: 'https://github.com/openai/openai-agents-python/pull/3234', date: 'May 9, 2026' },
      { title: 'fix(litellm): avoid duplicating content and signed thinking blocks across parallel tool-call splits', url: 'https://github.com/openai/openai-agents-python/pull/3215', date: 'May 9, 2026' },
      { title: 'fix(redis-session): preserve created_at across writes', url: 'https://github.com/openai/openai-agents-python/pull/3202', date: 'May 9, 2026' },
      { title: 'fix(handoffs): preserve HandoffInputData.input_items in remove_all_tools', url: 'https://github.com/openai/openai-agents-python/pull/3253', date: 'May 9, 2026' },
      { title: "fix(voice): stop AudioInput.to_base64() from mutating caller's buffer", url: 'https://github.com/openai/openai-agents-python/pull/3201', date: 'May 9, 2026' },
      { title: 'fix(realtime): treat None audio.input/audio.output as unset', url: 'https://github.com/openai/openai-agents-python/pull/3254', date: 'May 9, 2026' },
      { title: 'fix(sessions): skip corrupt docs in MongoDBSession.pop_item', url: 'https://github.com/openai/openai-agents-python/pull/3247', date: 'May 9, 2026' },
      { title: 'fix(realtime): preserve output_audio content parts in output_item events', url: 'https://github.com/openai/openai-agents-python/pull/3230', date: 'May 9, 2026' },
      { title: 'fix(any-llm): avoid duplicating content and signed thinking blocks across parallel tool-call splits', url: 'https://github.com/openai/openai-agents-python/pull/3261', date: 'May 8, 2026' },
      { title: 'fix(computer): exclude Computer instances from provider duck-typing', url: 'https://github.com/openai/openai-agents-python/pull/3249', date: 'May 8, 2026' },
      { title: 'fix(realtime): raise UserError for input_type without on_handoff', url: 'https://github.com/openai/openai-agents-python/pull/3248', date: 'May 8, 2026' },
      { title: 'fix(run): preserve last known response_id on conversation resume', url: 'https://github.com/openai/openai-agents-python/pull/3245', date: 'May 8, 2026' },
      { title: 'fix(realtime): skip invalid input_text parts in user input conversion', url: 'https://github.com/openai/openai-agents-python/pull/3243', date: 'May 8, 2026' },
      { title: 'fix: preserve tool guardrail results across handoffs in SingleStepResult', url: 'https://github.com/openai/openai-agents-python/pull/3237', date: 'May 8, 2026' },
      { title: 'fix(approvals): skip needs_approval_checker when status already resolved', url: 'https://github.com/openai/openai-agents-python/pull/3229', date: 'May 8, 2026' },
      { title: 'fix(sessions): persist output_tokens_details when input details are None', url: 'https://github.com/openai/openai-agents-python/pull/3227', date: 'May 8, 2026' },
      { title: 'fix(run): skip CompactionItem silently in stream queue helper', url: 'https://github.com/openai/openai-agents-python/pull/3224', date: 'May 8, 2026' },
      { title: 'fix(realtime): expose max_output_tokens on RealtimeSessionModelSettings', url: 'https://github.com/openai/openai-agents-python/pull/3223', date: 'May 8, 2026' },
      { title: 'fix(run): preserve failed status across apply_patch operations', url: 'https://github.com/openai/openai-agents-python/pull/3217', date: 'May 8, 2026' },
      { title: 'fix(realtime): preserve existing transcript over stale delta accumulator', url: 'https://github.com/openai/openai-agents-python/pull/3214', date: 'May 8, 2026' },
      { title: 'fix(usage): preserve existing request_usage_entries on Usage.add', url: 'https://github.com/openai/openai-agents-python/pull/3213', date: 'May 8, 2026' },
      { title: 'fix(handoffs): await on_handoff callables with async __call__', url: 'https://github.com/openai/openai-agents-python/pull/3211', date: 'May 8, 2026' },
      { title: 'fix(exceptions): export MCPToolCancellationError from top-level package', url: 'https://github.com/openai/openai-agents-python/pull/3210', date: 'May 8, 2026' },
      { title: 'fix(result): drop reasoning items orphaned by dropped tool calls', url: 'https://github.com/openai/openai-agents-python/pull/3207', date: 'May 8, 2026' },
      { title: 'fix(strict-schema): preserve chained $ref during sibling-key expansion', url: 'https://github.com/openai/openai-agents-python/pull/3205', date: 'May 8, 2026' },
      { title: 'fix(mcp): isolate strict schema conversion from non-strict fallback', url: 'https://github.com/openai/openai-agents-python/pull/3199', date: 'May 8, 2026' },
      { title: 'fix(models): allow extra_query/extra_body via extra_args in Responses', url: 'https://github.com/openai/openai-agents-python/pull/3194', date: 'May 8, 2026' },
      { title: 'test(realtime): cover overlapping tool response creates', url: 'https://github.com/openai/openai-agents-python/pull/3140', date: 'May 6, 2026' },
      { title: 'fix(mcp): make duplicate tool errors deterministic', url: 'https://github.com/openai/openai-agents-python/pull/3136', date: 'May 6, 2026' },
      { title: 'fix(mcp): reject non-object tool input JSON', url: 'https://github.com/openai/openai-agents-python/pull/3135', date: 'May 6, 2026' },
      { title: 'fix(mcp): avoid mutating tool input schemas', url: 'https://github.com/openai/openai-agents-python/pull/3134', date: 'May 6, 2026' },
      { title: 'feat(mcp): expose list_resources, list_resource_templates, and read_resource on MCPServer', url: 'https://github.com/openai/openai-agents-python/pull/2721', date: 'Mar 21, 2026' },
      { title: 'feat(mcp): expose session_id on MCPServerStreamableHttp', url: 'https://github.com/openai/openai-agents-python/pull/2708', date: 'Mar 19, 2026' },
      { title: 'feat(mcp): expose auth and httpx_client_factory in SSE/StreamableHttp params', url: 'https://github.com/openai/openai-agents-python/pull/2713', date: 'Mar 19, 2026' },
      { title: 'fix: #879 return McpError as a structured error result instead of crashing the agent run', url: 'https://github.com/openai/openai-agents-python/pull/2598', date: 'Mar 4, 2026' },
    ],
  },
  {
    name: 'Stanford DSPy',
    logo: '/stanfordlogo.png',
    stars: 34471,
    repoUrl: 'https://github.com/stanfordnlp/dspy/pulls?q=is%3Apr+author%3Aadityasingh2400+is%3Amerged',
    position: { x: 762.5, y: 196.9 }, // Angle -60 (120 degrees apart)
    logoClassName: 'h-[9rem] w-[9rem] sm:h-[11.7rem] sm:w-[11.7rem] md:h-[13.2rem] md:w-[13.2rem]',
    color: 'text-red-600',
    textColor: 'text-[var(--foreground)] hover:text-red-500',
    align: 'right',
    layoutClasses: 'top-[15%] right-[5vw]',
    prs: [
      { title: 'feat: add verify parameter to Image for SSL bypass', url: 'https://github.com/stanfordnlp/dspy/pull/9279', date: 'Feb 9, 2026' },
      { title: 'fix(predict): remove code corruption in ProgramOfThought._parse_code', url: 'https://github.com/stanfordnlp/dspy/pull/9276', date: 'Feb 8, 2026' }
    ]
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 17098,
    repoUrl: 'https://github.com/pydantic/pydantic-ai/pulls?q=is%3Apr+author%3Aadityasingh2400+is%3Amerged',
    position: { x: 762.5, y: 803.1 }, // Angle 60 (120 degrees apart)
    logoClassName: 'h-[8.25rem] w-[8.25rem] sm:h-[10.5rem] sm:w-[10.5rem] md:h-[12rem] md:w-[12rem]',
    color: 'text-pink-600',
    textColor: 'text-[var(--foreground)] hover:text-pink-500',
    align: 'right',
    layoutClasses: 'bottom-[10%] right-[5vw]',
    prs: [
      { title: 'fix(openrouter): handle null top-level fields when response is nested in provider field', url: 'https://github.com/pydantic/pydantic-ai/pull/4528', date: 'Mar 31, 2026' },
      { title: 'fix: always pass embedding_types to Cohere embed() to prevent SDK TypeError', url: 'https://github.com/pydantic/pydantic-ai/pull/4524', date: 'Mar 4, 2026' }
    ]
  },
];

const TOTAL_PR_COUNT = contributions.reduce((sum, c) => sum + c.prs.length, 0);

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(count);
}

function AnimatedStarCount({ target, inView }: { target: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span>{formatStars(display)}</span>;
}

function insetLine(from: Point, to: Point, startInset: number, endInset: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  return {
    x1: from.x + ux * startInset,
    y1: from.y + uy * startInset,
    x2: to.x - ux * endInset,
    y2: to.y - uy * endInset,
  };
}

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setHoveredNode(name);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
    }, 300);
  };

  return (
    <section id="open-source" className="relative px-5 py-24 sm:px-8 sm:py-36 min-h-[100vh] flex flex-col justify-center" ref={ref}>

      {/* Massive Uncontained Background Typography */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            key={hoveredNode}
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => handleMouseEnter(hoveredNode)}
            onMouseLeave={handleMouseLeave}
            className={`absolute z-10 flex flex-col pointer-events-auto w-full md:max-w-3xl lg:max-w-5xl ${
              contributions.find((c) => c.name === hoveredNode)?.layoutClasses
            } ${contributions.find((c) => c.name === hoveredNode)?.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
          >
            {(() => {
              const active = contributions.find((c) => c.name === hoveredNode);
              if (!active) return null;
              const isLarge = active.prs.length > MAX_PRS_VISIBLE;
              const visiblePrs = active.prs.slice(0, MAX_PRS_VISIBLE);
              const hiddenCount = active.prs.length - visiblePrs.length;
              const titleSize = isLarge
                ? 'text-sm sm:text-base md:text-xl'
                : 'text-lg sm:text-2xl md:text-4xl';
              const dateSize = isLarge ? 'text-xs md:text-sm' : 'text-sm md:text-lg';
              const listGap = isLarge ? 'gap-3 sm:gap-4' : 'gap-6';
              const blockGap = isLarge ? 'mt-1.5' : 'mt-3';
              return (
                <div className={`relative z-50 flex flex-col w-full ${active.align === 'right' ? 'items-end' : 'items-start'}`}>
                  <h3 className={`text-[4rem] sm:text-[7rem] md:text-[10rem] font-bold leading-[0.8] tracking-tighter opacity-[0.05] ${active.color} mb-6 pointer-events-none whitespace-nowrap`}>
                    {active.prs.length} MERGED<br />PR{active.prs.length !== 1 ? 'S' : ''}
                  </h3>
                  <div className={`flex flex-col ${listGap} w-full ${active.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                    {visiblePrs.map((pr, idx) => (
                      <a
                        key={idx}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative cursor-pointer block transition-transform hover:scale-[1.02]"
                      >
                        <p className={`${titleSize} font-extrabold tracking-tight transition-colors line-clamp-2 ${active.textColor}`}>
                          {pr.title}
                        </p>
                        <div className={`flex items-center gap-3 ${blockGap} opacity-60 group-hover:opacity-100 transition-opacity ${active.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                          <GitPullRequest size={isLarge ? 13 : 16} className={active.color} />
                          <span className={`${dateSize} font-semibold text-[var(--muted)]`}>{pr.date}</span>
                        </div>
                      </a>
                    ))}
                    {hiddenCount > 0 && (
                      <a
                        href={active.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] ${active.align === 'right' ? 'self-end' : 'self-start'}`}
                      >
                        <span>+ {hiddenCount} more on GitHub</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1280px] w-full relative z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2
            className="mx-auto max-w-5xl font-display text-[clamp(2.1rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]"
            style={{ textWrap: 'balance' }}
          >
            Architecting the foundation of modern AI.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] text-[var(--muted)] sm:mt-5 sm:text-lg">
            <span className="font-semibold text-[var(--foreground)]">{TOTAL_PR_COUNT} merged PRs</span> across OpenAI Agents SDK ({contributions[0].prs.length}), DSPy ({contributions[1].prs.length}), and Pydantic AI ({contributions[2].prs.length}). GitHub repo stars below; hover a logo for each merged PR.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-16 w-full" style={{ aspectRatio: '1 / 1' }}>
          {/* SVG lines */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <filter id="oss-connector-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {contributions.map(({ position }, i) => {
                const line = insetLine(HUB, position, HUB_RADIUS, OUTER_RADIUS);

                return (
                  <linearGradient
                    key={`gradient-${i}`}
                    id={`oss-connector-${i}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#111111" stopOpacity="0.58" />
                    <stop offset="52%" stopColor="#4b5563" stopOpacity="0.36" />
                    <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.18" />
                  </linearGradient>
                );
              })}
            </defs>

            {contributions.map(({ position }, i) => {
              const line = insetLine(HUB, position, HUB_RADIUS, OUTER_RADIUS);

              return (
                <g key={i}>
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#111111"
                    strokeWidth="7.5"
                    strokeOpacity="0.09"
                    strokeLinecap="round"
                    filter="url(#oss-connector-glow)"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={`url(#oss-connector-${i})`}
                    strokeWidth="3.3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#ffffff"
                    strokeWidth="1.1"
                    strokeOpacity="0.56"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.15, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.circle
                    r="4"
                    fill="#f4b400"
                    initial={{ cx: line.x1, cy: line.y1, opacity: 0 }}
                    animate={isInView ? {
                      cx: [line.x1, line.x2],
                      cy: [line.y1, line.y2],
                      opacity: [0, 0.85, 0],
                    } : {}}
                    transition={{
                      duration: 2.8,
                      delay: 0.7 + i * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                      repeat: Infinity,
                      repeatDelay: 4.2,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center node */}
          <motion.div
            className="absolute z-10 h-0 w-0"
            style={{
              left: `${(HUB.x / CANVAS.width) * 100}%`,
              top: `${(HUB.y / CANVAS.height) * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute left-0 top-0 flex h-[4.6rem] w-[4.6rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--foreground)] text-white ring-[10px] ring-white/72 shadow-[0_28px_80px_rgba(17,17,17,0.24)] sm:h-[5.2rem] sm:w-[5.2rem] md:h-[5.5rem] md:w-[5.5rem]">
              <GitMerge size={30} strokeWidth={2.2} />
            </div>
          </motion.div>

          {/* Leaf nodes */}
          {contributions.map((c, i) => (
            <motion.div
              key={c.name}
              className="absolute z-10 h-0 w-0"
              style={{
                left: `${(c.position.x / CANVAS.width) * 100}%`,
                top: `${(c.position.y / CANVAS.height) * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute left-0 top-0 flex h-[9rem] w-[9rem] sm:h-[11.7rem] sm:w-[11.7rem] md:h-[13.2rem] md:w-[13.2rem] max-w-none -translate-x-1/2 -translate-y-1/2 items-center justify-center cursor-pointer pointer-events-auto"
                onMouseEnter={() => handleMouseEnter(c.name)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Keep the anchor at the node center so the SVG connector and outer node share the same target. */}
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={250}
                  height={250}
                  unoptimized
                  className={`relative z-10 max-w-none object-contain drop-shadow-[0_10px_24px_rgba(17,17,17,0.14)] ${c.logoClassName}`}
                />
              </div>
              <div className={`absolute left-0 top-0 min-w-max -translate-x-1/2 text-center ${LEAF_LABEL_OFFSET}`}>
                <p className="text-[13px] font-semibold text-[var(--foreground)] sm:text-[16px]">
                  {c.name}
                </p>
                <div className="mt-0.5 flex items-center justify-center gap-1.5">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  <span className="text-[15px] font-bold tabular-nums text-[var(--foreground)] sm:text-[18px]">
                    <AnimatedStarCount target={c.stars} inView={isInView} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
