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
  paperUrl?: string;
  // Image
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ryft',
    title: 'Ryft',
    description: 'AI-native commission automation that makes workflows understandable, defensible, and auditable.',
    problem: 'Sales teams spend countless hours in spreadsheet chaos trying to calculate and validate commissions. Commission plans are buried in unstructured documents, payout logic is opaque, and disputes are common because no one can trace how a number was calculated.',
    approach: 'Built an LLM extraction pipeline that parses commission plan documents and converts them into structured, executable payout logic. Focused on auditability from day one—every calculation can be traced back to the source rule.',
    solution: 'Full-stack platform with a Next.js frontend, FastAPI Python backend, and Postgres database. The system ingests commission documents, extracts rules with 90%+ accuracy, and provides tools for teams to validate payouts without manual spreadsheet work. Integrated with Salesforce and HubSpot for real CRM data.',
    impact: [
      '90%+ accuracy on rule extraction from unstructured documents',
      'Auditability-first payout engine—every number is traceable',
      'Eliminated spreadsheet-based commission validation workflows',
      'Led a small engineering team from concept to working product'
    ],
    technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'LLM Pipelines', 'Salesforce API', 'HubSpot API'],
    year: '2025',
    role: 'Engineering Lead',
    featured: true,
  },
  {
    id: '2',
    slug: 'ml-soft-robotics',
    title: 'ML for Soft Robotics',
    description: 'Published research applying machine learning methods to soft robotics problems.',
    problem: 'Soft robots are difficult to model and control using traditional methods because their deformable bodies don\'t follow rigid-body dynamics. This limits their practical applications despite their potential for safe human interaction.',
    approach: 'Collaborated with a Cambridge professor to apply machine learning techniques that can learn the complex, nonlinear dynamics of soft robotic systems directly from data rather than relying on analytical models.',
    solution: 'Developed and validated ML models for soft robotics control and modeling. The research demonstrated improved performance over traditional approaches and contributed new methods to the field.',
    impact: [
      'Published in IEEE',
      'Presented at MIT URTC',
      'Research collaboration with Cambridge professor',
      'Contributed novel ML approaches to soft robotics literature'
    ],
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'NumPy', 'MATLAB', 'Research Methods'],
    year: '2024',
    role: 'Research Collaborator',
    featured: true,
  },
  {
    id: '3',
    slug: 'ftc-robotics',
    title: 'FTC Robotics — Flywheel Shooter',
    description: 'Mechanical and control design for a competitive flywheel shooter system (DECO 2026).',
    problem: 'Competitive robotics requires systems that are not just functional but reliable under match pressure. A flywheel shooter needs to balance power, accuracy, and consistency while fitting within weight and size constraints.',
    approach: 'Systematic evaluation of motor, RPM, and torque tradeoffs. Iterative design process focusing on match reliability over theoretical performance. Testing under realistic conditions to identify failure modes early.',
    solution: 'Designed and built a flywheel shooter system optimized for competitive play. Evaluated multiple motor configurations, tuned control parameters for consistent shot accuracy, and iterated on mechanical design for reliability.',
    impact: [
      'Design and engineering lead for shooter subsystem',
      'Systematic motor/RPM/torque analysis',
      'Built for match reliability, not just peak performance',
      'Competing in DECO 2026 season'
    ],
    technologies: ['CAD', 'Mechanical Design', 'Control Systems', 'Java', 'FTC SDK'],
    year: '2025',
    role: 'Design & Engineering Lead',
    featured: true,
  },
  {
    id: '4',
    slug: 'web-curriculum',
    title: 'Web Development Curriculum',
    description: 'Built HTML/CSS/JavaScript curriculum and learning materials at Big Binary.',
    problem: 'Learning web development is often fragmented—tutorials are scattered, concepts aren\'t connected, and learners struggle to build real skills from disconnected resources.',
    approach: 'Created structured, progressive curriculum that builds concepts systematically. Focused on practical skills and real-world patterns rather than abstract theory.',
    solution: 'Developed comprehensive learning materials covering HTML, CSS, and JavaScript fundamentals. Materials designed for clarity and practical application.',
    impact: [
      'Created structured web development curriculum',
      'Built practical, skills-focused learning materials',
      'Developed product-style documentation skills',
      'Contributed to Big Binary\'s educational resources'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Technical Writing', 'Curriculum Design'],
    year: '2024',
    role: 'Intern',
    featured: false,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};
