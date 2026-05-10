import type { Object3D } from 'three';

export function findGnomeId(start: Object3D | null): string | null {
  let curr: Object3D | null = start;
  while (curr !== null) {
    const id = curr.userData['gnomeId'];
    if (typeof id === 'string') return id;
    curr = curr.parent;
  }
  return null;
}

export function shouldIgnore(start: Object3D | null): boolean {
  let curr: Object3D | null = start;
  while (curr !== null) {
    if (curr.userData['raycastIgnore'] === true) return true;
    curr = curr.parent;
  }
  return false;
}
