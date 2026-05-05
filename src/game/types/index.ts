import type { Vector3Tuple } from 'three';

export type RoomId = 'room-1' | 'room-2' | 'room-3' | 'hallway-1' | 'hallway-2';

export interface SpawnPoint {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly rotation?: Vector3Tuple;
  readonly roomId: RoomId;
}

export interface Gnome {
  readonly id: string;
  readonly spawnPointId: string;
  readonly position: Vector3Tuple;
  readonly rotation: Vector3Tuple;
  readonly scale: number;
  readonly bodyColor: string;
  readonly hatColor: string;
  readonly beardStyle: 'normal' | 'long' | 'none';
}

export interface DyingGnome {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly rotation: Vector3Tuple;
  readonly scale: number;
  readonly bodyColor: string;
  readonly hatColor: string;
  readonly beardStyle: 'normal' | 'long' | 'none';
  readonly startedAt: number;
}

export interface BeamShot {
  readonly id: string;
  readonly from: Vector3Tuple;
  readonly to: Vector3Tuple;
  readonly startedAt: number;
}

export interface ExpPopup {
  readonly id: string;
  readonly position: Vector3Tuple;
  readonly amount: number;
  readonly mult: number;
  readonly startedAt: number;
}

export type GameStatus = 'menu' | 'playing' | 'won';
