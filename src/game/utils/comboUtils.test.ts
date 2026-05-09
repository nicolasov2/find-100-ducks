import { describe, it, expect } from 'vitest';
import { getComboMultiplier, COMBO_MULTIPLIERS } from './comboUtils';

describe('getComboMultiplier', () => {
  it('returns 1.0 for streak 0', () => {
    expect(getComboMultiplier(0)).toBe(1.0);
  });

  it('returns 1.0 for negative streak', () => {
    expect(getComboMultiplier(-5)).toBe(1.0);
  });

  it('matches COMBO_MULTIPLIERS at each streak level', () => {
    COMBO_MULTIPLIERS.forEach((expected, idx) => {
      expect(getComboMultiplier(idx + 1)).toBe(expected);
    });
  });

  it('caps at max multiplier for large streaks', () => {
    const max = COMBO_MULTIPLIERS[COMBO_MULTIPLIERS.length - 1]!;
    expect(getComboMultiplier(999)).toBe(max);
  });
});
