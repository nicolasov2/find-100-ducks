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
export const GNOME_SCALE_MAX = 1.15;

export function randomPalette(): GnomePalette {
  return GNOME_PALETTES[Math.floor(Math.random() * GNOME_PALETTES.length)]!;
}

export function randomBeard(): BeardStyle {
  return BEARD_STYLES[Math.floor(Math.random() * BEARD_STYLES.length)]!;
}

/**
 * Biased toward smaller gnomes:
 * 45% → tiny (0.55–0.72)
 * 35% → small (0.72–0.90)
 * 18% → medium (0.90–1.05)
 * 2%  → large (1.05–1.15)
 */
export function randomScale(): number {
  const r = Math.random();
  if (r < 0.45) return 0.55 + Math.random() * 0.17;
  if (r < 0.80) return 0.72 + Math.random() * 0.18;
  if (r < 0.98) return 0.90 + Math.random() * 0.15;
  return 1.05 + Math.random() * 0.10;
}
