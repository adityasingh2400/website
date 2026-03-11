'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setPastHero(currentY > window.innerHeight * 0.45);
      setVisible(currentY < lastScrollY || currentY < 100);
      lastScrollY = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: visible || isOpen ? 0 : -100 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-x-0 top-0 z-50 px-4 py-4"
      >
        <nav
          className={`mx-auto max-w-6xl border transition-all duration-500 ${
            pastHero || isOpen
              ? 'border-[var(--line-strong)] bg-[rgba(243,236,223,0.82)] shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" className="transition-opacity duration-300 hover:opacity-65">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Aditya Singh
              </span>
              <span className="mt-1 block font-display text-[1.1rem] leading-none tracking-[-0.04em] text-[var(--foreground)]">
                UCSB / Ryft AI
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
              >
                Resume
                <ArrowUpRight size={14} />
              </a>
            </div>

            <button
              onClick={() => setIsOpen((open) => !open)}
              className="lg:hidden border border-[var(--line-strong)] p-2 text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed left-4 right-4 top-[88px] z-40 mx-auto max-w-6xl border border-[var(--line-strong)] bg-[rgba(243,236,223,0.95)] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between border border-[var(--line)] bg-[rgba(255,255,255,0.36)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--foreground)]"
                >
                  {item.label}
                  <ArrowUpRight size={15} />
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navItems.length * 0.06 }}
                className="mt-2 inline-flex items-center justify-between border border-[var(--line-strong)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]"
              >
                Resume
                <ArrowUpRight size={15} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
