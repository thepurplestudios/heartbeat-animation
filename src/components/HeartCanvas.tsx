import { useEffect, useRef } from "react";
import { generateHeartParticles } from "../engine/heartMath";
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

    const particles: Particle[] = generateHeartParticles(8000);

    let animationId = 0;
    let start = performance.now();

    const render = (time: number) => {
      const elapsed = (time - start) / 1000;

      // heartbeat scale
      const scale = 1 + Math.sin(elapsed * 3) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const x = canvas.width / 2 + particle.x * scale;
        const y = canvas.height / 2 + particle.y * scale;

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,45,85,${particle.alpha})`;

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
