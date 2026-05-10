import { useEffect, useRef } from "react";
import {
  generateGlitterParticles,
  generateHeartParticles,
} from "../engine/heartMath";
import type { Particle } from "../types/particle";

function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const heartParticles: Particle[] = generateHeartParticles(3500);
    const glitterParticles: Particle[] = generateGlitterParticles(700);

    let animationId = 0;
    const start = performance.now();

    const render = (time: number) => {
      const elapsed = (time - start) / 1000;

      const scale = 1 + Math.sin(elapsed * 3.5) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // body particles
      ctx.shadowBlur = 0;

      heartParticles.forEach((particle) => {
        const x = canvas.width / 2 + particle.x * scale;
        const y = canvas.height / 2 + particle.y * scale;

        const alpha =
          particle.alpha * (0.7 + 0.3 * Math.cos(elapsed * 2 + particle.phase));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,45,85,${alpha})`;
        ctx.arc(x, y, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // glitter layer
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#ff4d88";

      glitterParticles.forEach((particle) => {
        const x = canvas.width / 2 + particle.x * scale;
        const y = canvas.height / 2 + particle.y * scale;

        const alpha =
          particle.alpha * (0.4 + 0.6 * Math.cos(elapsed * 5 + particle.phase));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,140,180,${alpha})`;
        ctx.arc(x, y, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default HeartCanvas;
