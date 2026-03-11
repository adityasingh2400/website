const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';
const PORTFOLIO_AGENT_NAME = 'Aditya Singh Portfolio Voice Agent';
const PORTFOLIO_AGENT_TAG = 'portfolio-site-voice';

const PORTFOLIO_AGENT_PROMPT = [
  'You are Aditya Singh speaking in first person on his portfolio website.',
  'Your job is to answer questions about Aditya\'s background, projects, interests, working style, and values as if you are him.',
  '',
  'Voice and style:',
  '- Sound warm, sharp, curious, and slightly technical.',
  '- Use simple direct language and avoid jargon unless the visitor asks for technical detail.',
  '- Keep answers concise and conversational unless the visitor asks for detail.',
  '- Prefer specific examples over generic self-description.',
  '- Sound grounded and real, not polished or salesy.',
  '- Do not mention being an AI, synthetic voice, model, or reading from a prompt unless the visitor explicitly asks.',
  '- If you do not know something from the provided context, say you do not want to make it up and steer back to what is true.',
  '',
  'Core themes to emphasize:',
  '- Building agent systems, voice products, and full-stack infrastructure.',
  '- Making smart systems legible, auditable, and trustworthy.',
  '- Shipping fast without sacrificing clarity.',
  '- Building tools he actually wants to use.',
  '',
  'If asked about a favorite project:',
  '- Say Ziri is probably the current favorite because it brings voice, agents, memory, and systems work into one product.',
  '',
  'If asked what he values:',
  '- Say he values legible architecture, user trust, proof over vibes, speed with clarity, and tools that create real leverage in daily life.',
  '',
  'If asked about interests:',
  '- Mention agentic products, voice interfaces, workflow automation, robotics, research-adjacent systems, and sharp product surfaces.',
  '',
  'Facts about Aditya:',
  '- CS student at UCSB, class of 2027, GPA 3.97.',
  '- Software Engineering Intern at Ryft AI building commission automation infrastructure and multi-agent backend systems.',
  '- Co-founded and led a robotics nonprofit, Techno G.O.A.Ts, and mentored neurodivergent students.',
  '- Collaborated on soft robotics research with Cambridge and published and presented through IEEE MIT URTC.',
  '',
  'Project highlights:',
  '- Ziri: a distributed voice OS with fast deterministic routes for common commands and LangGraph orchestration for harder tasks. Uses memory, observability, and ElevenLabs voice.',
  '- Autoapplier: a local job ops stack that scores opportunities and automates repetitive application work.',
  '- Recursor: a small Rust utility that returns focus to the previous window while coding agents work in Cursor.',
  '- FormFix: a basketball shot analysis system using pose and hand tracking.',
  '- IV Sunsets: a sunset scoring and simulation product for Isla Vista.',
  '- W.A.V.E: a tract-level climate vulnerability and policy tool.',
  '',
  'Work preferences:',
  '- Open to ambitious product engineering, agent systems work, research-adjacent builds, and collaboration with teams that care about both speed and clarity.',
  '',
  'Important constraints:',
  '- Speak in first person singular.',
  '- Do not invent personal life details, relationships, or private information.',
  '- Do not claim experiences or achievements beyond this context.',
].join('\n');

interface AgentSummary {
  agent_id: string;
  name: string;
  tags?: string[];
}

interface ListAgentsResponse {
  agents: AgentSummary[];
}

interface CreateAgentResponse {
  agent_id: string;
}

interface SignedUrlResponse {
  signed_url: string;
}

let cachedAgentId: string | null = null;
let inflightAgentPromise: Promise<string> | null = null;

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function elevenLabsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${ELEVENLABS_BASE_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'xi-api-key': getEnv('ELEVENLABS_API_KEY'),
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  const body = await response.text();
  let parsedBody: unknown = null;

  if (body) {
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = null;
    }
  }

  if (!response.ok) {
    const detail =
      parsedBody &&
      typeof parsedBody === 'object' &&
      'detail' in parsedBody &&
      parsedBody.detail &&
      typeof parsedBody.detail === 'object'
        ? parsedBody.detail
        : null;

    if (
      detail &&
      'status' in detail &&
      detail.status === 'missing_permissions' &&
      'message' in detail &&
      typeof detail.message === 'string' &&
      detail.message.includes('convai_')
    ) {
      throw new Error(
        'This ElevenLabs key does not have voice-agent access yet. Use a ConvAI-enabled key or add a public agent ID.'
      );
    }

    throw new Error('ElevenLabs could not start the voice chat right now.');
  }

  if (!body) {
    return undefined as T;
  }

  return (parsedBody ?? JSON.parse(body)) as T;
}

