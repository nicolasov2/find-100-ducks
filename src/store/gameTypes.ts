import type { Vector3Tuple } from 'three';
import type { Gnome } from '@/game/types';

export interface ShotInput {
  at: number;
  beamFrom: Vector3Tuple;
  beamTo: Vector3Tuple;
  beamColor: string;
  beamRadius: number;
  deadGnome: Gnome | null;
}

export interface GameStats {
  shotsFired: number;
  shotsHit: number;
  currentStreak: number;
  maxCombo: number;
  lastHitAt: number;
  roomsWithHits: Set<string>;
  smallestGnomeScale: number;
  totalExpGained: number;
  expSpent: number;
}
