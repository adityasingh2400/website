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
        paused: false,
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
