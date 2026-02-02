'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei/core';
import * as THREE from 'three';
import { projects } from '@/lib/projects';
import { ProjectSphere } from './ProjectSphere';
import { FluidBackground } from './FluidBackground';
import { ParticleTrails } from './ParticleTrails';

interface ProjectState {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  isCaptured: boolean;
}

function Scene({
  onProjectSelect,
  mousePosition,
}: {
  onProjectSelect: (slug: string) => void;
  mousePosition: { x: number; y: number };
}) {
  const { camera, size } = useThree();
  const [projectStates, setProjectStates] = useState<ProjectState[]>(() =>
    projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      return {
        id: project.id,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius - 3
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        isCaptured: false,
      };
    })
  );

  const [capturedId, setCapturedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const cursorPosition = useRef(new THREE.Vector3(0, 0, 0));

  // Convert mouse position to 3D world coordinates
  useFrame(() => {
    const x = (mousePosition.x - 0.5) * 10;
    const y = (mousePosition.y - 0.5) * -6;
    cursorPosition.current.set(x, y, 0);
  });

  const handleCapture = useCallback((id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      if (capturedId === id) {
        // Already captured, navigate to project
        onProjectSelect(project.slug);
      } else {
        // Capture the project
        setCapturedId(id);
        setProjectStates((prev) =>
          prev.map((state) => ({
            ...state,
            isCaptured: state.id === id,
          }))
        );
      }
    }
  }, [capturedId, onProjectSelect]);

  const handleHover = useCallback((id: string, hovered: boolean) => {
    setHoveredId(hovered ? id : null);
  }, []);

  // Release captured project when clicking elsewhere
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (capturedId && !hoveredId) {
        setCapturedId(null);
        setProjectStates((prev) =>
          prev.map((state) => ({
            ...state,
            isCaptured: false,
          }))
        );
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [capturedId, hoveredId]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 10, -10]} intensity={0.5} color="#ec4899" />

      {/* Fluid background */}
      <FluidBackground mousePosition={mousePosition} />

      {/* Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Project spheres */}
      {projects.map((project) => {
        const state = projectStates.find((s) => s.id === project.id);
        if (!state) return null;

        return (
          <ProjectSphere
            key={project.id}
            project={project}
            position={state.position}
            velocity={state.velocity}
            onCapture={() => handleCapture(project.id)}
            onHover={(hovered) => handleHover(project.id, hovered)}
            isCaptured={state.isCaptured}
            cursorPosition={cursorPosition.current}
            isGravityActive={!capturedId || capturedId === project.id}
          />
        );
      })}

      {/* Particle trails following cursor */}
      <ParticleTrails
        mousePosition={{
          x: cursorPosition.current.x,
          y: cursorPosition.current.y,
          z: cursorPosition.current.z,
        }}
        isActive={true}
      />

      {/* Subtle orbit controls for exploration */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        rotateSpeed={0.3}
      />
    </>
  );
}

interface GravitationalSceneProps {
  onProjectSelect: (slug: string) => void;
}

export function GravitationalScene({ onProjectSelect }: GravitationalSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Scene onProjectSelect={onProjectSelect} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
