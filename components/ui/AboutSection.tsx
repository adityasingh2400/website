'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { createNoise3D } from 'simplex-noise';

// Flow field canvas component
function FlowFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const noise3D = createNoise3D();
    let particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 500;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: 0,
        vy: 0,
        life: Math.random(),
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const scale = 0.005;
      time += 0.003;

      particles.forEach((particle) => {
        // Get flow field angle from noise
        const angle = noise3D(particle.x * scale, particle.y * scale, time) * Math.PI * 2;

        // Update velocity
        particle.vx += Math.cos(angle) * 0.2;
        particle.vy += Math.sin(angle) * 0.2;

        // Apply friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Update life
        particle.life -= 0.001;
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
          particle.life = 1;
        }

        // Draw particle
        const hue = (particle.x / canvas.offsetWidth) * 60 + 260; // Purple to cyan
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${particle.life * 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
}

// Animated text reveal component
function AnimatedText({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = children.split(' ');

  return (
    <span ref={ref} className="inline">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Skill tag component
function SkillTag({ skill, index }: { skill: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-default"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      {skill}
    </motion.span>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
    'Three.js', 'WebGL', 'TailwindCSS', 'PostgreSQL', 'AWS',
    'Docker', 'GraphQL', 'Figma', 'Git', 'CI/CD',
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Flow field background */}
      <FlowFieldCanvas />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        style={{ y, opacity }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-purple-400 text-sm uppercase tracking-widest">
                About Me
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <AnimatedText>
                I build digital experiences that push boundaries
              </AnimatedText>
            </h2>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                <AnimatedText delay={0.3}>
                  I'm a developer and designer passionate about creating innovative web experiences. I specialize in combining cutting-edge technologies with thoughtful design to build products that stand out.
                </AnimatedText>
              </p>
              <p>
                <AnimatedText delay={0.5}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source, or experimenting with creative coding and generative art.
                </AnimatedText>
              </p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:scale-105 transition-transform"
                data-magnetic
              >
                Get in touch
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right column - Skills */}
          <div className="space-y-8">
            <motion.h3
              className="text-2xl font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Skills & Technologies
            </motion.h3>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <SkillTag key={skill} skill={skill} index={index} />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '20+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
    </section>
  );
}
