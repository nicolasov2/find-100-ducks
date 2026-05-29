import { create } from 'zustand';
import type { Vector3Tuple } from 'three';

// In-game spawn-point editor state. Markers are the hand-placed positions where
// gnomes may appear; they persist to localStorage so work isn't lost on reload.

const KEY = 'f100d_village_markers';
const MIN_SEP = 1.6; // minimum distance between markers — prevents clustering

function load(): Vector3Tuple[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Vector3Tuple[]) : [];
  } catch {
    return [];
  }
}

function save(markers: Vector3Tuple[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(markers));
  } catch { /* quota */ }
}

function tooClose(markers: Vector3Tuple[], p: Vector3Tuple): boolean {
  for (const q of markers) {
    const dx = q[0] - p[0];
    const dz = q[2] - p[2];
    if (dx * dx + dz * dz < MIN_SEP * MIN_SEP) return true;
  }
  return false;
}

export interface EditorState {
  markers: Vector3Tuple[];
  message: string;
  add: (p: Vector3Tuple) => void;
  removeNearest: (p: Vector3Tuple) => void;
  undo: () => void;
  clearAll: () => void;
  fill: (points: readonly Vector3Tuple[]) => void;
  setMessage: (m: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  markers: load(),
  message: '',
  add: (p) => {
    const ms = get().markers;
    if (tooClose(ms, p)) return; // keep spacing — no clustering
    const markers = [...ms, p];
    save(markers);
    set({ markers });
  },
  removeNearest: (p) => {
    const ms = get().markers;
    if (ms.length === 0) return;
    let best = 0;
    let bestD = Infinity;
    ms.forEach((q, i) => {
      const d = (q[0] - p[0]) ** 2 + (q[2] - p[2]) ** 2;
      if (d < bestD) { bestD = d; best = i; }
    });
    const markers = ms.filter((_, i) => i !== best);
    save(markers);
    set({ markers });
  },
  undo: () => {
    const markers = get().markers.slice(0, -1);
    save(markers);
    set({ markers });
  },
  clearAll: () => {
    save([]);
    set({ markers: [] });
  },
  fill: (points) => {
    // Deduped by spacing, so an auto-fill base stays evenly spread.
    const markers: Vector3Tuple[] = [];
    for (const p of points) if (!tooClose(markers, p)) markers.push([p[0], p[1], p[2]]);
    save(markers);
    set({ markers });
  },
  setMessage: (message) => set({ message }),
}));
