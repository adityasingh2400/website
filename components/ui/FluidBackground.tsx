'use client';

import { useEffect, useRef } from 'react';
import WebGLFluidEnhanced from 'webgl-fluid-enhanced';
import { cn } from '@/lib/utils';

interface FluidBackgroundProps {
  className?: string;
}

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function FluidBackground({ className }: FluidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const simRef = useRef<WebGLFluidEnhanced | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || simRef.current) return;

    const mobile = isTouchDevice();

    const simulation = new WebGLFluidEnhanced(container);
    simulation.setConfig({
      simResolution: mobile ? 64 : 160,
      dyeResolution: mobile ? 512 : 1024,
      densityDissipation: 0.995,
      velocityDissipation: 0.22,
      pressure: 0.8,
      pressureIterations: mobile ? 12 : 24,
      curl: 22,
      splatRadius: mobile ? 0.3 : 0.22,
      splatForce: 6400,
      shading: true,
      colorful: true,
      colorUpdateSpeed: 12,
      backgroundColor: '#eff2ff',
      transparent: false,
      bloom: !mobile,
      bloomIterations: 6,
      bloomResolution: 256,
      bloomIntensity: 0.32,
      bloomThreshold: 0.64,
      bloomSoftKnee: 0.62,
      sunrays: false,
      sunraysResolution: 196,
      sunraysWeight: 0.3,
      hover: true,
      brightness: 0.68,
      colorPalette: ['#6d5efc', '#5da8ff', '#22d3ee', '#ec4899'],
    });
    simulation.start();
    simRef.current = simulation;

    setTimeout(() => simulation.multipleSplats(Math.floor(Math.random() * 5) + 10), 100);
    setTimeout(() => simulation.multipleSplats(Math.floor(Math.random() * 4) + 4), 900);

    const canvas = container.querySelector<HTMLCanvasElement>('canvas');

    const isInsideContainer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const forwardMove = (e: MouseEvent) => {
      if (!canvas || !isInsideContainer(e.clientX, e.clientY)) return;
      const rect = container.getBoundingClientRect();
      const evt = new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: false,
        cancelable: true,
      });
      Object.defineProperty(evt, 'offsetX', { value: e.clientX - rect.left, writable: false });
      Object.defineProperty(evt, 'offsetY', { value: e.clientY - rect.top, writable: false });
      canvas.dispatchEvent(evt);
    };

    const forwardDown = (e: MouseEvent) => {
      if (!canvas || !isInsideContainer(e.clientX, e.clientY)) return;
      const rect = container.getBoundingClientRect();
      const evt = new MouseEvent('mousedown', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: false,
        cancelable: true,
      });
      Object.defineProperty(evt, 'offsetX', { value: e.clientX - rect.left, writable: false });
      Object.defineProperty(evt, 'offsetY', { value: e.clientY - rect.top, writable: false });
      canvas.dispatchEvent(evt);
    };

    const forwardTouch = (e: TouchEvent) => {
      if (!canvas) return;
      const touch = e.touches[0];
      if (!touch || !isInsideContainer(touch.clientX, touch.clientY)) return;
      const rect = container.getBoundingClientRect();
      const evt = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: false,
        cancelable: true,
      });
      Object.defineProperty(evt, 'offsetX', { value: touch.clientX - rect.left, writable: false });
      Object.defineProperty(evt, 'offsetY', { value: touch.clientY - rect.top, writable: false });
      canvas.dispatchEvent(evt);
    };

    window.addEventListener('mousemove', forwardMove, { passive: true });
    window.addEventListener('mousedown', forwardDown);
    window.addEventListener('touchmove', forwardTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', forwardMove);
      window.removeEventListener('mousedown', forwardDown);
      window.removeEventListener('touchmove', forwardTouch);
      simulation.stop();
      container.querySelector('canvas')?.remove();
      simRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('fluid-surface absolute inset-0 overflow-hidden', className)}
    />
  );
}
