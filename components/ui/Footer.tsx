'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adityasingh2400', icon: Linkedin },
  { name: 'X', href: 'https://x.com/NoeticPraxis', icon: Twitter },
];

export function Footer() {
  return (
    <footer className="py-8 text-center">
      <div className="container">
        {/* Social links - mobile only */}
        <div className="flex justify-center gap-6 mb-6 md:hidden">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label={link.name}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>

        <p className="text-muted text-sm">
          Designed & Built by Aditya Singh
        </p>
        
        <p className="text-muted text-xs mt-2 opacity-60">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
