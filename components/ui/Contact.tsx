'use client';

import { Section } from './Section';
import { Mail } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" className="text-center">
      <div className="container max-w-2xl mx-auto">
        <p className="text-accent font-mono text-sm mb-4">03. What's Next?</p>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Get In Touch
        </h2>

        <p className="text-muted text-lg mb-10 mx-auto max-w-lg">
          If you want to collaborate, chat, or need help building something real—I'm always 
          open to interesting conversations and opportunities.
        </p>

        <a
          href="mailto:adityasingh@ucsb.edu"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-medium rounded-md hover:opacity-90 transition-opacity text-lg"
        >
          <Mail size={20} />
          adityasingh@ucsb.edu
        </a>

        <div className="flex justify-center gap-6 mt-8 text-sm">
          <a 
            href="https://www.linkedin.com/in/adityasingh2400" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://x.com/NoeticPraxis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            X / Twitter
          </a>
          <a 
            href="https://github.com/adityasingh2400" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
