'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
];

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-20">
      <div className="container">
        <div className="max-w-3xl">
          {/* Greeting */}
          <p 
            className="text-muted mb-4 animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Hi, my name is
          </p>

          {/* Name */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Aditya Singh.
          </h1>

          {/* Tagline */}
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-muted mb-6 animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            I build things for the web.
          </h2>

          {/* Description */}
          <p 
            className="text-lg text-muted max-w-xl mb-8 animate-fade-in"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            I'm a developer focused on building accessible, user-friendly digital experiences. 
            Currently, I'm working on projects that solve real problems and make technology 
            easier to use.
          </p>

          {/* Social Links */}
          <div 
            className="flex items-center gap-5 animate-fade-in"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon size={22} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div 
            className="mt-12 animate-fade-in"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-200"
            >
              View my work
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
