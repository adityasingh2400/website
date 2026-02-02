'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleTrailsProps {
  mousePosition: { x: number; y: number; z: number };
  isActive: boolean;
}

export function ParticleTrails({ mousePosition, isActive }: ParticleTrailsProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const trailRef = useRef<{ x: number; y: number; z: number; age: number }[]>([]);
  const lastMouseRef = useRef({ x: 0, y: 0, z: 0 });

  const particleCount = 200;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Purple to cyan gradient
      const t = i / particleCount;
      colors[i * 3] = 0.55 + t * 0.02; // R
      colors[i * 3 + 1] = 0.36 - t * 0.1; // G
      colors[i * 3 + 2] = 0.96 - t * 0.13; // B

      sizes[i] = Math.random() * 0.05 + 0.02;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current || !isActive) return;

    const geometry = particlesRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const sizeAttribute = geometry.getAttribute('size') as THREE.BufferAttribute;

    // Add new trail point if mouse moved
    const dx = mousePosition.x - lastMouseRef.current.x;
    const dy = mousePosition.y - lastMouseRef.current.y;
    const dz = mousePosition.z - lastMouseRef.current.z;
    const moved = Math.sqrt(dx * dx + dy * dy + dz * dz) > 0.01;

    if (moved) {
      trailRef.current.unshift({
        x: mousePosition.x,
        y: mousePosition.y,
        z: mousePosition.z,
        age: 0,
      });

      // Limit trail length
      if (trailRef.current.length > particleCount) {
        trailRef.current.pop();
      }

      lastMouseRef.current = { ...mousePosition };
    }

    // Update particle positions along trail
    for (let i = 0; i < particleCount; i++) {
      if (i < trailRef.current.length) {
        const point = trailRef.current[i];
        point.age += delta;

        // Add some noise/drift to particles
        const noise = Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.02;

        positionAttribute.setXYZ(
          i,
          point.x + noise,
          point.y + Math.cos(state.clock.elapsedTime * 3 + i * 0.1) * 0.02,
          point.z
        );

        // Fade out based on age
        const fade = Math.max(0, 1 - point.age * 0.5);
        sizeAttribute.setX(i, sizes[i] * fade);
      } else {
        // Hide unused particles
        positionAttribute.setXYZ(i, 0, 0, -100);
        sizeAttribute.setX(i, 0);
      }
    }

    positionAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
