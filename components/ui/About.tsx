'use client';

import { Section } from './Section';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
  'Git', 'REST APIs', 'GraphQL', 'Tailwind CSS'
];

export function About() {
  return (
    <Section id="about">
      <div className="container">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
          {/* Text content */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="text-accent font-mono text-lg">01.</span>
              About Me
            </h2>

            <div className="space-y-4 text-muted">
              <p>
                Hello! I'm Aditya, a developer who enjoys building things that live on the internet. 
                My interest in web development started back when I first tried customizing a website 
                template — turns out hacking together HTML and CSS taught me a lot about how things work!
              </p>

              <p>
                Fast-forward to today, and I've had the privilege of working on a variety of projects, 
                from small business websites to complex web applications. My main focus these days is 
                building accessible, inclusive products and digital experiences.
              </p>

              <p>
                When I'm not at the computer, I'm usually reading, exploring new places, or learning 
                something new. I believe in continuous improvement and always look for ways to grow 
                both personally and professionally.
              </p>

              <p className="pt-2">
                Here are a few technologies I've been working with recently:
              </p>
            </div>

            {/* Skills grid */}
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {skills.map((skill) => (
                <li 
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="text-accent">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Image placeholder */}
          <div className="relative group">
            <div className="relative z-10">
              <div 
                className="aspect-square rounded-lg bg-card-bg border border-card-border overflow-hidden"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
              >
                {/* Placeholder for profile image */}
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <svg 
                    className="w-24 h-24 opacity-30" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Decorative border */}
            <div 
              className="absolute top-4 left-4 w-full h-full rounded-lg border-2 border-accent -z-10 transition-all duration-300 group-hover:top-3 group-hover:left-3"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
