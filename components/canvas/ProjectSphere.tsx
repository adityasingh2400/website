'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial } from '@react-three/drei/core';
import * as THREE from 'three';
import { Project } from '@/lib/projects';

interface ProjectSphereProps {
  project: Project;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  onCapture: () => void;
  onHover: (hovered: boolean) => void;
  isCaptured: boolean;
  cursorPosition: THREE.Vector3;
  isGravityActive: boolean;
}

export function ProjectSphere({
  project,
  position,
  velocity,
  onCapture,
  onHover,
  isCaptured,
  cursorPosition,
  isGravityActive,
}: ProjectSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const baseRadius = 0.3 + project.mass * 0.08;
  const color = new THREE.Color(project.color);
  const glowColor = new THREE.Color(project.glowColor);

  // Calculate gravitational attraction
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    if (isCaptured) {
      // Orbit around cursor when captured
      const time = state.clock.elapsedTime;
      const orbitRadius = 1.5;
      const orbitSpeed = 2;

      mesh.position.x = cursorPosition.x + Math.cos(time * orbitSpeed) * orbitRadius;
      mesh.position.y = cursorPosition.y + Math.sin(time * orbitSpeed) * orbitRadius * 0.5;
      mesh.position.z = cursorPosition.z + Math.sin(time * orbitSpeed * 0.5) * 0.5;
    } else if (isGravityActive) {
      // Apply gravitational force toward cursor
      const dx = cursorPosition.x - position.x;
      const dy = cursorPosition.y - position.y;
      const dz = cursorPosition.z - position.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const dist = Math.sqrt(distSq);

      if (dist > 0.5 && dist < 8) {
        const G = 0.3;
        const force = (G * project.mass * 10) / distSq;
        const maxForce = 0.5;
        const clampedForce = Math.min(force, maxForce);

        velocity.x += (dx / dist) * clampedForce * delta;
        velocity.y += (dy / dist) * clampedForce * delta;
        velocity.z += (dz / dist) * clampedForce * delta * 0.5;
      }

      // Apply velocity with damping
      const damping = 0.98;
      velocity.multiplyScalar(damping);

      position.add(velocity.clone().multiplyScalar(delta * 60));

      // Keep within bounds
      const bounds = 6;
      if (Math.abs(position.x) > bounds) {
        position.x = Math.sign(position.x) * bounds;
        velocity.x *= -0.5;
      }
      if (Math.abs(position.y) > bounds * 0.6) {
        position.y = Math.sign(position.y) * bounds * 0.6;
        velocity.y *= -0.5;
      }
      if (position.z < -8 || position.z > 2) {
        position.z = THREE.MathUtils.clamp(position.z, -8, 2);
        velocity.z *= -0.5;
      }

      mesh.position.copy(position);
    }

    // Animate glow
    if (glowRef.current) {
      const scale = hovered ? 1.4 : 1.2;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(baseRadius * scale * pulse);
    }

    // Rotate sphere
    mesh.rotation.y += delta * 0.5;
    mesh.rotation.x += delta * 0.2;

    // Update text to face camera
    if (textRef.current) {
      textRef.current.position.copy(mesh.position);
      textRef.current.position.y += baseRadius + 0.3;
      textRef.current.lookAt(state.camera.position);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = 'none';
  };

  return (
    <group>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        position={position}
        onClick={onCapture}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[baseRadius, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.8}
          distort={hovered ? 0.4 : 0.2}
          speed={2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[baseRadius * 1.2, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Project title */}
      <group ref={textRef}>
        <Text
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
        >
          {project.title}
        </Text>
      </group>
    </group>
  );
}
