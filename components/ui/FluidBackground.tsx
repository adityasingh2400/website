'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    WebGLFluidEnhanced: { default: new (container: HTMLElement) => FluidSim };
  }
}

interface FluidSim {
  setConfig: (config: Record<string, unknown>) => void;
  start: () => void;
}

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<FluidSim | null>(null);

  useEffect(() => {
    if (simRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/webgl-fluid-enhanced@0.8.0/dist/index.umd.js';
    script.async = true;
    script.onload = () => {
      if (!containerRef.current || !window.WebGLFluidEnhanced) return;

      const fluidSim = new window.WebGLFluidEnhanced.default(containerRef.current);
      fluidSim.setConfig({
        simResolution: 128,
        dyeResolution: 512,
        densityDissipation: 0.5,
        velocityDissipation: 0.1,
        pressure: 0.1,
        pressureIterations: 20,
        curl: 3,
        splatRadius: 0.1,
        splatForce: 4000,
        shading: true,
        colorful: true,
        colorUpdateSpeed: 10,
        paused: false,
        backgroundColor: '#0a0a0a',
        transparent: false,
        bloom: true,
        bloomIterations: 4,
        bloomResolution: 256,
        bloomIntensity: 0.5,
        bloomThreshold: 0.8,
        bloomSoftKnee: 0.7,
        sunrays: false,
        hover: true,
        brightness: 0.5,
        colorPalette: ['#22d3ee', '#a78bfa', '#f472b6'],
      });
      fluidSim.start();
      simRef.current = fluidSim;
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="fluid-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}
