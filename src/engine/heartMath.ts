import type { Particle } from "../types/particle";

export function generateHeartParticles(count = 8000): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;

    const edgeX = 16 * Math.pow(Math.sin(t), 3);
    const edgeY =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    // pull inward
    const scale = Math.random();

    // soft randomness
    const jitterX = (Math.random() - 0.5) * 10;
    const jitterY = (Math.random() - 0.5) * 10;

    particles.push({
      x: edgeX * scale * 18 + jitterX,
      y: -edgeY * scale * 18 + jitterY,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
    });
  }

  return particles;
}
