/** Color palettes for duck variety — each entry has body + beak colors. */
export interface DuckPalette {
  readonly bodyColor: string;
  readonly beakColor: string;
}

export const DUCK_PALETTES: readonly DuckPalette[] = [
  { bodyColor: '#fbbf24', beakColor: '#f59e0b' },  // classic yellow
  { bodyColor: '#f9fafb', beakColor: '#fb923c' },  // white
  { bodyColor: '#f9a8d4', beakColor: '#ec4899' },  // pink
  { bodyColor: '#67e8f9', beakColor: '#06b6d4' },  // cyan
  { bodyColor: '#86efac', beakColor: '#22c55e' },  // green
  { bodyColor: '#fdba74', beakColor: '#ea580c' },  // orange
  { bodyColor: '#c4b5fd', beakColor: '#8b5cf6' },  // purple
  { bodyColor: '#d4a574', beakColor: '#92400e' },  // brown
];

export const DUCK_SCALE_MIN = 0.35;
export const DUCK_SCALE_MAX = 1.3;

export function randomPalette(): DuckPalette {
  return DUCK_PALETTES[Math.floor(Math.random() * DUCK_PALETTES.length)]!;
}

/**
 * Biased toward smaller ducks:
 * 40% → tiny (0.35–0.55)
 * 35% → small (0.55–0.8)
 * 20% → medium (0.8–1.1)
 * 5%  → large (1.1–1.3)
 */
export function randomScale(): number {
  const r = Math.random();
  if (r < 0.40) return 0.35 + Math.random() * 0.20;
  if (r < 0.75) return 0.55 + Math.random() * 0.25;
  if (r < 0.95) return 0.80 + Math.random() * 0.30;
  return 1.10 + Math.random() * 0.20;
}
