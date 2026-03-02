'use client';

import { useEffect, useRef } from 'react';
import WebGLFluidEnhanced from 'webgl-fluid-enhanced';

export function FluidBackground() {
  const simRef = useRef<WebGLFluidEnhanced | null>(null);

  useEffect(() => {
    if (simRef.current) return;

    const simulation = new WebGLFluidEnhanced();
    simulation.setConfig({
      simResolution: 256,
      dyeResolution: 1024,
      densityDissipation: 0.97,
      velocityDissipation: 0.98,
      pressure: 0.8,
      pressureIterations: 20,
      curl: 30,
      splatRadius: 0.15,
      splatForce: 6000,
      shading: true,
      colorful: true,
      colorUpdateSpeed: 8,
      backgroundColor: '#000000',
      transparent: false,
      bloom: true,
      bloomIterations: 8,
      bloomResolution: 256,
      bloomIntensity: 0.8,
      bloomThreshold: 0.5,
      bloomSoftKnee: 0.7,
      sunrays: true,
      sunraysResolution: 196,
      sunraysWeight: 0.3,
      hover: true,
      brightness: 0.7,
      colorPalette: ['#22d3ee', '#8b5cf6', '#ec4899', '#6366f1'],
    });
    simulation.start();
    simRef.current = simulation;

    setTimeout(() => simulation.multipleSplats(Math.floor(Math.random() * 3) + 3), 100);

    const canvas = document.body.querySelector<HTMLCanvasElement>(':scope > canvas');

    const forwardMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
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
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
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

    window.addEventListener('mousemove', forwardMove, { passive: true });
    window.addEventListener('mousedown', forwardDown);

    return () => {
      window.removeEventListener('mousemove', forwardMove);
      window.removeEventListener('mousedown', forwardDown);
      simulation.stop();
      canvas?.remove();
      simRef.current = null;
    };
  }, []);

  return null;
}
