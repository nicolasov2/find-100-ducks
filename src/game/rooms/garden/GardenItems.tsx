import { Tree } from './furniture/Tree';
import { Bush } from './furniture/Bush';
import { Sunflower } from './furniture/Sunflower';
import { MushroomCluster } from './furniture/MushroomCluster';
import { GardenBench } from './furniture/GardenBench';
import { BirdBath } from './furniture/BirdBath';
import { PlanterBox } from '@/game/rooms/room1/furniture/PlanterBox';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';
import { GARDEN_ITEMS } from './items';
import type { GardenItem } from './layout';

function renderItem(item: GardenItem, key: number): React.JSX.Element {
  const { kind, position, flowerColor } = item;
  const scale = item.scale ?? 1;
  const rotationY = item.rotationY ?? 0;
  switch (kind) {
    case 'tree':
      return <Tree key={key} position={position} scale={scale} />;
    case 'bush':
      return (
        <Bush
          key={key}
          position={position}
          scale={scale}
          {...(flowerColor !== undefined ? { flowerColor } : {})}
        />
      );
    case 'sunflower':
      return <Sunflower key={key} position={position} scale={scale} />;
    case 'mushroom':
      return <MushroomCluster key={key} position={position} />;
    case 'bench':
      return <GardenBench key={key} position={position} rotationY={rotationY} />;
    case 'birdbath':
      return <BirdBath key={key} position={position} />;
    case 'planter':
      return <PlanterBox key={key} position={position} rotationY={rotationY} />;
    case 'plant':
      return <Plant key={key} position={position} />;
    case 'box':
      return <CardboardBox key={key} position={position} rotationY={rotationY} />;
  }
}

/** Renders every GARDEN_ITEMS entry. Same data feeds GARDEN_AABBS. */
export function GardenItems(): React.JSX.Element {
  return <>{GARDEN_ITEMS.map((item, i) => renderItem(item, i))}</>;
}
