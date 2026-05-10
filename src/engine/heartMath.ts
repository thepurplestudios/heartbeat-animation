export type Point = {
  x: number;
  y: number;
};

export function generateHeartPoints(count = 3000): Point[] {
  const points: Point[] = [];

  for (let i = 0; i < count; i++) {
    const t = (Math.PI * 2 * i) / count;

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    points.push({
      x: x * 18,
      y: -y * 18,
    });
  }

  return points;
}
