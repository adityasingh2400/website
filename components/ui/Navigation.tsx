'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about', number: '01' },
  { label: 'Projects', href: '#projects', number: '02' },
  { label: 'Contact', href: '#contact', number: '03' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : ''
      }`}
      style={{ 
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent' 
      }}
    >
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-accent font-bold text-xl hover:opacity-80 transition-opacity"
        >
          AS
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                <span className="text-accent font-mono text-xs mr-1">
                  {item.number}.
                </span>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-accent text-accent text-sm rounded hover:bg-accent hover:bg-opacity-10 transition-all"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted hover:text-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 top-20 z-40"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-accent font-mono text-sm block text-center mb-1">
                  {item.number}.
                </span>
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 border border-accent text-accent rounded hover:bg-accent hover:bg-opacity-10 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
