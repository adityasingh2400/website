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

export interface ProjectShowcase {
  kind: 'image' | 'video';
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
  poster?: string;
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
  showcase?: ProjectShowcase;
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
  showcase: ProjectShowcase;
  liveUrl?: string;
  paperUrl?: string;
}

const curatedProjectOverrides: Record<string, CuratedProjectOverride> = {
  ziri: {
    title: 'Ziri',
    eyebrow: 'Voice OS',
    category: 'Ambient systems / multi-agent orchestration',
    summary:
      'An always-on voice OS that keeps common commands on a sub-100ms deterministic path and escalates only real reasoning work to a LangGraph multi-agent stack.',
    description:
      'Ziri is a full voice runtime, not a chat wrapper with a microphone. It runs an always-on wake word listener, streams speech in and audio out, routes requests across music, info, home, and quick-action domains, and backs the whole system with semantic memory, traces, metrics, and graceful fallbacks.',
    heroStatement:
      'This project makes voice feel like infrastructure: instant on routine commands, agentic only when the request is actually hard.',
    pullQuote:
      'Four input surfaces, 200+ zero-LLM routes, 272 tests, and end-to-end traces turn an AI demo into a system you can live with.',
    showcase: {
      kind: 'image',
      src: '/project-shots/ziri-architecture.png',
      alt: 'Ziri architecture diagram captured from the GitHub README.',
      eyebrow: 'README capture',
      caption:
        'The architecture is explicit: always-on mic, Siri, browser, and REST all feed one runtime, then fan out into deterministic routes, domain agents, streaming TTS, memory, and observability.',
    },
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
        label: 'Fast path',
        value: 'sub-100ms',
        note: 'recognized commands bypass the LLM entirely',
      },
      {
        label: 'Direct routes',
        value: '200+',
        note: 'pattern-matched commands land before agent routing',
      },
      {
        label: 'Test suite',
        value: '272',
        note: 'PyTest coverage backs the API, orchestration, and tools',
      },
    ],
    modules: [
      {
        title: 'Ambient runtime',
        narrative:
          'Every entry point feeds the same intent system, so Ziri stays available whether the interaction starts from the mic, the browser, Siri, or a raw API call.',
        bullets: [
          'Always-on wake word detection via openWakeWord on the Mac',
          'ElevenLabs Scribe realtime transcription with faster-whisper fallback',
          'Streaming ElevenLabs TTS, volume ducking, and pre-cached phrases for speed',
        ],
      },
      {
        title: 'Supervisor-worker orchestration',
        narrative:
          'The architecture stays inspectable. A supervisor classifies the request, routes to domain agents, and preserves tool use as a visible system instead of burying everything in one oversized prompt.',
        bullets: [
          'LangGraph flow runs `supervisor -> router -> [music|info|home|quick] -> respond`',
          'MusicAgent, InfoAgent, and HomeAgent use bounded ReAct loops for tool work',
          'Heuristic and legacy fallbacks keep the assistant alive when services fail',
        ],
      },
      {
        title: 'Memory and observability',
        narrative:
          'The jump from prototype to daily-use assistant is whether it remembers context and whether you can see what broke. Ziri does both.',
        bullets: [
          'Amazon Titan embeddings land in pgvector with HNSW search for recall',
          'Hybrid retrieval fuses Elasticsearch keyword matches with vector search via RRF',
          'Langfuse and Prometheus track token use, tool accuracy, TTFB, and routing latency',
        ],
      },
    ],
  },
  autoapplier: {
    title: 'Autoapplier',
    eyebrow: 'Job Ops',
    category: 'Resume scoring / browser automation',
    summary:
      'A local job-ops stack that scores opportunities against a resume, ranks the shortlist, and can auto-submit the ones worth pursuing across major ATS platforms.',
    description:
      'Autoapplier does two jobs that normally waste hours. First, it pulls listings from SimplifyJobs, scrapes full descriptions, and scores fit from 0 to 100 in a local dashboard. Then it runs a headless applier that can fill forms, upload resumes, answer custom questions with an LLM, and optionally submit.',
    heroStatement:
      'The leverage is simple: stop burning serious time on low-probability applications.',
    pullQuote:
      'This is not blind spray-and-pray automation. It is a local decision system that ranks where attention belongs, then removes the repetitive browser work.',
    showcase: {
      kind: 'image',
      src: '/project-shots/autoapplier-ranker.png',
      alt: 'Autoapplier README section showing the dashboard ranker and auto-applier workflow.',
      eyebrow: 'README capture',
      caption:
        'The repo is deliberately split into two levers: a local triage dashboard at `localhost:5050` and a CLI applier that can dry-run or submit across major ATS flows.',
    },
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
        label: 'ATS support',
        value: '4+',
        note: 'Lever, Greenhouse, Ashby, Workday, plus a generic fallback',
      },
      {
        label: 'Fit score',
        value: '0-100',
        note: 'Claude ranks experience match, recency, and location',
      },
      {
        label: 'Review loop',
        value: 'localhost:5050',
        note: 'fresh jobs, filters, and applied tracking stay local',
      },
    ],
    modules: [
      {
        title: 'Triage dashboard',
        narrative:
          'The dashboard exists to kill waste before it starts. Most listings do not deserve a custom application, so the system ranks the field before any human effort is spent.',
        bullets: [
          'Pulls fresh postings from SimplifyJobs',
          'Scrapes job descriptions for full scoring context',
          'Ranks opportunities by fit, age, location, and application state',
        ],
      },
      {
        title: 'Question-answering engine',
        narrative:
          'Once a role survives triage, the system already has the context it needs to fill the ugly parts of the form without turning the workflow into a hosted black box.',
        bullets: [
          'AWS Bedrock Claude generates resume-aware answers for custom prompts',
          'Personal data lives in local `real_memory/` files instead of a hosted service',
          'An answer bank keeps recurring application fields consistent and overrideable',
        ],
      },
      {
        title: 'Execution layer',
        narrative:
          'The CLI applier turns the shortlist into action without forcing manual repetition every time an application lives behind a different ATS.',
        bullets: [
          'Runs headless or headful with dry-run, keep-open, and human-in-loop modes',
          'Uploads resumes, fills fields, and answers custom questions automatically',
          'Can start from a direct URL, a Simplify batch, or the top-scored shortlist',
        ],
      },
    ],
  },
  recursor: {
    title: 'Recursor',
    eyebrow: 'Desktop Utility',
    category: 'Agent workflow ergonomics',
    summary:
      'A Rust utility that kicks you back to your previous task the moment a Cursor agent starts working, then returns you only when approval or review is needed.',
    description:
      'Recursor fixes a bad interaction pattern in agentic coding: humans should not have to sit inside the IDE while the agent is busy. It hooks into Cursor events, captures prior window context, restores focus automatically, and can even pause and resume YouTube while you bounce between work and review.',
    heroStatement:
      'Agent workflows get better when the human can walk away.',
    pullQuote:
      'No dependencies. One-command install. The entire product is reclaiming the dead time between prompt submission and human approval.',
    showcase: {
      kind: 'video',
      src: '/project-shots/recursor-demo-web.mp4',
      poster: '/project-shots/recursor-demo-poster.jpg',
      alt: 'Recursor demo video showing the focus handoff workflow.',
      eyebrow: 'Demo capture',
      caption:
        'The entire behavior is visible in one loop: submit a Cursor prompt, go back to what you were doing, and return only when the agent needs you or finishes.',
    },
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
      {
        label: 'Hook events',
        value: '4',
        note: 'before submit, shell start, shell end, and stop',
      },
    ],
    modules: [
      {
        title: 'Focus handoff',
        narrative:
          'The core loop is brutally simple, and that is why it works: enter Cursor, launch the agent, leave immediately.',
        bullets: [
          'Saves the active non-Cursor window before prompt submission',
          'Restores the previous app as soon as the agent is working',
          'Pulls focus back only when the run needs a human or is done',
        ],
      },
      {
        title: 'Install surface',
        narrative:
          'The utility stays tiny because it does one thing well and refuses to become a heavyweight desktop suite.',
        bullets: [
          'Native Rust binary with no runtime dependencies',
          'One-command installer plus double-click installers for macOS, Windows, and Linux',
          'Manual hook wiring stays transparent if you want to inspect the plumbing',
        ],
      },
      {
        title: 'Workflow polish',
        narrative:
          'Recursor is opinionated about what good human-in-the-loop tooling should feel like. It shifts agent usage from active monitoring to asynchronous delegation.',
        bullets: [
          'Optional Chrome and YouTube auto-pause makes context switching less jarring',
          'Pairs especially well with long-running shell work and approval gates',
          'Turns idle waiting time back into real productive time',
        ],
      },
    ],
  },
  formfix: {
    title: 'FormFix',
    eyebrow: 'Sports Vision',
    category: 'Computer vision / movement analysis',
    summary:
      'A basketball shot analyzer that turns a single video upload into phase-segmented mechanics feedback, keyframes, and annotated overlay footage.',
    description:
      'FormFix treats coaching as a vision pipeline. It extracts body and hand landmarks, segments the shot into load, set, rise, release, and follow-through, compares timing and angles against research baselines, then returns issues a player can actually correct.',
    heroStatement:
      'The point is not to detect joints. The point is to explain exactly why the jumper broke.',
    pullQuote:
      'Upload once, get the shot split into five phases, the wrist flick measured, and the miss translated into coaching language instead of model jargon.',
    showcase: {
      kind: 'image',
      src: '/project-shots/formfix-how-it-works.png',
      alt: 'FormFix README section showing the analysis pipeline and API response.',
      eyebrow: 'README capture',
      caption:
        'The pipeline is concrete: upload a clip, segment the shot into five phases, detect mechanics issues, and return keyframes plus an annotated video payload.',
    },
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
        label: 'Frame sampling',
        value: '15fps',
        note: 'frames are extracted before pose and phase analysis',
      },
    ],
    modules: [
      {
        title: 'Motion extraction',
        narrative:
          'The backend turns ordinary phone video into structured movement data quickly enough to support real feedback.',
        bullets: [
          'MediaPipe Holistic extracts body and hand landmarks frame by frame',
          'Supports front, side, and diagonal camera angles',
          'OpenCV overlay output makes the tracking inspectable instead of opaque',
        ],
      },
      {
        title: 'Phase segmentation',
        narrative:
          'The system does not analyze the jumper as one blur. It breaks the motion into the moments coaches actually care about.',
        bullets: [
          'Load, set, rise, release, and follow-through are detected automatically',
          'Knee angle, wrist height, and wrist velocity drive the segmentation cues',
          'Wrist flexion angle and speed become explicit flick signals',
        ],
      },
      {
        title: 'Feedback surface',
        narrative:
          'The output is designed for correction, not novelty. The project translates raw motion into something a player or coach can act on after one upload.',
        bullets: [
          'Flags issues like shallow knee bend, weak wrist snap, and short follow-through',
          'Returns keyframes, issues, confidence notes, and optional annotated video',
          'Grounds thresholds in biomechanics references instead of arbitrary heuristics',
        ],
      },
    ],
  },
  ivsunsets: {
    title: 'IV Sunsets',
    eyebrow: 'Forecast Product',
    category: 'UI / UX / weather product',
    summary:
      'A consumer weather product that scores Isla Vista sunsets from 0 to 100, explains the call, and renders the forecast as a living sky instead of a dead dashboard.',
    description:
      'IV Sunsets turns local weather data into something people actually want to check before dinner. Live forecast inputs roll into a six-day outlook, animated Canvas scenes, an interactive simulator, and a scrollytelling explainer that teaches why the score moved.',
    heroStatement:
      'This project makes forecasting feel like a ritual instead of homework.',
    pullQuote:
      'The product works because the score is fast, the reasoning is visible, and the visuals feel unmistakably local to Isla Vista.',
    showcase: {
      kind: 'image',
      src: '/project-shots/ivsunsets-live.png',
      alt: 'Live IV Sunsets homepage showing the current sunset score and animated scene.',
      eyebrow: 'Live product capture',
      caption:
        'This is the product doing its job: a single sunset score, a plain-English outlook, and a custom sky scene rendered from live Isla Vista forecast data.',
    },
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
        label: 'Scoring factors',
        value: '9',
        note: 'clouds, rain, humidity, visibility, and texture all move the score',
      },
    ],
    modules: [
      {
        title: 'Scoring model',
        narrative:
          'The scoring logic is simple enough to understand and specific enough to feel trustworthy. It turns weather into a strong call, not a black box.',
        bullets: [
          'Open-Meteo inputs feed a 0-100 score tuned to the sunset window',
          'High clouds, mid clouds, low-cloud penalties, rain, humidity, and visibility all move the result',
          'Fallback forecasts keep the experience usable even when the API is down',
        ],
      },
      {
        title: 'Visual product design',
        narrative:
          'The product wins on interface as much as on logic. The number only matters because the UI makes it legible, local, and memorable.',
        bullets: [
          'Canvas sky scenes respond to the same data that drives the score',
          'Forecast cards, reason chips, and labels make the outlook instantly scannable',
          'The main surface feels like a local consumer app, not a weather console',
        ],
      },
      {
        title: 'Explainer loop',
        narrative:
          'The simulator and post-sunset feedback keep the model from feeling like a magic number. Users can see why the call moves and feed reality back into the product.',
        bullets: [
          'Sliders let people see how haze, clouds, and atmosphere change the score',
          'Scrollytelling explains why certain sunset conditions look better',
          'Post-sunset feedback is stored locally to calibrate future calls',
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
      'A tract-level climate policy platform that shows which Santa Barbara County neighborhoods lose workers first, how recovery diverges, and what intervention costs before the shock is over.',
    description:
      'W.A.V.E combines real county datasets, an ODE labor resilience model, a Markov workforce transition model, and a planner-facing dashboard. The result is a decision tool that maps risk, simulates shocks, estimates relief, and lets policy teams query the data in plain language.',
    heroStatement:
      'Static vulnerability maps tell you who is exposed. W.A.V.E tells you who leaves, how long recovery takes, and what it costs to wait.',
    pullQuote:
      '109 tracts. Twelve shock simulations per tract. Real county data. One interface that turns climate risk into an allocation problem instead of a slide deck.',
    showcase: {
      kind: 'image',
      src: '/project-shots/wave-what-it-does.png',
      alt: 'W.A.V.E README section summarizing the policy dashboard features.',
      eyebrow: 'README capture',
      caption:
        'The dashboard is broader than a map: tract profiles, shock simulation, recovery curves, workforce shifts, a policy chatbot, and PDF export all live in the same planning surface.',
    },
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
        label: 'Simulations',
        value: '12 / tract',
        note: 'four severities across three durations drive the score',
      },
      {
        label: 'Worker data',
        value: '~2,575',
        note: 'full job-history records feed the workforce panel',
      },
    ],
    modules: [
      {
        title: 'Labor resilience engine',
        narrative:
          'The backbone is a real model, not a storytelling layer glued to a map. The math decides how recovery behaves, then the interface makes it explorable.',
        bullets: [
          'A logistic growth ODE models recovery speed, drop depth, and equilibrium retention',
          'Environmental justice burden enters as a friction term that slows recovery',
          'Four shock severities across three durations create 12 simulations per tract',
        ],
      },
      {
        title: 'Workforce movement model',
        narrative:
          'Recovery is not just about how many jobs return. It is about where workers go when coastal sectors crack and housing pressure stays high.',
        bullets: [
          'A Markov chain tracks coastal, inland, unemployed, and transitioning labor states',
          'The workforce panel is grounded in roughly 2,575 real worker records',
          'Housing pressure and coastal exposure stay in the same analytic frame',
        ],
      },
      {
        title: 'Planning surface',
        narrative:
          'The interface keeps the math operational. Maps, curves, chatbot answers, and exports move together so policy teams can actually use the model under pressure.',
        bullets: [
          'Map, recovery curves, economic impact scores, and city views update together',
          'The AI policy chatbot answers tract and scenario questions against the full dataset',
          'PDF export preserves the exact dashboard state for reporting and handoff',
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
    showcase: override.showcase,
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
