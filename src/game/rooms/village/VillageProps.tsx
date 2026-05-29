'use client';

import { useGLTF } from '@react-three/drei';
import { ModelProp } from './ModelProp';
import { VILLAGE_ITEMS } from './items';
import type { VillageItemKind } from './layout';

// Per-kind .glb + target size (largest dimension, meters). All CC0 (Quaternius)
// except castle (CC-BY) — see public/models/CREDITS.md.
const PROP: Record<VillageItemKind, { readonly url: string; readonly maxDim: number }> = {
  townhouse1: { url: '/models/village/townhouse1.glb', maxDim: 6 },
  townhouse2: { url: '/models/village/townhouse2.glb', maxDim: 6 },
  house1: { url: '/models/village/house1.glb', maxDim: 5.5 },
  house2: { url: '/models/village/house2.glb', maxDim: 5.5 },
  house3: { url: '/models/village/house3.glb', maxDim: 5.5 },
  fantasyhouse: { url: '/models/village/fantasyhouse.glb', maxDim: 5.5 },
  bigbuilding: { url: '/models/village/bigbuilding.glb', maxDim: 8 },
  castle: { url: '/models/village/castle.glb', maxDim: 14 },
  windmill: { url: '/models/village/windmill.glb', maxDim: 9 },
  well: { url: '/models/village/well.glb', maxDim: 2.6 },
  market: { url: '/models/village/market.glb', maxDim: 3.4 },
  barrel: { url: '/models/village/barrel.glb', maxDim: 1.1 },
  bucket: { url: '/models/village/bucket.glb', maxDim: 0.7 },
};

for (const def of Object.values(PROP)) useGLTF.preload(def.url);

/** Renders every VILLAGE_ITEMS entry as a normalized .glb prop. Same data feeds VILLAGE_AABBS. */
export function VillageProps(): React.JSX.Element {
  return (
    <>
      {VILLAGE_ITEMS.map((it, i) => {
        const def = PROP[it.kind];
        return (
          <ModelProp
            key={i}
            url={def.url}
            maxDim={def.maxDim}
            position={it.position}
            rotationY={it.rotationY ?? 0}
            scale={it.scale ?? 1}
          />
        );
      })}
    </>
  );
}
