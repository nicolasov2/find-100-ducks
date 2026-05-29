'use client';

import { useGLTF } from '@react-three/drei';
import { ModelProp } from './ModelProp';
import { BEACH_OBSTACLES } from './obstacles';
import type { BeachObstacleKind } from './layout';

// Per-kind .glb + target size. maxDim normalizes each source asset to roughly
// match its BEACH_BOUNDS footprint, so visuals and collision/spawn agree.
const PROP: Record<BeachObstacleKind, { readonly url: string; readonly maxDim: number }> = {
  palm: { url: '/models/props/palm.glb', maxDim: 5.4 },
  rock: { url: '/models/props/rock.glb', maxDim: 2.1 },
  umbrella: { url: '/models/props/umbrella.glb', maxDim: 2.9 },
  pier: { url: '/models/props/pier.glb', maxDim: 3.4 },
  boat: { url: '/models/props/boat.glb', maxDim: 4.6 },
  crate: { url: '/models/props/crate.glb', maxDim: 1.0 },
  lifeguard: { url: '/models/props/lifeguard.glb', maxDim: 3.8 },
};

// Warm the GLTF cache before the world mounts.
for (const def of Object.values(PROP)) useGLTF.preload(def.url);

/** Renders every BEACH_OBSTACLES entry as a normalized .glb prop. Same data feeds BEACH_AABBS. */
export function BeachProps(): React.JSX.Element {
  return (
    <>
      {BEACH_OBSTACLES.map((o, i) => {
        const def = PROP[o.kind];
        return (
          <ModelProp
            key={i}
            url={def.url}
            maxDim={def.maxDim}
            position={o.position}
            rotationY={o.rotationY ?? 0}
            scale={o.scale ?? 1}
          />
        );
      })}
    </>
  );
}
