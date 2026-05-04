import { create } from 'zustand';
import type { Vector3Tuple } from 'three';
import type {
  BeamShot,
  Duck,
  DyingDuck,
  GameStatus,
  SpawnPoint,
} from '@/game/types';
import { shuffled } from '@/game/utils/shuffle';
import { randomPalette, randomScale } from '@/game/utils/duckPalettes';

export const BEAM_DURATION_MS = 90;
export const DEATH_DURATION_MS = 380;
const COMBO_WINDOW_MS = 5000;

export interface ShotInput {
  at: number;
  beamFrom: Vector3Tuple;
  beamTo: Vector3Tuple;
  deadDuck: Duck | null;
}

export interface GameStats {
  shotsFired: number;
  shotsHit: number;
  currentStreak: number;
  maxCombo: number;
  lastHitAt: number;
  roomsWithHits: Set<string>;
  smallestDuckScale: number;
}

export interface GameState {
  status: GameStatus;
  duckTarget: number;
  ducks: readonly Duck[];
  dyingDucks: readonly DyingDuck[];
  beams: readonly BeamShot[];
  startedAt: number | null;
  endedAt: number | null;
  lastShotAt: number | null;
  stats: GameStats;
  hitFlash: boolean;
  comboDisplay: number;
  setStatus: (status: GameStatus) => void;
  spawnDucks: (pool: readonly SpawnPoint[], count: number) => void;
  triggerShot: (input: ShotInput) => void;
  purgeExpiredEffects: (now: number) => void;
  clearHitFlash: () => void;
  reset: () => void;
}

let beamCounter = 0;
const nextBeamId = (): string => `beam-${++beamCounter}`;

const emptyStats = (): GameStats => ({
  shotsFired: 0,
  shotsHit: 0,
  currentStreak: 0,
  maxCombo: 0,
  lastHitAt: 0,
  roomsWithHits: new Set(),
  smallestDuckScale: 999,
});

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  duckTarget: 100,
  ducks: [],
  dyingDucks: [],
  beams: [],
  startedAt: null,
  endedAt: null,
  lastShotAt: null,
  stats: emptyStats(),
  hitFlash: false,
  comboDisplay: 0,
  setStatus: (status) => set({ status }),
  spawnDucks: (pool, count = 100) =>
    set(() => {
      const picked = shuffled(pool).slice(0, count);
      const ducks: Duck[] = picked.map((sp, i) => {
        const palette = randomPalette();
        return {
          id: `duck-${String(i).padStart(3, '0')}`,
          spawnPointId: sp.id,
          position: [sp.position[0], sp.position[1], sp.position[2]],
          rotation: [0, Math.random() * Math.PI * 2, 0],
          scale: randomScale(),
          bodyColor: palette.bodyColor,
          beakColor: palette.beakColor,
        };
      });
      return {
        ducks,
        duckTarget: count,
        dyingDucks: [],
        beams: [],
        status: 'playing',
        startedAt: Date.now(),
        endedAt: null,
        lastShotAt: null,
        stats: emptyStats(),
        hitFlash: false,
        comboDisplay: 0,
      };
    }),
  triggerShot: ({ at, beamFrom, beamTo, deadDuck }) =>
    set((state) => {
      const beam: BeamShot = {
        id: nextBeamId(),
        from: beamFrom,
        to: beamTo,
        startedAt: at,
      };
      const beams = [...state.beams, beam];
      const newStats = { ...state.stats };
      newStats.shotsFired += 1;

      if (deadDuck === null) {
        newStats.currentStreak = 0;
        return { beams, lastShotAt: at, stats: newStats, comboDisplay: 0 };
      }

      // Hit!
      newStats.shotsHit += 1;

      // Combo tracking
      const timeSinceLastHit = at - newStats.lastHitAt;
      if (timeSinceLastHit < COMBO_WINDOW_MS && newStats.lastHitAt > 0) {
        newStats.currentStreak += 1;
      } else {
        newStats.currentStreak = 1;
      }
      newStats.maxCombo = Math.max(newStats.maxCombo, newStats.currentStreak);
      newStats.lastHitAt = at;

      // Room tracking
      const roomId = deadDuck.spawnPointId.split('-')[0] ?? '';
      if (roomId.startsWith('r')) {
        newStats.roomsWithHits.add(roomId);
      }

      // Smallest duck
      if (deadDuck.scale < newStats.smallestDuckScale) {
        newStats.smallestDuckScale = deadDuck.scale;
      }

      const ducks = state.ducks.filter((d) => d.id !== deadDuck.id);
      const dying: DyingDuck = {
        id: deadDuck.id,
        position: deadDuck.position,
        rotation: deadDuck.rotation,
        scale: deadDuck.scale,
        bodyColor: deadDuck.bodyColor,
        beakColor: deadDuck.beakColor,
        startedAt: at,
      };
      const dyingDucks = [...state.dyingDucks, dying];
      const won = ducks.length === 0 && state.endedAt === null;
      return {
        ducks,
        dyingDucks,
        beams,
        lastShotAt: at,
        stats: newStats,
        hitFlash: true,
        comboDisplay: newStats.currentStreak >= 2 ? newStats.currentStreak : 0,
        ...(won ? { status: 'won' as const, endedAt: at } : {}),
      };
    }),
  purgeExpiredEffects: (now) =>
    set((state) => {
      const beams = state.beams.filter(
        (b) => now - b.startedAt < BEAM_DURATION_MS,
      );
      const dyingDucks = state.dyingDucks.filter(
        (d) => now - d.startedAt < DEATH_DURATION_MS,
      );
      if (
        beams.length === state.beams.length &&
        dyingDucks.length === state.dyingDucks.length
      ) {
        return state;
      }
      return { beams, dyingDucks };
    }),
  clearHitFlash: () => set({ hitFlash: false }),
  reset: () =>
    set({
      ducks: [],
      dyingDucks: [],
      beams: [],
      status: 'menu',
      startedAt: null,
      endedAt: null,
      lastShotAt: null,
      stats: emptyStats(),
      hitFlash: false,
      comboDisplay: 0,
    }),
}));
