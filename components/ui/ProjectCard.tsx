'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

export function ProjectCard({ project, isOpen, onClose, onNavigate }: ProjectCardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-2xl glass-card p-8"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: '-50%',
              y: '-50%',
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: '-50%',
              y: '-50%',
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              data-magnetic
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Color accent bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ backgroundColor: project.color }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Content */}
            <div className="space-y-6">
              {/* Title */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: project.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-gray-300 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.longDescription}
              </motion.p>

              {/* Technologies */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={onNavigate}
                  className="flex-1 py-3 px-6 rounded-full font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: project.color,
                    color: 'white',
                  }}
                  data-magnetic
                >
                  View Project
                </button>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
                    data-magnetic
                  >
                    GitHub
                  </a>
                )}
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: project.color }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
