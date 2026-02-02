'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Vector3 } from 'three';
import { PhysicsBody, createPhysicsBody } from '@/lib/physics';
import { projects } from '@/lib/projects';

interface PhysicsContextType {
  bodies: PhysicsBody[];
  cursorPosition: Vector3;
  setCursorPosition: (pos: Vector3) => void;
  capturedBody: PhysicsBody | null;
  captureBody: (id: string) => void;
  releaseBody: (throwVelocity?: { x: number; y: number; z: number }) => void;
  isGravityActive: boolean;
  setGravityActive: (active: boolean) => void;
}

const PhysicsContext = createContext<PhysicsContextType | null>(null);

export function usePhysics() {
  const context = useContext(PhysicsContext);
  if (!context) {
    throw new Error('usePhysics must be used within a PhysicsProvider');
  }
  return context;
}

interface PhysicsProviderProps {
  children: ReactNode;
}

// Initialize bodies from projects
const initialBodies: PhysicsBody[] = projects.map((project, index) => {
  const angle = (index / projects.length) * Math.PI * 2;
  const radius = 3 + Math.random() * 2;
  const x = Math.cos(angle) * radius;
  const y = (Math.random() - 0.5) * 2;
  const z = Math.sin(angle) * radius - 2;
  
  return createPhysicsBody(
    project.id,
    x,
    y,
    z,
    project.mass,
    0.5 + project.mass * 0.1
  );
});

export function PhysicsProvider({ children }: PhysicsProviderProps) {
  const [bodies, setBodies] = useState<PhysicsBody[]>(initialBodies);
  const [cursorPosition, setCursorPosition] = useState<Vector3>(new Vector3(0, 0, 5));
  const [capturedBody, setCapturedBody] = useState<PhysicsBody | null>(null);
  const [isGravityActive, setGravityActive] = useState(true);

  const captureBody = useCallback((id: string) => {
    setBodies(prev => {
      const body = prev.find(b => b.id === id);
      if (body) {
        body.isCaptured = true;
        setCapturedBody(body);
      }
      return [...prev];
    });
  }, []);

  const releaseBody = useCallback((throwVelocity?: { x: number; y: number; z: number }) => {
    if (capturedBody) {
      setBodies(prev => {
        const body = prev.find(b => b.id === capturedBody.id);
        if (body) {
          body.isCaptured = false;
          if (throwVelocity) {
            body.velocity.x = throwVelocity.x;
            body.velocity.y = throwVelocity.y;
            body.velocity.z = throwVelocity.z;
          }
        }
        return [...prev];
      });
      setCapturedBody(null);
    }
  }, [capturedBody]);

  return (
    <PhysicsContext.Provider
      value={{
        bodies,
        cursorPosition,
        setCursorPosition,
        capturedBody,
        captureBody,
        releaseBody,
        isGravityActive,
        setGravityActive,
      }}
    >
      {children}
    </PhysicsContext.Provider>
  );
}