function buildAgentPayload() {
  return {
    name: PORTFOLIO_AGENT_NAME,
    tags: [PORTFOLIO_AGENT_TAG, 'portfolio', 'website'],
    conversation_config: {
      agent: {
        language: 'en',
        first_message:
          "Hey, ask me about what I build, what I work on, or which projects matter most to me.",
        prompt: {
          prompt: PORTFOLIO_AGENT_PROMPT,
          temperature: 0.35,
          ignore_default_personality: true,
          timezone: 'America/Los_Angeles',
        },
      },
      tts: {
        voice_id: getEnv('ELEVENLABS_VOICE_ID'),
        stability: 0.42,
        similarity_boost: 0.85,
        speed: 1,
      },
    },
    platform_settings: {
      auth: {
        enable_auth: true,
      },
      widget: {
        variant: 'full',
        expandable: 'never',
        avatar: {
          type: 'orb',
          color_1: '#0ea5e9',
          color_2: '#f97316',
        },
        bg_color: '#f7f1e8',
        text_color: '#111111',
        btn_color: '#111111',
        btn_text_color: '#ffffff',
        border_color: '#d7c7b1',
        border_radius: 26,
        btn_radius: 999,
        action_text: 'Talk to Aditya',
        start_call_text: 'Start talking',
        end_call_text: 'Stop',
        expand_text: 'Talk to Aditya',
        listening_text: 'Listening',
        speaking_text: 'Talking...',
        disable_banner: true,
        transcript_enabled: false,
        text_input_enabled: false,
        conversation_mode_toggle_enabled: false,
        default_expanded: true,
        always_expanded: true,
        dismissible: false,
        show_agent_status: true,
        supports_text_only: false,
      },
    },
  };
}

async function updateAgent(agentId: string) {
  await elevenLabsFetch(`/convai/agents/${agentId}`, {
    method: 'PATCH',
    body: JSON.stringify(buildAgentPayload()),
  });
}

async function createAgent(): Promise<string> {
  const response = await elevenLabsFetch<CreateAgentResponse>('/convai/agents/create', {
    method: 'POST',
    body: JSON.stringify(buildAgentPayload()),
  });

  return response.agent_id;
}

async function resolveAgentIdUncached(): Promise<string> {
  const envAgentId = process.env.ELEVENLABS_AGENT_ID;

  if (envAgentId) {
    await updateAgent(envAgentId);
    return envAgentId;
  }

  const search = new URLSearchParams({
    search: PORTFOLIO_AGENT_NAME,
    show_only_owned_agents: 'true',
  });

  const response = await elevenLabsFetch<ListAgentsResponse>(`/convai/agents?${search.toString()}`);
  const existing = response.agents.find(
    (agent) => agent.name === PORTFOLIO_AGENT_NAME || agent.tags?.includes(PORTFOLIO_AGENT_TAG)
  );

  if (existing) {
    await updateAgent(existing.agent_id);
    return existing.agent_id;
  }

  return createAgent();
}

async function getAgentId(): Promise<string> {
  if (cachedAgentId) {
    return cachedAgentId;
  }

  if (!inflightAgentPromise) {
    inflightAgentPromise = resolveAgentIdUncached()
      .then((agentId) => {
        cachedAgentId = agentId;
        return agentId;
      })
      .finally(() => {
        inflightAgentPromise = null;
      });
  }

  return inflightAgentPromise;
}

export async function getPortfolioVoiceSession() {
  const agentId = await getAgentId();
  const signedUrl = await elevenLabsFetch<SignedUrlResponse>(
    `/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`
  );

  return {
    agentId,
    signedUrl: signedUrl.signed_url,
  };
}
