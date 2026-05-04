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

export const DUCK_SCALE_MIN = 0.6;
export const DUCK_SCALE_MAX = 1.4;

export function randomPalette(): DuckPalette {
  return DUCK_PALETTES[Math.floor(Math.random() * DUCK_PALETTES.length)]!;
}

export function randomScale(): number {
  return DUCK_SCALE_MIN + Math.random() * (DUCK_SCALE_MAX - DUCK_SCALE_MIN);
}
