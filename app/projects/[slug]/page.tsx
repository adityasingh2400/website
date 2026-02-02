'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import { MagneticCursor } from '@/components/ui/MagneticCursor';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const project = getProjectBySlug(params.slug as string);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-purple-400 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Get adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <>
      <MagneticCursor />

      {/* Page transition overlay */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ backgroundColor: project.color, transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      <main className="min-h-screen bg-[#0a0a0f]">
        {/* Hero section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}40, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
              >
                Project
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg
                className="w-6 h-6 text-gray-400"
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
            </motion.div>
          </motion.div>
        </section>

        {/* Project details */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-6">About the Project</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: project.color, color: 'white' }}
                  data-magnetic
                >
                  Visit Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
                  data-magnetic
                >
                  View on GitHub
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Project navigation */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group"
                  data-magnetic
                >
                  <span className="text-sm text-gray-400 block mb-2">
                    Previous Project
                  </span>
                  <span className="text-2xl font-semibold group-hover:text-purple-400 transition-colors">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              <Link
                href="/#projects"
                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
                data-magnetic
              >
                All Projects
              </Link>

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group text-right"
                  data-magnetic
                >
                  <span className="text-sm text-gray-400 block mb-2">
                    Next Project
                  </span>
                  <span className="text-2xl font-semibold group-hover:text-cyan-400 transition-colors">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Back to home */}
        <div className="fixed top-6 left-6 z-40">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            data-magnetic
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
        </div>
      </main>
    </>
  );
}
