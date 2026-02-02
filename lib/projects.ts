export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  color: string;
  glowColor: string;
  mass: number; // Affects gravitational behavior (1-5)
  image?: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'project-alpha',
    title: 'Project Alpha',
    description: 'A revolutionary AI-powered application',
    longDescription: 'This project showcases cutting-edge machine learning algorithms combined with an intuitive user interface. Built with modern technologies and designed for scale.',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    mass: 4,
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '2',
    slug: 'project-beta',
    title: 'Project Beta',
    description: 'Real-time collaboration platform',
    longDescription: 'A sophisticated real-time collaboration tool that enables teams to work together seamlessly. Features include live editing, video conferencing, and smart notifications.',
    technologies: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis'],
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    mass: 3,
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '3',
    slug: 'project-gamma',
    title: 'Project Gamma',
    description: 'Immersive 3D visualization tool',
    longDescription: 'An immersive data visualization platform that transforms complex datasets into interactive 3D experiences. Perfect for exploring patterns and insights.',
    technologies: ['Three.js', 'WebGL', 'D3.js', 'Node.js'],
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    mass: 5,
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: '4',
    slug: 'project-delta',
    title: 'Project Delta',
    description: 'Mobile-first fintech solution',
    longDescription: 'A comprehensive fintech application designed for the modern user. Features secure transactions, portfolio tracking, and AI-driven financial insights.',
    technologies: ['React Native', 'GraphQL', 'Stripe', 'Firebase'],
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    mass: 3,
    link: 'https://example.com',
    github: 'https://github.com',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
