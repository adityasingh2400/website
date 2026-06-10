'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  delay: number;
}

const GRID = 68; // dots across the diameter
const REPULSE_RADIUS = 52; // px around the cursor that pushes dots away
const SPRING = 0.045;
const FRICTION = 0.86;
const DRIFT_AMPLITUDE = 0.7; // px of idle breathing per dot
const ASSEMBLY_SCATTER = 0.55; // initial scatter distance as a fraction of size

function buildParticles(image: HTMLImageElement, size: number): Particle[] {
  const sampler = document.createElement('canvas');
  sampler.width = GRID;
  sampler.height = GRID;
  const ctx = sampler.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  // object-fit: cover crop into the square sampler
  const scale = Math.max(GRID / image.naturalWidth, GRID / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, (GRID - drawWidth) / 2, (GRID - drawHeight) / 2, drawWidth, drawHeight);

  const { data } = ctx.getImageData(0, 0, GRID, GRID);
  const cell = size / GRID;
  const center = GRID / 2 - 0.5;
  const maxDistance = GRID / 2 - 0.5;
  const particles: Particle[] = [];

  for (let gy = 0; gy < GRID; gy += 1) {
    for (let gx = 0; gx < GRID; gx += 1) {
      const dx = gx - center;
      const dy = gy - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > maxDistance) continue;

      const offset = (gy * GRID + gx) * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      if (data[offset + 3] < 96) continue;

      // pointillism: brighter pixels get slightly larger dots
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      const homeX = (gx + 0.5) * cell;
      const homeY = (gy + 0.5) * cell;
      const scatterAngle = Math.random() * Math.PI * 2;
      const scatterDistance = size * ASSEMBLY_SCATTER * (0.4 + Math.random() * 0.6);

      particles.push({
        homeX,
        homeY,
        x: homeX + Math.cos(scatterAngle) * scatterDistance,
        y: homeY + Math.sin(scatterAngle) * scatterDistance,
        vx: 0,
        vy: 0,
        radius: cell * (0.34 + luminance * 0.24),
        color: `rgb(${r},${g},${b})`,
        phase: Math.random() * Math.PI * 2,
        // dots near the top assemble first, with a little randomness
        delay: (gy / GRID) * 420 + Math.random() * 260,
      });
    }
  }

  return particles;
}

export function PointillismPortrait({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = wrapper.clientWidth;
    const pad = Math.round(size * 0.16); // room for dots pushed past the circle edge
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = (size + pad * 2) * dpr;
    canvas.height = (size + pad * 2) * dpr;
    canvas.style.width = `${size + pad * 2}px`;
    canvas.style.height = `${size + pad * 2}px`;
    canvas.style.top = `${-pad}px`;
    canvas.style.left = `${-pad}px`;
    ctx.scale(dpr, dpr);

    let particles: Particle[] = [];
    let frame = 0;
    let startTime = 0;
    let lastTime = 0;
    let visible = true;
    let hasAssembled = false;
    const pointer = { x: -10000, y: -10000 };

    const loop = (time: number) => {
      if (!startTime) {
        startTime = time;
        lastTime = time;
      }
      const elapsed = hasAssembled ? Infinity : time - startTime;
      if (!hasAssembled && time - startTime > 1400) hasAssembled = true;
      // normalize physics to 60fps so 120Hz displays behave the same
      const step = Math.min(2, Math.max(0.5, (time - lastTime) / 16.67));
      lastTime = time;

      ctx.clearRect(0, 0, size + pad * 2, size + pad * 2);

      for (const particle of particles) {
        if (elapsed < particle.delay) continue;

        const driftX = Math.sin(time * 0.0006 + particle.phase) * DRIFT_AMPLITUDE;
        const driftY = Math.cos(time * 0.0005 + particle.phase * 1.7) * DRIFT_AMPLITUDE;
        const targetX = particle.homeX + driftX;
        const targetY = particle.homeY + driftY;

        const awayX = particle.x - pointer.x;
        const awayY = particle.y - pointer.y;
        const pointerDistance = Math.sqrt(awayX * awayX + awayY * awayY);
        if (pointerDistance < REPULSE_RADIUS && pointerDistance > 0.01) {
          const force = ((REPULSE_RADIUS - pointerDistance) / REPULSE_RADIUS) * 2.6;
          particle.vx += (awayX / pointerDistance) * force * step;
          particle.vy += (awayY / pointerDistance) * force * step;
        }

        particle.vx += (targetX - particle.x) * SPRING * step;
        particle.vy += (targetY - particle.y) * SPRING * step;
        particle.vx *= Math.pow(FRICTION, step);
        particle.vy *= Math.pow(FRICTION, step);
        particle.x += particle.vx * step;
        particle.y += particle.vy * step;

        const alpha = Math.min(1, (elapsed - particle.delay) / 420);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x + pad, particle.y + pad, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame && visible && particles.length) {
        startTime = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const image = new Image();
    image.src = src;
    image.decode().then(() => {
      particles = buildParticles(image, size);
      if (!particles.length) return;
      setActive(true);
      start();
    }).catch(() => {
      // keep the plain photo if decoding or sampling fails
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -10000;
      pointer.y = -10000;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointercancel', onPointerLeave);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
      } else {
        stop();
      }
    });
    observer.observe(wrapper);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointercancel', onPointerLeave);
    };
  }, [src]);

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-full object-cover object-center transition-opacity duration-700"
        style={{ opacity: active ? 0 : 1 }}
      />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute" />
    </div>
  );
}
