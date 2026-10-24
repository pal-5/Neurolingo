export type Rating = 'again' | 'hard' | 'good' | 'easy';

export interface FsrsResult {
  nextReviewDays: number;
  newStability: number;
  newDifficulty: number;
  retrievability: number;
  label: string;
}

/**
 * Modern FSRS-inspired Memory Stability calculation
 * S: Stability (days until R drops to 90%)
 * D: Difficulty (1 = easiest, 10 = hardest)
 */
export function calculateFsrsInterval(
  currentStability: number,
  currentDifficulty: number,
  rating: Rating,
  reps: number
): FsrsResult {
  let newStability = currentStability;
  let newDifficulty = currentDifficulty;
  let nextReviewDays = 1;
  let label = '1 day';

  switch (rating) {
    case 'again': {
      // Memory lapse: collapse stability to near 0, slightly increase difficulty
      newStability = Math.max(0.4, currentStability * 0.2);
      newDifficulty = Math.min(10, currentDifficulty + 0.6);
      nextReviewDays = 0.05; // ~10 minutes
      label = '<10m';
      break;
    }
    case 'hard': {
      // Hard recall: small growth in stability, difficulty rises
      newStability = currentStability * 1.25;
      newDifficulty = Math.min(10, currentDifficulty + 0.3);
      nextReviewDays = Math.max(1, Math.round(newStability * 0.7));
      label = `${nextReviewDays}d`;
      break;
    }
    case 'good': {
      // Target recall: standard multiplier based on difficulty
      const growthFactor = Math.max(1.5, 2.5 - (currentDifficulty * 0.12));
      newStability = currentStability * growthFactor;
      nextReviewDays = Math.max(1, Math.round(newStability));
      label = `${nextReviewDays}d`;
      break;
    }
    case 'easy': {
      // Effortless recall: rapid leap in stability, difficulty decreases
      const growthFactor = Math.max(2.2, 3.2 - (currentDifficulty * 0.1));
      newStability = currentStability * growthFactor * 1.3;
      newDifficulty = Math.max(1, currentDifficulty - 0.5);
      nextReviewDays = Math.max(3, Math.round(newStability * 1.3));
      label = `${nextReviewDays}d`;
      break;
    }
  }

  // Calculate predicted retrievability at next review point (approx 90% target)
  const retrievability = Math.round(calculateRetrievability(newStability, nextReviewDays) * 100);

  return {
    nextReviewDays,
    newStability: parseFloat(newStability.toFixed(2)),
    newDifficulty: parseFloat(newDifficulty.toFixed(2)),
    retrievability,
    label,
  };
}

/**
 * Ebbinghaus / FSRS power forgetting curve:
 * R(t) = (1 + factor * t / S)^(-decay)
 */
export function calculateRetrievability(stabilityDays: number, elapsedDays: number): number {
  if (elapsedDays <= 0) return 1.0;
  if (stabilityDays <= 0) return 0.1;
  const decayFactor = 0.5;
  const factor = 19 / 81; // standard FSRS factor for 90% retention calibration
  const r = Math.pow(1 + factor * (elapsedDays / stabilityDays), -decayFactor);
  return Math.min(1.0, Math.max(0.05, r));
}

/**
 * Predict future forgetting curve data points for a word
 */
export function getWordDecayCurve(stabilityDays: number) {
  const intervals = [0, 1, 2, 3, 5, 7, 14, 21, 30];
  return intervals.map(day => ({
    day,
    retrievability: Math.round(calculateRetrievability(stabilityDays, day) * 100),
  }));
}
