export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  solution: string;
  impact: string[];
  technologies: string[];
  year: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ziri',
    title: 'Ziri',
    description: 'Distributed voice OS with LangGraph supervisor routing across specialized ReAct subagents.',
    problem: 'Voice assistants are either dumb command parsers or slow LLM wrappers. There\'s no middle ground that handles complex multi-step intents quickly while still being smart enough to reason through edge cases.',
    approach: 'Built a hybrid architecture: a deterministic zero-LLM fast path handles 80% of commands instantly, while a LangGraph supervisor routes complex intents across 3 specialized ReAct subagents with 25+ tools.',
    solution: 'Distributed Python/FastAPI voice OS with semantic memory (1536-dim Amazon Titan embeddings + Supabase pgvector with HNSW indexing), SQL similarity search for user preferences, and a Langfuse observability framework tracing generation spans and scoring tool-execution correctness.',
    impact: [
      'Sub-50ms audio latency for cached interactions',
      'Sub-900ms TTFB for complex multi-step voice queries',
      '80% of commands via deterministic zero-LLM fast path',
      'Semantic memory with pgvector HNSW indexing for preference recall'
    ],
    technologies: ['Python', 'FastAPI', 'LangGraph', 'AWS Bedrock', 'PostgreSQL', 'pgvector', 'Langfuse', 'ElevenLabs'],
    year: '2026',
    role: 'Creator',
    featured: true,
  },
  {
    id: '2',
    slug: 'ryft-ai',
    title: 'Ryft AI',
    description: 'Multi-agent commission automation platform — 40 REST endpoints, 3-tier orchestrator, 30k ARR.',
    problem: 'Sales teams waste hours in spreadsheet chaos calculating commissions. Plans are buried in unstructured PDFs, payout logic is opaque, and disputes are constant because no one can trace how a number was derived.',
    approach: 'Designed an autonomous agentic loop using GPT-4o with 12 discrete tools for complex data transformation. Strict 22-field JSON constraint prompting achieves 95% extraction accuracy across unstructured PDF contracts.',
    solution: 'Scalable Python/FastAPI backend spanning 40 REST endpoints for a 3-tier multi-agent orchestrator. Multi-tier context management using pgvector RAG and cross-session memory compaction. AI validation agent cross-checks generated logic against source contracts.',
    impact: [
      'Platform grew to 30k ARR with YC-backed enterprise clients',
      '95% extraction accuracy on unstructured PDF contracts',
      '60-70% reduction in per-session LLM costs via Bedrock prompt caching',
      'Eliminated 350-400 hours of manual QA per quarter'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'GPT-4o', 'AWS Bedrock', 'Next.js', 'TypeScript'],
    year: '2025',
    role: 'Software Engineering Intern',
    featured: true,
  },
  {
    id: '3',
    slug: 'soft-robot-system',
    title: 'Autonomous Soft Robot System',
    description: 'ML-guided controller for flexible surgical robots with MRI-based collision-aware planning.',
    problem: 'Soft surgical robots operating near brain tumors require sub-millimeter precision, but their flexible bodies defy traditional rigid-body kinematics. One wrong move is catastrophic.',
    approach: 'Trained a Bayesian Neural Network on 100k joint configurations to predict 3D tip position. Converted multi-million-voxel MRI data into interactive 3D brain safety maps for collision-aware planning.',
    solution: 'MATLAB-based ML pipeline achieving sub-0.1% max tip error on unseen targets. C++ control stack for 6-DOF robot arm via Arduino with synchronized multi-actuator motion. Interactive 3D brain visualization with tumor highlighting.',
    impact: [
      'Sub-0.1% max tip error on unseen surgical targets',
      '1st place among 230+ participants at ACSEF',
      'Real-time MRI-to-3D safety map conversion',
      'PC-to-Arduino synchronized 6-DOF control'
    ],
    technologies: ['MATLAB', 'Neural Network Toolbox', 'C++', 'Arduino', 'Supervised ML', 'MRI Processing'],
    year: '2022–2023',
    role: 'Lead Researcher',
    featured: true,
  },
  {
    id: '4',
    slug: 'soft-continuum-research',
    title: 'Soft Continuum Robot Research',
    description: 'Published learned forward-kinematics algorithm for soft robots — IEEE, MIT URTC, Cambridge.',
    problem: 'Soft continuum robots have infinite degrees of freedom, making their forward kinematics non-invertible. Traditional analytical models break down for these highly nonlinear systems.',
    approach: 'Formalized a learned forward-kinematics algorithm over 6 months of research at the University of Cambridge, addressing redundancy and non-invertibility through data-driven methods.',
    solution: 'Novel ML-based kinematics controller that learns the complex, nonlinear dynamics of soft robotic systems directly from data rather than relying on analytical models. Validated against traditional approaches.',
    impact: [
      'Published at IEEE',
      'Presented at MIT Undergraduate Research Technology Conference',
      '6-month research collaboration at University of Cambridge',
      'Addressed fundamental redundancy and non-invertibility problems'
    ],
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'MATLAB', 'NumPy', 'Research Methods'],
    year: '2023',
    role: 'Research Collaborator',
    paperUrl: undefined,
    featured: true,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};
