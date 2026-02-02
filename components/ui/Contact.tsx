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
          I'm currently open to new opportunities and always happy to connect. 
          Whether you have a question, a project idea, or just want to say hi, 
          feel free to reach out!
        </p>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-200 text-lg"
        >
          <Mail size={20} />
          Say Hello
        </a>
      </div>
    </Section>
  );
}
