export function heartbeat(time: number) {
  const cycle = time % 1.2;

  const lub = 0.08 * Math.exp(-60 * Math.pow(cycle - 0.12, 2));

  const dub = 0.04 * Math.exp(-90 * Math.pow(cycle - 0.24, 2));

  return 1 + lub + dub;
}
