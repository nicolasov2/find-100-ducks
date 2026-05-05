/** Color palettes for gnome variety — each entry has body + hat colors. */
export interface GnomePalette {
  readonly bodyColor: string;
  readonly hatColor: string;
}

export type BeardStyle = 'normal' | 'long' | 'none';

export const GNOME_PALETTES: readonly GnomePalette[] = [
  { bodyColor: '#dc2626', hatColor: '#dc2626' }, // classic red
  { bodyColor: '#1d4ed8', hatColor: '#dc2626' }, // blue body, red hat
  { bodyColor: '#059669', hatColor: '#dc2626' }, // green body, red hat
  { bodyColor: '#92400e', hatColor: '#dc2626' }, // brown body, red hat
  { bodyColor: '#a21caf', hatColor: '#3b82f6' }, // purple + blue hat
  { bodyColor: '#15803d', hatColor: '#fbbf24' }, // green + yellow hat
  { bodyColor: '#b91c1c', hatColor: '#1e3a8a' }, // dark red + navy hat
  { bodyColor: '#0f766e', hatColor: '#dc2626' }, // teal + red hat
  { bodyColor: '#7c3aed', hatColor: '#16a34a' }, // violet + green hat
  { bodyColor: '#ea580c', hatColor: '#1d4ed8' }, // orange + blue hat
];

const BEARD_STYLES: readonly BeardStyle[] = ['normal', 'normal', 'normal', 'long', 'none'];

export const GNOME_SCALE_MIN = 0.55;
export const GNOME_SCALE_MAX = 1.4;

export function randomPalette(): GnomePalette {
  return GNOME_PALETTES[Math.floor(Math.random() * GNOME_PALETTES.length)]!;
}

export function randomBeard(): BeardStyle {
  return BEARD_STYLES[Math.floor(Math.random() * BEARD_STYLES.length)]!;
}

/**
 * Biased toward smaller gnomes:
 * 40% → tiny (0.55–0.75)
 * 35% → small (0.75–0.95)
 * 20% → medium (0.95–1.2)
 * 5%  → large (1.2–1.4)
 */
export function randomScale(): number {
  const r = Math.random();
  if (r < 0.40) return 0.55 + Math.random() * 0.20;
  if (r < 0.75) return 0.75 + Math.random() * 0.20;
  if (r < 0.95) return 0.95 + Math.random() * 0.25;
  return 1.20 + Math.random() * 0.20;
}
