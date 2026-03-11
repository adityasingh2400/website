import { cache } from 'react';
import { fetchPinnedRepositories, slugifyProjectName, type GithubRepository } from '@/lib/github';

const GITHUB_OWNER = 'adityasingh2400';

export interface ProjectMetric {
  label: string;
  value: string;
  note: string;
}

export interface ProjectModule {
  title: string;
  narrative: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  repoName: string;
  title: string;
  eyebrow: string;
  category: string;
  summary: string;
  description: string;
  heroStatement: string;
  pullQuote: string;
  accent: string;
  accentSoft: string;
  role: string;
  year: string;
  status: string;
  stack: string[];
  capabilities: string[];
  metrics: ProjectMetric[];
  modules: ProjectModule[];
  githubUrl: string;
  liveUrl?: string;
  paperUrl?: string;
  primaryLanguage?: string;
  updatedAt?: string;
  updatedLabel: string;
  stars: number;
  pinnedIndex: number;
}

interface CuratedProjectOverride {
  title: string;
  eyebrow: string;
  category: string;
  summary: string;
  description: string;
  heroStatement: string;
  pullQuote: string;
  accent: string;
  role: string;
  year: string;
  status: string;
  stack: string[];
  capabilities: string[];
  metrics: ProjectMetric[];
  modules: ProjectModule[];
  liveUrl?: string;
  paperUrl?: string;
}

