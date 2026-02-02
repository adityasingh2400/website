export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  // Case study content
  problem: string;
  approach: string;
  solution: string;
  impact: string[];
  // Meta
  technologies: string[];
  year: string;
  role: string;
  // Links
  liveUrl?: string;
  githubUrl?: string;
  // Image
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'project-alpha',
    title: 'Project Alpha',
    description: 'AI-powered application that streamlines workflow automation for teams.',
    problem: 'Teams were spending 40% of their time on repetitive tasks that could be automated. Manual processes led to errors and inconsistent results across departments.',
    approach: 'I conducted user research to identify the most time-consuming workflows, then designed an AI system that could learn from user patterns and automate routine decisions while keeping humans in the loop for edge cases.',
    solution: 'Built a full-stack application with a React frontend and Python backend. Implemented machine learning models for pattern recognition and created an intuitive dashboard for monitoring automated workflows.',
    impact: [
      'Reduced manual task time by 60%',
      'Decreased error rate from 12% to 2%',
      'Adopted by 500+ users within first month',
      'Saved an estimated 2,000 hours per month across teams'
    ],
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    year: '2024',
    role: 'Full Stack Developer',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    slug: 'project-beta',
    title: 'Project Beta',
    description: 'Real-time collaboration platform enabling seamless remote teamwork.',
    problem: 'Remote teams struggled with fragmented communication tools. Context was lost between chat, video, and document collaboration, leading to miscommunication and duplicated work.',
    approach: 'Designed a unified workspace that brings together real-time editing, video conferencing, and persistent chat in one interface. Focused on reducing context-switching and maintaining conversation history alongside work.',
    solution: 'Developed using Next.js with WebSocket connections for real-time sync. Implemented conflict resolution for simultaneous edits and built a notification system that respects user focus time.',
    impact: [
      'Reduced tool-switching by 75%',
      'Improved team response time by 40%',
      'Achieved 99.9% uptime over 6 months',
      'NPS score of 72 from beta users'
    ],
    technologies: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis', 'Docker'],
    year: '2024',
    role: 'Lead Developer',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    slug: 'project-gamma',
    title: 'Project Gamma',
    description: 'Data visualization tool that transforms complex datasets into actionable insights.',
    problem: 'Analysts spent hours creating reports manually. Existing tools were either too complex for non-technical users or too limited for meaningful analysis.',
    approach: 'Created a balance between power and simplicity. Designed an interface that guides users through data exploration while allowing advanced users to write custom queries.',
    solution: 'Built with D3.js for visualizations and a Node.js backend for data processing. Implemented smart defaults that produce useful charts immediately while exposing customization options progressively.',
    impact: [
      'Cut report generation time from 4 hours to 15 minutes',
      'Enabled non-technical users to create their own reports',
      'Processed 10M+ data points with sub-second response',
      'Adopted by 3 enterprise clients'
    ],
    technologies: ['D3.js', 'Node.js', 'MongoDB', 'Express', 'AWS Lambda'],
    year: '2023',
    role: 'Frontend Developer',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '4',
    slug: 'project-delta',
    title: 'Project Delta',
    description: 'Mobile-first fintech solution for personal finance management.',
    problem: 'Young professionals lacked visibility into their spending patterns. Existing banking apps showed transactions but offered no actionable insights or guidance.',
    approach: 'Focused on mobile-first design with quick glanceable insights. Used behavioral psychology principles to encourage better financial habits without being preachy.',
    solution: 'React Native app with secure bank integrations via Plaid. Built ML-powered categorization and personalized recommendations based on spending patterns.',
    impact: [
      'Users saved an average of $340/month',
      '4.8 star rating on App Store',
      '50,000+ downloads in first quarter',
      'Featured in TechCrunch'
    ],
    technologies: ['React Native', 'Node.js', 'Plaid API', 'Firebase', 'Stripe'],
    year: '2023',
    role: 'Mobile Developer',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};
