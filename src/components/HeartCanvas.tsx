import { useEffect, useRef } from "react";
import { generateHeartPoints } from "../engine/heartMath";

function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = generateHeartPoints(3000);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff2d55";

    points.forEach((point) => {
      const x = canvas.width / 2 + point.x;
      const y = canvas.height / 2 + point.y;

      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default HeartCanvas;
