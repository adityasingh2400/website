'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const courses = [
  'Data Structures & Algorithms',
  'Computer Architecture',
  'Object-Oriented Programming',
  'Problem Solving with C++',
  'Linear Algebra',
  'Differential Equations',
  'Multivariable Calculus',
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 sm:py-32 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-2"
                style={{ color: 'var(--accent)' }}
              >
                Education
              </p>
              <h3 className="text-lg sm:text-xl font-semibold">
                University of California, Santa Barbara
              </h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Bachelor of Science in Computer Science
              </p>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                3.97
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                GPA &middot; Class of 2027
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <span
                key={course}
                className="text-xs px-2.5 py-1 rounded-full transition-colors duration-200 hover:text-[var(--accent)]"
                style={{
                  color: 'var(--muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
