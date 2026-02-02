'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/ui/Navigation';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { AboutSection } from '@/components/ui/AboutSection';
import { projects, getProjectBySlug } from '@/lib/projects';

// Dynamically import the 3D scene to avoid SSR issues
const GravitationalScene = dynamic(
  () => import('@/components/canvas/GravitationalScene').then((mod) => mod.GravitationalScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <p className="text-gray-400">Loading experience...</p>
        </div>
      </div>
    ),
  }
);

// Contact section component
function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          className="text-purple-400 text-sm uppercase tracking-widest block mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.span>

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's create something{' '}
          <span className="gradient-text">amazing</span> together
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="mailto:hello@example.com"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:scale-105 transition-transform"
            data-magnetic
          >
            Send me an email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all hover:scale-105"
            data-magnetic
          >
            Connect on LinkedIn
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { name: 'GitHub', href: 'https://github.com' },
            { name: 'Twitter', href: 'https://twitter.com' },
            { name: 'Dribbble', href: 'https://dribbble.com' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              data-magnetic
            >
              {social.name}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2" />
    </section>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Portfolio. Built with passion and code.
        </p>
        <p className="text-gray-400 text-sm">
          Designed & Developed with Next.js, Three.js, and Framer Motion
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleProjectSelect = useCallback((slug: string) => {
    setSelectedProject(slug);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleNavigateToProject = useCallback(() => {
    if (selectedProject) {
      router.push(`/projects/${selectedProject}`);
    }
  }, [selectedProject, router]);

  const currentProject = selectedProject ? getProjectBySlug(selectedProject) : null;

  return (
    <>
      <MagneticCursor isHovering={isHovering} />
      <Navigation />

      <main className="relative">
        {/* Hero section with gravitational navigation */}
        <section id="home" className="relative">
          <GravitationalScene onProjectSelect={handleProjectSelect} />

          {/* Hero overlay content */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="gradient-text">Creative</span> Developer
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 max-w-xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Explore my universe of projects. Move your cursor to attract them,
                click to capture and discover.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 pointer-events-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <a
                  href="#about"
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  data-magnetic
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  About Me
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105 transition-transform"
                  data-magnetic
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </div>

          {/* Instructions */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-gray-400 text-sm">
              <span className="text-purple-400">Tip:</span> Your cursor has gravity.
              Pull the project orbs toward you!
            </p>
          </motion.div>
        </section>

        {/* Projects section marker */}
        <div id="projects" className="h-0" />

        {/* About section */}
        <AboutSection />

        {/* Contact section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Project card modal */}
      {currentProject && (
        <ProjectCard
          project={currentProject}
          isOpen={!!selectedProject}
          onClose={handleCloseProject}
          onNavigate={handleNavigateToProject}
        />
      )}
    </>
  );
}
