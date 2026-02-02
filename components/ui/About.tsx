'use client';

import { Section } from './Section';

const skills = [
  // Core
  'TypeScript', 'JavaScript', 'Python', 'SQL',
  // Web + backend
  'Next.js', 'React', 'FastAPI', 'Node.js',
  'PostgreSQL', 'Supabase', 'REST APIs',
  // AI/LLM
  'LLM Pipelines', 'Prompt Engineering',
  // Tools
  'Git', 'AWS'
];

const highlights = [
  { label: '4.0 GPA', detail: 'UCSB CS' },
  { label: 'IEEE Published', detail: 'ML Research' },
  { label: 'MIT URTC', detail: 'Presenter' },
  { label: 'Engineering Lead', detail: 'AI Products' },
];

export function About() {
  return (
    <Section id="about">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <span className="text-accent font-mono text-lg">01.</span>
          About Me
        </h2>

        {/* Highlights strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {highlights.map((item) => (
            <div 
              key={item.label}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <div className="text-lg font-semibold text-accent">{item.label}</div>
              <div className="text-sm text-muted">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
          {/* Text content */}
          <div>
            <div className="space-y-4 text-muted">
              <p>
                I'm Aditya Singh, a CS student at{' '}
                <span className="text-foreground">UC Santa Barbara</span> and an engineering 
                lead working on AI-native products. My focus is building copilots that augment 
                human decision-making—especially in places where spreadsheets and ambiguity 
                create real costs.
              </p>

              <p>
                I've published ML research (IEEE), presented at MIT URTC, and built production 
                full-stack infrastructure across modern web stacks and Python backends. I care 
                a lot about <span className="text-foreground">clarity</span>,{' '}
                <span className="text-foreground">auditability</span>, and{' '}
                <span className="text-foreground">shipping</span>.
              </p>

              <p>
                I like building things that feel inevitable once they exist. That usually means: 
                pick a painful workflow, get close to the edge cases, and design a system that 
                people can trust—even under scrutiny.
              </p>

              <p className="pt-2">
                Technologies I work with:
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

          {/* Now section */}
          <div>
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-accent">⚡</span>
                What I'm doing now
              </h3>
              <ul className="space-y-3 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">▹</span>
                  <span>Building <span className="text-foreground">Ryft</span> and pushing toward real-world adoption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">▹</span>
                  <span>Designing an FTC flywheel shooter for <span className="text-foreground">DECO 2026</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">▹</span>
                  <span>Staying sharp on full-stack + applied LLM tooling</span>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div className="mt-6 text-sm text-muted">
              <span className="text-accent">📍</span> Santa Barbara, CA (UCSB) + Bay Area ties
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
