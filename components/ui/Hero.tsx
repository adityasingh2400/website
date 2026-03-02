'use client';

import { motion } from 'framer-motion';

const name = 'Aditya Singh';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          AI Systems &middot; Full-Stack &middot; Research
        </motion.p>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8"
          style={{
            color: '#ffffff',
            textShadow: '0 2px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
              style={char === ' ' ? { width: '0.3em' } : undefined}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            textShadow: '0 1px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          Building AI/LLM systems and full-stack products
          <br className="hidden sm:block" />
          {' '}that turn messy real-world problems into
          <br className="hidden sm:block" />
          {' '}things people can actually trust.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.35)' }}
          >
            scroll
          </span>
          <div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
