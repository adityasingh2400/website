'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adityasingh2400', icon: Linkedin },
  { label: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative px-4 py-10 sm:px-6 sm:py-14">
      <div className="lab-shell border-t border-[var(--line)] pt-6 sm:pt-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:adityasingh@ucsb.edu"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--muted)] sm:text-xs"
          >
            adityasingh@ucsb.edu
          </a>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              >
                <social.icon size={14} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[rgba(17,17,17,0.4)] sm:mt-8 sm:text-[10px]">
          Designed and built by Aditya Singh
        </p>
      </div>
    </footer>
  );
}
