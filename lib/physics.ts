import { Vector3 } from 'three';

export interface PhysicsBody {
  id: string;
  position: Vector3;
  velocity: Vector3;
  mass: number;
  radius: number;
  isStatic: boolean;
  isCaptured: boolean;
}

export interface GravitationalForce {
  x: number;
  y: number;
  z: number;
}

// Gravitational constant (adjusted for visual effect)
const G = 0.5;

// Calculate gravitational force between two bodies
export function calculateGravitationalForce(
  body: PhysicsBody,
  attractorPosition: Vector3,
  attractorMass: number = 10
): GravitationalForce {
  const dx = attractorPosition.x - body.position.x;
  const dy = attractorPosition.y - body.position.y;
  const dz = attractorPosition.z - body.position.z;
  
  const distanceSquared = dx * dx + dy * dy + dz * dz;
  const distance = Math.sqrt(distanceSquared);
  
  // Prevent division by zero and limit force at close range
  const minDistance = 0.5;
  const effectiveDistance = Math.max(distance, minDistance);
  const effectiveDistanceSquared = effectiveDistance * effectiveDistance;
  
  // F = G * m1 * m2 / r^2
  const forceMagnitude = (G * body.mass * attractorMass) / effectiveDistanceSquared;
  
  // Normalize direction and apply force magnitude
  const forceX = (dx / effectiveDistance) * forceMagnitude;
  const forceY = (dy / effectiveDistance) * forceMagnitude;
  const forceZ = (dz / effectiveDistance) * forceMagnitude;
  
  return { x: forceX, y: forceY, z: forceZ };
}

// Apply force to body and update velocity
export function applyForce(
  body: PhysicsBody,
  force: GravitationalForce,
  deltaTime: number
): void {
  if (body.isStatic) return;
  
  // a = F / m
  const ax = force.x / body.mass;
  const ay = force.y / body.mass;
  const az = force.z / body.mass;
  
  // v = v + a * dt
  body.velocity.x += ax * deltaTime;
  body.velocity.y += ay * deltaTime;
  body.velocity.z += az * deltaTime;
}

// Update body position based on velocity
export function updatePosition(body: PhysicsBody, deltaTime: number): void {
  if (body.isStatic) return;
  
  body.position.x += body.velocity.x * deltaTime;
  body.position.y += body.velocity.y * deltaTime;
  body.position.z += body.velocity.z * deltaTime;
}

// Apply damping to velocity (simulates friction/drag)
export function applyDamping(body: PhysicsBody, damping: number = 0.98): void {
  body.velocity.x *= damping;
  body.velocity.y *= damping;
  body.velocity.z *= damping;
}

// Calculate orbital velocity for stable orbit
export function calculateOrbitalVelocity(
  orbitRadius: number,
  centralMass: number
): number {
  return Math.sqrt((G * centralMass) / orbitRadius);
}

// Apply orbital motion around a point
export function applyOrbitalMotion(
  body: PhysicsBody,
  center: Vector3,
  orbitRadius: number,
  angularVelocity: number,
  time: number
): void {
  const angle = time * angularVelocity;
  body.position.x = center.x + Math.cos(angle) * orbitRadius;
  body.position.y = center.y + Math.sin(angle) * orbitRadius * 0.3; // Elliptical orbit
  body.position.z = center.z + Math.sin(angle) * orbitRadius * 0.5;
}

// Check collision between two bodies
export function checkCollision(body1: PhysicsBody, body2: PhysicsBody): boolean {
  const dx = body2.position.x - body1.position.x;
  const dy = body2.position.y - body1.position.y;
  const dz = body2.position.z - body1.position.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  return distance < body1.radius + body2.radius;
}

// Resolve collision between two bodies (elastic collision)
export function resolveCollision(body1: PhysicsBody, body2: PhysicsBody): void {
  if (body1.isStatic && body2.isStatic) return;
  
  const dx = body2.position.x - body1.position.x;
  const dy = body2.position.y - body1.position.y;
  const dz = body2.position.z - body1.position.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  // Normalize collision vector
  const nx = dx / distance;
  const ny = dy / distance;
  const nz = dz / distance;
  
  // Relative velocity
  const dvx = body1.velocity.x - body2.velocity.x;
  const dvy = body1.velocity.y - body2.velocity.y;
  const dvz = body1.velocity.z - body2.velocity.z;
  
  // Relative velocity along collision normal
  const dvn = dvx * nx + dvy * ny + dvz * nz;
  
  // Don't resolve if velocities are separating
  if (dvn > 0) return;
  
  // Coefficient of restitution (bounciness)
  const restitution = 0.8;
  
  // Calculate impulse scalar
  const impulse = -(1 + restitution) * dvn / (1 / body1.mass + 1 / body2.mass);
  
  // Apply impulse
  if (!body1.isStatic) {
    body1.velocity.x += (impulse / body1.mass) * nx;
    body1.velocity.y += (impulse / body1.mass) * ny;
    body1.velocity.z += (impulse / body1.mass) * nz;
  }
  
  if (!body2.isStatic) {
    body2.velocity.x -= (impulse / body2.mass) * nx;
    body2.velocity.y -= (impulse / body2.mass) * ny;
    body2.velocity.z -= (impulse / body2.mass) * nz;
  }
}

// Keep body within bounds
export function applyBounds(
  body: PhysicsBody,
  bounds: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number },
  bounceFactor: number = 0.5
): void {
  if (body.position.x < bounds.minX) {
    body.position.x = bounds.minX;
    body.velocity.x *= -bounceFactor;
  }
  if (body.position.x > bounds.maxX) {
    body.position.x = bounds.maxX;
    body.velocity.x *= -bounceFactor;
  }
  if (body.position.y < bounds.minY) {
    body.position.y = bounds.minY;
    body.velocity.y *= -bounceFactor;
  }
  if (body.position.y > bounds.maxY) {
    body.position.y = bounds.maxY;
    body.velocity.y *= -bounceFactor;
  }
  if (body.position.z < bounds.minZ) {
    body.position.z = bounds.minZ;
    body.velocity.z *= -bounceFactor;
  }
  if (body.position.z > bounds.maxZ) {
    body.position.z = bounds.maxZ;
    body.velocity.z *= -bounceFactor;
  }
}

// Create a physics body
export function createPhysicsBody(
  id: string,
  x: number,
  y: number,
  z: number,
  mass: number,
  radius: number = 0.5
): PhysicsBody {
  return {
    id,
    position: new Vector3(x, y, z),
    velocity: new Vector3(0, 0, 0),
    mass,
    radius,
    isStatic: false,
    isCaptured: false,
  };
}

// Calculate throw velocity based on mouse movement
export function calculateThrowVelocity(
  startPos: { x: number; y: number },
  endPos: { x: number; y: number },
  deltaTime: number,
  multiplier: number = 0.1
): { x: number; y: number } {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  
  return {
    x: (dx / deltaTime) * multiplier,
    y: (dy / deltaTime) * multiplier,
  };
}
