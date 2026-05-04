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

export const DUCK_TARGET = 100;
export const BEAM_DURATION_MS = 90;
export const DEATH_DURATION_MS = 380;

export interface ShotInput {
  at: number;
  beamFrom: Vector3Tuple;
  beamTo: Vector3Tuple;
  deadDuck: Duck | null;
}

export interface GameState {
  status: GameStatus;
  ducks: readonly Duck[];
  dyingDucks: readonly DyingDuck[];
  beams: readonly BeamShot[];
  startedAt: number | null;
  endedAt: number | null;
  lastShotAt: number | null;
  setStatus: (status: GameStatus) => void;
  spawnDucks: (pool: readonly SpawnPoint[]) => void;
  triggerShot: (input: ShotInput) => void;
  purgeExpiredEffects: (now: number) => void;
  reset: () => void;
}

let beamCounter = 0;
const nextBeamId = (): string => `beam-${++beamCounter}`;

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  ducks: [],
  dyingDucks: [],
  beams: [],
  startedAt: null,
  endedAt: null,
  lastShotAt: null,
  setStatus: (status) => set({ status }),
  spawnDucks: (pool) =>
    set(() => {
      const picked = shuffled(pool).slice(0, DUCK_TARGET);
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
        dyingDucks: [],
        beams: [],
        status: 'playing',
        startedAt: Date.now(),
        endedAt: null,
        lastShotAt: null,
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
      if (deadDuck === null) {
        return { beams, lastShotAt: at };
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
  reset: () =>
    set({
      ducks: [],
      dyingDucks: [],
      beams: [],
      status: 'menu',
      startedAt: null,
      endedAt: null,
      lastShotAt: null,
    }),
}));
