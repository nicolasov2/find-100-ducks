import type { Vector3Tuple } from 'three';

export type RoomId = 'room-1' | 'room-2' | 'room-3';

export interface SpawnPoint {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly rotation?: Vector3Tuple;
  readonly roomId: RoomId;
}

export interface Duck {
  readonly id: string;
  readonly spawnPointId: string;
  readonly position: Vector3Tuple;
  readonly rotation: Vector3Tuple;
}

export interface DyingDuck {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly rotation: Vector3Tuple;
  readonly startedAt: number;
}

export interface BeamShot {
  readonly id: string;
  readonly from: Vector3Tuple;
  readonly to: Vector3Tuple;
  readonly startedAt: number;
}

export type GameStatus = 'menu' | 'playing' | 'won';
