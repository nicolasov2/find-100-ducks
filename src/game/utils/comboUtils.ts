export const COMBO_WINDOW_MS = 5000;
export const COMBO_MULTIPLIERS = [1.0, 1.4, 1.8, 2.0, 2.4, 2.8, 3.0] as const;

export function getComboMultiplier(streak: number): number {
  if (streak <= 0) return 1.0;
  const idx = Math.min(streak, COMBO_MULTIPLIERS.length) - 1;
  return COMBO_MULTIPLIERS[idx] ?? 1.0;
}
