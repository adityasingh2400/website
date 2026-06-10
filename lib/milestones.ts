export interface Milestone {
  id: string;
  date: string;
  event: string;
  host: string;
  location: string;
  project: string;
  outcome: string;
  summary: string;
  details: string[];
  accent: string;
  accentSoft: string;
}

export const milestones: Milestone[] = [
  {
    id: 'beachhacks',
    date: 'Mar 21–22, 2026',
    event: 'BeachHacks 9.0 · CSULB',
    host: 'CSU Long Beach ACM',
    location: 'The Pointe, CSULB',
    project: 'ReRoute',
    outcome: '1st overall + Best Sustainability',
    summary:
      'Record a video of your unused stuff, then let AI agents identify items, estimate resale value, pick the best route, and publish listings.',
    details: [
      'Multi-agent valuation and routing across resale, return, trade-in, repair, and bundle paths.',
      'Auto-generated marketplace-ready listings from one narrated capture.',
    ],
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.12)',
  },
  {
    id: 'glitch-ucla',
    date: 'Mar 27–28, 2026',
    event: 'GLITCH@UCLA × Google DeepMind',
    host: 'Glitch at UCLA + Google',
    location: 'Carnesale Commons, UCLA',
    project: 'Gemini multimodal build',
    outcome: '24-hour Gemini hackathon',
    summary:
      'A UCLA build weekend around Gemini video, image, and audio models with Google mentors and engineers in the room.',
    details: [
      'Built in the first Glitch hackathon cohort, focused on fast multimodal prototypes.',
      'Centered on shipping with Gemini and exploring new Google AI surfaces.',
    ],
    accent: '#f43f5e',
    accentSoft: 'rgba(244, 63, 94, 0.11)',
  },
  {
    id: 'diamondhacks',
    date: 'Apr 4–5, 2026',
    event: 'DiamondHacks 2026 · UC San Diego',
    host: 'ACM at UC San Diego',
    location: 'UC San Diego',
    project: 'SwarmSell',
    outcome: 'Best AI/ML Project',
    summary:
      'Film clutter once, then have browser agents swarm across eBay, Facebook Marketplace, Mercari, and Depop to list everything fast.',
    details: [
      'Analyzed frames from a single video to detect items and coordinate parallel marketplace posting.',
      'Designed for sub-two-minute listing workflows across several resale channels.',
    ],
    accent: '#10b981',
    accentSoft: 'rgba(16, 185, 129, 0.12)',
  },
  {
    id: 'cactus-yc',
    date: 'Apr 18–19, 2026',
    event: 'Cactus × Google DeepMind × YC',
    host: 'Cactus + Google DeepMind + Y Combinator',
    location: 'YC HQ, San Francisco',
    project: 'On-device voice agents',
    outcome: 'Built at YC HQ',
    summary:
      'A two-day voice-agents hackathon around on-device Gemma and low-latency Cactus inference, hosted at Y Combinator HQ.',
    details: [
      'Voice-controlled agents that run locally on phones and wearables.',
      'Prize track included a guaranteed YC interview for the winning build.',
    ],
    accent: '#a855f7',
    accentSoft: 'rgba(168, 85, 247, 0.12)',
  },
];

export function isWin(outcome: string) {
  return outcome.includes('Best') || outcome.includes('1st');
}
