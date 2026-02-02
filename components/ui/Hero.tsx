'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/adityasingh2400', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adityasingh2400', icon: Linkedin },
  { name: 'X', href: 'https://x.com/NoeticPraxis', icon: Twitter },
  { name: 'Email', href: 'mailto:adityasingh@ucsb.edu', icon: Mail },
];

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-20">
      <div className="container">
        <div className="max-w-3xl">
          {/* Greeting */}
          <p 
            className="text-accent font-mono mb-4 animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Hi, I'm
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
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted mb-6 animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            I build AI copilots that make complex workflows understandable, auditable, and fast.
          </h2>

          {/* Description */}
          <p 
            className="text-lg text-muted max-w-xl mb-8 animate-fade-in leading-relaxed"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            I'm a CS student at{' '}
            <span className="text-foreground">UC Santa Barbara</span> and an engineering lead 
            working on AI-native products. I like problems where the hard part isn't code—it's 
            turning messy real-world rules into systems people trust.
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
            className="flex flex-wrap gap-4 mt-12 animate-fade-in"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <a
              href="mailto:adityasingh@ucsb.edu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              <Mail size={18} />
              Email me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-200"
            >
              View projects
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
