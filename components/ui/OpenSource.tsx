'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, GitMerge, GitPullRequest, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const RECENT_PER_REPO = 3;

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

export function OpenSource() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="open-source" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24" ref={ref}>
      <div className="mx-auto w-full max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px]">
            Open source
          </p>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,6vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-[var(--foreground)]">
            I help build the tools the field runs on
          </h2>
          <p className="mt-3.5 max-w-[54ch] text-[0.98rem] leading-relaxed text-[var(--muted)] sm:text-[1.08rem]">
            <span className="font-medium text-[var(--foreground)]">{TOTAL_PR_COUNT} merged pull requests</span> into the
            open source libraries behind modern AI agents. OpenAI&apos;s Agents SDK,
            Stanford&apos;s DSPy, Pydantic AI.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-3 sm:gap-4 lg:grid-cols-3">
          {contributions.map((repo, i) => {
            const recent = repo.prs.slice(0, RECENT_PER_REPO);
            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className="flex flex-col rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-5 transition-colors duration-300 hover:border-[var(--line-strong)] sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center">
                    <Image
                      src={repo.logo}
                      alt={repo.name}
                      width={44}
                      height={44}
                      unoptimized
                      className="max-h-11 w-auto object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[0.95rem] font-semibold text-[var(--foreground)]">{repo.name}</p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-[0.82rem] font-semibold tabular-nums text-[var(--foreground)]">
                        <AnimatedStarCount target={repo.stars} inView={isInView} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <GitMerge size={15} className={repo.color} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--foreground)]">
                    {repo.prs.length} merged
                  </span>
                </div>

                <ul className="mt-3 flex flex-1 flex-col gap-3 border-t border-[var(--line)] pt-3.5">
                  {recent.map((pr) => (
                    <li key={pr.url}>
                      <a href={pr.url} target="_blank" rel="noopener noreferrer" className="group flex gap-2">
                        <GitPullRequest size={13} className={`mt-0.5 flex-shrink-0 opacity-70 ${repo.color}`} aria-hidden />
                        <span className="min-w-0">
                          <span className="line-clamp-2 block text-[0.82rem] leading-snug text-[var(--muted-strong)] transition-colors duration-200 group-hover:text-[var(--foreground)]">
                            {pr.title}
                          </span>
                          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--muted)]">
                            {pr.date}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                >
                  {repo.prs.length > recent.length ? `All ${repo.prs.length} on GitHub` : 'View on GitHub'}
                  <ArrowUpRight size={13} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