const curatedProjectOverrides: Record<string, CuratedProjectOverride> = {
  ziri: {
    title: 'Ziri',
    eyebrow: 'Voice OS',
    category: 'Ambient systems / multi-agent orchestration',
    summary:
      'A distributed home voice OS that listens locally, routes hard tasks through agents, and keeps routine commands fast.',
    description:
      'Ziri started as a reaction to the tradeoff most voice products make: either rigid command trees or slow generic LLM wrappers. The system mixes deterministic fast paths for everyday requests with a LangGraph supervisor for multi-step reasoning, all wrapped in an always-on interface designed to feel ambient instead of app-like.',
    heroStatement:
      'Build the kind of voice system that feels instant on common requests and only becomes agentic when the request actually deserves it.',
    pullQuote:
      'The interesting part is not making voice work. It is making voice feel native to a real life workflow without hiding the engineering underneath.',
    accent: '#6d5efc',
    role: 'Creator',
    year: '2026',
    status: 'Always-on build',
    stack: ['Python', 'FastAPI', 'LangGraph', 'AWS Bedrock', 'pgvector', 'Langfuse', 'ElevenLabs'],
    capabilities: [
      'always-on listener',
      'Mac control',
      'smart-home actions',
      'calendar + music tools',
      'semantic memory',
      'observability'
    ],
    metrics: [
      {
        label: 'Complex queries',
        value: 'sub-900ms',
        note: 'time-to-first-byte target for multi-step requests',
      },
      {
        label: 'Deterministic path',
        value: '80%',
        note: 'of commands avoid an LLM entirely',
      },
      {
        label: 'Input surfaces',
        value: '4',
        note: 'mic, Siri shortcut, browser, and REST',
      },
    ],
    modules: [
      {
        title: 'Ambient runtime',
        narrative:
          'The interaction model treats voice as infrastructure, not as a chat UI. Different entry points feed the same intent pipeline so the system stays available whether the user is at the keyboard, in a browser, or entirely hands-free.',
        bullets: [
          'Always-on mic listener plus browser, Siri, and API inputs',
          'Fast paths for timers, media control, and lightweight commands',
          'Distributed services keep audio, routing, and tool execution decoupled',
        ],
      },
      {
        title: 'Supervisor architecture',
        narrative:
          'When a request crosses into reasoning territory, a LangGraph supervisor hands off to specialized workers rather than forcing one giant prompt to do everything.',
        bullets: [
          'Specialized subagents route music, calendar, home, and general tasks',
          'Tool-heavy requests stay inspectable instead of disappearing into a monolith',
          'Designed around low latency, graceful fallbacks, and clean handoffs',
        ],
      },
      {
        title: 'Memory and feedback',
        narrative:
          'The system keeps track of user preferences and measures whether the agent loop is actually behaving well, not just whether it produces text.',
        bullets: [
          'Titan embeddings plus pgvector memory for preference recall',
          'SQL filters combine with vector retrieval for better personalization',
          'Langfuse traces tool correctness, latency, and generation quality',
        ],
      },
    ],
  },
  autoapplier: {
    title: 'Autoapplier',
    eyebrow: 'Job Ops',
    category: 'Resume scoring / browser automation',
    summary:
      'A local job operations stack that ranks opportunities against a resume and can automate application submission when the upside is there.',
    description:
      'Autoapplier combines a decision layer with an execution layer. The dashboard pulls roles, scrapes descriptions, scores fit from zero to one hundred, and tracks what has been touched. The CLI side handles the repetitive ATS submission work so effort can stay focused on the roles that actually matter.',
    heroStatement:
      'The point was never to apply everywhere. The point was to reserve human time for the applications with the highest expected return.',
    pullQuote:
      'Good automation is not about removing judgment. It is about making sure judgment only happens where it has leverage.',
    accent: '#f97316',
    role: 'Creator',
    year: '2026',
    status: 'Local workflow',
    stack: ['Python', 'AWS Bedrock', 'SimplifyJobs', 'resume scoring', 'browser automation'],
    capabilities: [
      'job ingestion',
      'description scraping',
      'fit scoring',
      'local ranking dashboard',
      'application ledger',
      'ATS auto-submit'
    ],
    metrics: [
      {
        label: 'Repo structure',
        value: '2 tools',
        note: 'a dashboard for triage and a CLI for execution',
      },
      {
        label: 'Scoring output',
        value: '0-100',
        note: 'ranked fit score against a resume',
      },
      {
        label: 'State tracking',
        value: '1 click',
        note: 'mark applications and keep the ledger clean',
      },
    ],
    modules: [
      {
        title: 'Opportunity triage',
        narrative:
          'The first layer solves a practical problem: most job listings are not worth a custom application. The dashboard narrows the field before any manual effort is spent.',
        bullets: [
          'Pulls fresh postings from SimplifyJobs',
          'Scrapes job descriptions for full scoring context',
          'Ranks opportunities by fit, age, location, and application state',
        ],
      },
      {
        title: 'Local decision loop',
        narrative:
          'Keeping the system local matters because this is a personal operations tool. It is meant to be fast, inspectable, and easy to override without platform friction.',
        bullets: [
          'Dashboard runs locally at a simple localhost URL',
          'Scored and unscored roles can be processed separately',
          'Applied state stays visible instead of disappearing into spreadsheets',
        ],
      },
      {
        title: 'Execution layer',
        narrative:
          'Once the ranked list exists, the second half removes the repetitive browser work that turns a good lead into a time sink.',
        bullets: [
          'CLI bot handles repetitive ATS submission flows',
          'Keeps human review focused on exceptions, not every form field',
          'Pairs naturally with resume-aware scoring instead of blind automation',
        ],
      },
    ],
  },
  recursor: {
    title: 'Recursor',
    eyebrow: 'Desktop Utility',
    category: 'Agent workflow ergonomics',
    summary:
      'A tiny Rust utility that protects focus by bouncing you back to your prior window while Cursor agents work in the background.',
    description:
      'Recursor is built around one high-leverage annoyance in agentic coding workflows: you should not have to babysit the IDE while the agent is doing its job. It captures context, returns focus to whatever you were doing before, and only brings you back when the work needs you.',
    heroStatement:
      'Make the agent feel like an assistant you can delegate to, not a tab you are trapped inside.',
    pullQuote:
      'The best productivity tools often look almost trivial on the surface because they remove friction that should never have existed.',
    accent: '#0f766e',
    role: 'Creator',
    year: '2026',
    status: 'Shipped utility',
    stack: ['Rust', 'desktop automation', 'shell installer', 'focus management'],
    capabilities: [
      'window focus capture',
      'automatic bounce back',
      'human recall',
      'lightweight install',
      'no-dependency runtime'
    ],
    metrics: [
      {
        label: 'Language',
        value: 'Rust',
        note: 'small footprint and native utility feel',
      },
      {
        label: 'Dependencies',
        value: '0',
        note: 'download and run without a stack of extras',
      },
      {
        label: 'Install flow',
        value: '1 command',
        note: 'or double-click binary distribution',
      },
    ],
    modules: [
      {
        title: 'Bounce-back interaction',
        narrative:
          'The core interaction is intentionally narrow. You switch to Cursor, launch an agent, and the tool returns you to the previous task instead of forcing you to watch the terminal.',
        bullets: [
          'Captures the pre-Cursor application state',
          'Returns focus immediately after the prompt handoff',
          'Pulls attention back only when a human input is required',
        ],
      },
      {
        title: 'Tiny systems footprint',
        narrative:
          'Because the job is so focused, the implementation can stay sharp and low-overhead rather than becoming a heavy desktop suite.',
        bullets: [
          'Native Rust implementation',
          'Simple install path for quick adoption',
          'Designed to be invisible until it matters',
        ],
      },
      {
        title: 'Workflow design',
        narrative:
          'Recursor is really a commentary on how agent tools should behave. It shifts the interface from active monitoring to asynchronous delegation.',
        bullets: [
          'Pairs especially well with long-running agent tasks',
          'Improves the ergonomics of human-in-the-loop review',
          'Turns idle waiting time back into productive time',
        ],
      },
    ],
  },
  formfix: {
    title: 'FormFix',
    eyebrow: 'Sports Vision',
    category: 'Computer vision / movement analysis',
    summary:
      'An AI-powered basketball shot analyzer that tracks body and hand landmarks from video and turns them into actionable mechanics feedback.',
    description:
      'FormFix approaches coaching like a structured vision problem. Video goes in, pose and hand landmarks are extracted, motion phases are segmented, and the output becomes concrete feedback on sequencing, follow-through, and wrist snap rather than generic advice.',
    heroStatement:
      'Translate a messy human movement into a review loop that is specific enough to actually help somebody improve.',
    pullQuote:
      'The fun part is not detecting joints. It is converting raw motion into feedback that sounds like coaching instead of computer vision.',
    accent: '#ec4899',
    role: 'Creator',
    year: '2026',
    status: 'Vision prototype',
    stack: ['Python', 'MediaPipe', 'video analysis', 'pose tracking', 'mechanics feedback'],
    capabilities: [
      'pose + hand tracking',
      'phase segmentation',
      'wrist snap detection',
      'multi-angle analysis',
      'overlay video output'
    ],
    metrics: [
      {
        label: 'Tracked points',
        value: '75',
        note: '33 body landmarks plus 21 hand landmarks per side',
      },
      {
        label: 'Shot phases',
        value: '5',
        note: 'load through follow-through segmentation',
      },
      {
        label: 'Camera setup',
        value: 'multi-angle',
        note: 'front, side, or diagonal videos are supported',
      },
    ],
    modules: [
      {
        title: 'Movement pipeline',
        narrative:
          'The system begins by turning consumer video into structured motion data. Body landmarks and hand landmarks create a frame-by-frame representation of the shot.',
        bullets: [
          'MediaPipe Holistic extracts full-body and hand landmarks',
          'Tracking works across multiple viewing angles',
          'Skeleton overlays help verify the model visually',
        ],
      },
      {
        title: 'Phase-aware feedback',
        narrative:
          'Instead of analyzing the clip as one blur, the system segments the shot into discrete phases so each part of the motion can be judged in context.',
        bullets: [
          'Load, set, rise, release, and follow-through are detected automatically',
          'Wrist flexion and velocity become measurable flick signals',
          'Issues like shallow bend or short follow-through become explicit',
        ],
      },
      {
        title: 'Coaching output',
        narrative:
          'The value is in the translation layer: turning kinematic signals into guidance that feels useful to a player or coach after a single upload.',
        bullets: [
          'Frame-by-frame review makes the analysis explainable',
          'Feedback is phrased around mechanics, not raw model data',
          'A full-stack workflow keeps analysis and review in one loop',
        ],
      },
    ],
  },
  ivsunsets: {
    title: 'IV Sunsets',
    eyebrow: 'Forecast Product',
    category: 'UI / UX / weather product',
    summary:
      'A UI-heavy sunset app for Isla Vista with live scoring, sky visuals, and an interactive explainer.',
    description:
      'IV Sunsets was mostly a product and interface problem. The goal was to make sunset checking feel fast, visual, and local to Isla Vista instead of like reading a generic weather dashboard.',
    heroStatement:
      'The hard part was turning weather data into something people would actually want to check every afternoon.',
    pullQuote:
      'This one is mostly UI, interaction, and product taste wrapped around a lightweight local model.',
    accent: '#0ea5e9',
    role: 'Creator',
    year: '2026',
    status: 'Live on the web',
    stack: ['Next.js', 'TypeScript', 'Canvas', 'weather data', 'local feedback loop'],
    capabilities: [
      'live weather scoring',
      '6-day forecast',
      'animated sky visuals',
      'interactive simulator',
      'post-sunset calibration'
    ],
    metrics: [
      {
        label: 'Score range',
        value: '0-100',
        note: 'single-number sunset quality index',
      },
      {
        label: 'Forecast window',
        value: '6 days',
        note: 'with daily breakdowns and explanations',
      },
      {
        label: 'Rendering surface',
        value: 'Canvas',
        note: 'animated sky scenes respond to forecast data',
      },
    ],
    modules: [
      {
        title: 'Forecast model',
        narrative:
          'The scoring model stays simple on purpose. It gives the product a clear signal without getting in the way of the experience.',
        bullets: [
          'Real-time forecast inputs feed a single score people can scan instantly',
          'Short explanations show why the number moved up or down',
          'Everything stays lightweight enough to feel like a product, not a dashboard',
        ],
      },
      {
        title: 'Product UI',
        narrative:
          'Most of the work here was in the UI. The layout, motion, and visual hierarchy do as much heavy lifting as the scoring itself.',
        bullets: [
          'The score, outlook, and supporting details are built for quick scanning',
          'Canvas sky scenes give the product a stronger local feel',
          'The experience leans more consumer app than weather tool',
        ],
      },
      {
        title: 'Interactive explainer',
        narrative:
          'The simulator and explainer turn the sunset model into something people can play with instead of just passively read.',
        bullets: [
          'Sliders let people see how haze, clouds, and atmosphere change the score',
          'Scrollytelling explains why certain sunset conditions look better',
          'The whole thing is designed to feel fun before it feels academic',
        ],
      },
    ],
    liveUrl: 'https://iv-sunsets.vercel.app',
  },
  'w-a-v-e': {
    title: 'W.A.V.E',
    eyebrow: 'Climate Policy',
    category: 'Predictive analytics / public-sector storytelling',
    summary:
      'A tract-level workforce vulnerability engine for Santa Barbara County that models how climate shocks can displace workers and slow recovery.',
    description:
      'W.A.V.E turns a policy blind spot into something planners can interrogate. It maps vulnerability across real census tracts, simulates recovery under climate shocks, estimates relief needs, and layers an AI interface on top so people can query the system in plain language.',
    heroStatement:
      'Policy tools become useful when they show who gets hit first, how long recovery takes, and what intervention is actually worth funding.',
    pullQuote:
      'The ambition here was to make a county-scale model feel explorable instead of burying it inside static charts and a PDF nobody reads.',
    accent: '#111111',
    role: 'Builder',
    year: '2026',
    status: 'Datathon build',
    stack: ['predictive modeling', 'tract maps', 'scenario simulation', 'AI policy chat', 'PDF export'],
    capabilities: [
      'risk mapping',
      'shock simulation',
      'recovery curves',
      'industry displacement analysis',
      'policy Q&A'
    ],
    metrics: [
      {
        label: 'Coverage',
        value: '109 tracts',
        note: 'county-wide neighborhood-scale modeling',
      },
      {
        label: 'Workforce lens',
        value: '~220k',
        note: 'workers represented in the county context',
      },
      {
        label: 'Scenario depth',
        value: '12 shocks',
        note: 'simulated climate scenarios feed vulnerability scoring',
      },
    ],
    modules: [
      {
        title: 'County-scale model',
        narrative:
          'The model asks which areas lose workers, how long they take to recover, and how much relief should be staged before a shock lands.',
        bullets: [
          'Tract-level vulnerability scores across Santa Barbara County',
          'Recovery behavior modeled across multiple shock severities',
          'Housing pressure and EJ burden stay visible in the same frame',
        ],
      },
      {
        title: 'Interactive policy surface',
        narrative:
          'Instead of flattening the model into a report, the interface keeps it explorable with maps, curves, and workforce context panels.',
        bullets: [
          'Interactive map with tract profiles and displacement risk',
          'Recovery charts compare burden levels side by side',
          'Workforce panel shows how industries shift after disruption',
        ],
      },
      {
        title: 'Decision support',
        narrative:
          'The project closes the gap between analytics and planning by adding tools that help decision-makers interrogate and export what they are seeing.',
        bullets: [
          'AI policy chatbot answers questions against the full dataset',
          'Emergency relief estimates connect model outputs to action',
          'PDF export captures the current dashboard state for sharing',
        ],
      },
    ],
  },
};

