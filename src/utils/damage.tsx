export function computeDamage(opts: {
  baseDamage?: number;
  timeLimit: number;
  timeTaken: number;
  isCorrect: boolean;
}) {
  const { baseDamage = 10, timeLimit, timeTaken, isCorrect } = opts;
  if (!isCorrect) return 0;
  // clamp timeTaken to [0, timeLimit]
  const t = Math.max(0, Math.min(timeLimit, timeTaken));
  const speedFactor = 1 + (timeLimit - t) / timeLimit; // 1 .. 2
  return Math.round(baseDamage * speedFactor);
}
