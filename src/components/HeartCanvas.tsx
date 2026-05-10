import { useEffect, useRef } from "react";
import { generateHeartParticles } from "../engine/heartMath";

function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = generateHeartParticles(8000);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      const x = canvas.width / 2 + particle.x;
      const y = canvas.height / 2 + particle.y;

      ctx.beginPath();

      ctx.fillStyle = `rgba(255,45,85,${particle.alpha})`;

      ctx.arc(x, y, particle.size, 0, Math.PI * 2);

      ctx.fill();
    });
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default HeartCanvas;
