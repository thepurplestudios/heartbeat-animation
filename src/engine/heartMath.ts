import type { Particle } from "../types/particle";

export function generateHeartParticles(count = 7000): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;

    const edgeX = 16 * Math.pow(Math.sin(t), 3);

    const edgeY =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const scale = Math.pow(Math.random(), 0.7);

    const spread = (1 - scale) * 18;

    const x = edgeX * scale * 18 + (Math.random() - 0.5) * spread;

    const y = -edgeY * scale * 18 + (Math.random() - 0.5) * spread;

    particles.push({
      x,
      y,
      originX: x,
      originY: y,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      glow: false,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    });
  }

  return particles;
}

export function generateGlitterParticles(count = 1800): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const t = Math.random() * Math.PI * 2;

    const edgeX = 16 * Math.pow(Math.sin(t), 3);

    const edgeY =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const scale = Math.random() * 1.25;

    const x = edgeX * scale * 18 + (Math.random() - 0.5) * 20;

    const y = -edgeY * scale * 18 + (Math.random() - 0.5) * 20;

    particles.push({
      x,
      y,
      originX: x,
      originY: y,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      glow: true,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    });
  }

  return particles;
}

export function generateDustParticles(count = 300): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * window.innerWidth;

    const y = (Math.random() - 0.5) * window.innerHeight;

    particles.push({
      x,
      y,
      originX: x,
      originY: y,
      size: Math.random() * 0.6 + 0.08,
      alpha: Math.random() * 0.045,
      phase: Math.random() * Math.PI * 2,
      glow: true,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    });
  }

  return particles;
}
