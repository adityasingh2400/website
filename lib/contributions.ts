export interface MergedPullRequest {
  title: string;
  url: string;
  date: string;
}

export interface Contribution {
  name: string;
  logo: string;
  stars: number;
  repoUrl: string;
  color: string;
  prs: MergedPullRequest[];
}

export const contributions: Contribution[] = [
  {
    name: 'OpenAI Agents SDK',
    logo: '/logos/openai.svg',
    stars: 26364,
    repoUrl: 'https://github.com/openai/openai-agents-python/pulls?q=is%3Apr+author%3Aadityasingh2400+is%3Amerged',
    color: 'text-emerald-500',
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
    color: 'text-red-600',
    prs: [
      { title: 'feat: add verify parameter to Image for SSL bypass', url: 'https://github.com/stanfordnlp/dspy/pull/9279', date: 'Feb 9, 2026' },
      { title: 'fix(predict): remove code corruption in ProgramOfThought._parse_code', url: 'https://github.com/stanfordnlp/dspy/pull/9276', date: 'Feb 8, 2026' },
    ],
  },
  {
    name: 'Pydantic AI',
    logo: '/logos/pydantic.svg',
    stars: 17098,
    repoUrl: 'https://github.com/pydantic/pydantic-ai/pulls?q=is%3Apr+author%3Aadityasingh2400+is%3Amerged',
    color: 'text-pink-600',
    prs: [
      { title: 'fix(openrouter): handle null top-level fields when response is nested in provider field', url: 'https://github.com/pydantic/pydantic-ai/pull/4528', date: 'Mar 31, 2026' },
      { title: 'fix: always pass embedding_types to Cohere embed() to prevent SDK TypeError', url: 'https://github.com/pydantic/pydantic-ai/pull/4524', date: 'Mar 4, 2026' },
    ],
  },
];

export const TOTAL_PR_COUNT = contributions.reduce((sum, repo) => sum + repo.prs.length, 0);

export function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return String(count);
}