function uniqueValues(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3
    ? normalized
        .split('')
        .map((value) => value + value)
        .join('')
    : normalized;

  const red = parseInt(expanded.slice(0, 2), 16);
  const green = parseInt(expanded.slice(2, 4), 16);
  const blue = parseInt(expanded.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function formatUpdatedLabel(updatedAt?: string): string {
  if (!updatedAt) {
    return 'GitHub synced';
  }

  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return 'GitHub synced';
  }

  return `Updated ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)}`;
}

function buildFallbackProject(repository: GithubRepository, pinnedIndex: number): Project {
  const fallbackSummary =
    repository.description || 'Pinned repository pulled in directly from GitHub.';
  const stack = uniqueValues([repository.language]);

  return {
    slug: repository.slug,
    repoName: repository.name,
    title: repository.name,
    eyebrow: 'Pinned Repo',
    category: 'Live GitHub sync',
    summary: fallbackSummary,
    description: fallbackSummary,
    heroStatement: fallbackSummary,
    pullQuote: 'This project is synced from GitHub, even when the site does not have a custom case study written for it yet.',
    accent: '#111111',
    accentSoft: hexToRgba('#111111', 0.12),
    role: 'Builder',
    year: repository.updatedAt.slice(0, 4) || '2026',
    status: 'GitHub synced',
    stack,
    capabilities: stack.length > 0 ? stack : ['live metadata'],
    metrics: [
      {
        label: 'Source',
        value: 'GitHub',
        note: 'metadata pulled from the public repository',
      },
      {
        label: 'Primary language',
        value: repository.language ?? 'N/A',
        note: 'reported directly by GitHub',
      },
      {
        label: 'Last activity',
        value: formatUpdatedLabel(repository.updatedAt).replace('Updated ', ''),
        note: 'repository timestamp from GitHub',
      },
    ],
    modules: [
      {
        title: 'Live metadata',
        narrative:
          'This entry is available because the site mirrors the current pinned repositories directly from GitHub. It will stay visible even before a full custom case study exists.',
        bullets: [
          `Repository: ${repository.name}`,
          formatUpdatedLabel(repository.updatedAt),
          repository.description || 'No repository description provided yet.',
        ],
      },
    ],
    githubUrl: repository.url,
    liveUrl: repository.homepageUrl,
    primaryLanguage: repository.language,
    updatedAt: repository.updatedAt,
    updatedLabel: formatUpdatedLabel(repository.updatedAt),
    stars: repository.stars,
    pinnedIndex,
  };
}

function mergeProject(repository: GithubRepository, pinnedIndex: number): Project {
  const override = curatedProjectOverrides[slugifyProjectName(repository.name)];

  if (!override) {
    return buildFallbackProject(repository, pinnedIndex);
  }

  return {
    slug: repository.slug,
    repoName: repository.name,
    title: override.title,
    eyebrow: override.eyebrow,
    category: override.category,
    summary: override.summary,
    description: override.description,
    heroStatement: override.heroStatement,
    pullQuote: override.pullQuote,
    accent: override.accent,
    accentSoft: hexToRgba(override.accent, 0.14),
    role: override.role,
    year: override.year,
    status: override.status,
    stack: uniqueValues([...override.stack, repository.language]),
    capabilities: override.capabilities,
    metrics: override.metrics,
    modules: override.modules,
    githubUrl: repository.url,
    liveUrl: override.liveUrl ?? repository.homepageUrl,
    paperUrl: override.paperUrl,
    primaryLanguage: repository.language,
    updatedAt: repository.updatedAt,
    updatedLabel: formatUpdatedLabel(repository.updatedAt),
    stars: repository.stars,
    pinnedIndex,
  };
}

export const getPinnedProjects = cache(async (): Promise<Project[]> => {
  const repositories = await fetchPinnedRepositories(GITHUB_OWNER);
  return repositories.map((repository, index) => mergeProject(repository, index));
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  const projects = await getPinnedProjects();
  return projects.find((project) => project.slug === slug);
});
