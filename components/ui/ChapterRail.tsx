'use client';

import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'top', label: 'Story' },
  { id: 'work', label: 'Builds' },
  { id: 'open-source', label: 'Open source' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'life', label: 'Life' },
];

const GLYPHS = 'abcdefghikmnopqrstuvwxyz·';

function ScrambleLabel({ text, run }: { text: string; run: boolean }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let step = 0;
    const totalSteps = 10;
    intervalRef.current = setInterval(() => {
      step += 1;
      const revealed = Math.floor((step / totalSteps) * text.length);
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || index < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (step >= totalSteps) {
        setDisplay(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 28);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplay(text);
    };
  }, [run, text]);

  return <span aria-hidden>{display}</span>;
}

export function ChapterRail() {
  const [activeId, setActiveId] = useState('top');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2 sm:right-6"
    >
      <ul className="flex flex-col items-end gap-1">
        {chapters.map((chapter) => {
          const isActive = activeId === chapter.id;
          const labelVisible = isActive || hoveredId === chapter.id;
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-label={chapter.label}
                aria-current={isActive ? 'true' : undefined}
                onMouseEnter={() => setHoveredId(chapter.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group flex items-center justify-end gap-2.5 py-1.5 transition-colors duration-300 ${
                  isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <span
                  className={`hidden font-mono text-[9px] uppercase tracking-[0.22em] transition-opacity duration-300 sm:block ${
                    labelVisible ? 'opacity-80' : 'opacity-0'
                  }`}
                >
                  <ScrambleLabel text={chapter.label} run={labelVisible} />
                </span>
                <span
                  aria-hidden
                  className={`block h-px bg-current transition-all duration-300 ${
                    isActive ? 'w-7 sm:w-8' : 'w-3.5 group-hover:w-5'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
