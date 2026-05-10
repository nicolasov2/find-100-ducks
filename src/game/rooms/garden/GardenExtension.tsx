// South extension + east/west wings of the expanded garden.
// CX=0, CZ=22 kept as anchors matching the main Garden.tsx.

import { Bush } from './furniture/Bush';
import { Tree } from './furniture/Tree';
import { Sunflower } from './furniture/Sunflower';
import { MushroomCluster } from './furniture/MushroomCluster';
import { GardenBench } from './furniture/GardenBench';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';

const CX = 0;
const CZ = 22;

// Tool shed — purely visual, creates corners for gnome hiding
function ToolShed(): React.JSX.Element {
  return (
    <group position={[CX + 9, 0, CZ + 14]}>
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[4.5, 2.6, 3.5]} />
        <meshStandardMaterial color="#a16207" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.75, 0]} castShadow>
        <boxGeometry args={[5, 0.3, 4]} />
        <meshStandardMaterial color="#57534e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[4.5, 0.1, 3.5]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>
    </group>
  );
}

// Stone well
function StoneWell(): React.JSX.Element {
  return (
    <group position={[CX - 8, 0, CZ + 12]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.65, 1, 10]} />
        <meshStandardMaterial color="#78716c" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.12, 10]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Hedge (visual wall made of bushes)
function HedgeRow({ x, z, count, rotationY = 0 }: { x: number; z: number; count: number; rotationY?: number }): React.JSX.Element {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Bush
          key={i}
          position={[
            x + (rotationY === 0 ? i * 1.4 : 0),
            0,
            z + (rotationY === 0 ? 0 : i * 1.4),
          ]}
          scale={1.1}
        />
      ))}
    </>
  );
}

export function GardenExtension(): React.JSX.Element {
  return (
    <>
      {/* ── East wing (x: 12–16) ── */}
      <Tree position={[14, 0, CZ - 7]} scale={1.0} />
      <Tree position={[15, 0, CZ + 3]} scale={1.2} />
      <Tree position={[13, 0, CZ + 10]} scale={0.9} />
      <Bush position={[12, 0, CZ - 4]} scale={1.0} flowerColor="#fbbf24" />
      <Bush position={[14, 0, CZ + 1]} scale={1.1} />
      <Bush position={[13, 0, CZ + 7]} scale={0.95} flowerColor="#f472b6" />
      <Sunflower position={[15, 0, CZ - 2]} scale={1.1} />
      <Sunflower position={[15.5, 0, CZ - 1.4]} scale={0.9} />
      <Sunflower position={[14.5, 0, CZ - 2.6]} scale={1.0} />
      <MushroomCluster position={[12.5, 0, CZ + 5]} />
      <Plant position={[16, 0, CZ + 9]} />

      {/* ── West wing (x: -12 to -16) ── */}
      <Tree position={[-14, 0, CZ - 7]} scale={1.05} />
      <Tree position={[-15, 0, CZ + 4]} scale={1.1} />
      <Tree position={[-13, 0, CZ + 10]} scale={0.88} />
      <Bush position={[-12, 0, CZ - 3]} scale={1.0} flowerColor="#a78bfa" />
      <Bush position={[-14, 0, CZ + 2]} scale={1.15} flowerColor="#fb7185" />
      <Bush position={[-13, 0, CZ + 8]} scale={1.0} />
      <Sunflower position={[-15, 0, CZ - 1]} scale={1.0} />
      <Sunflower position={[-15.5, 0, CZ - 1.8]} scale={0.9} />
      <MushroomCluster position={[-12.5, 0, CZ + 6]} />
      <Plant position={[-16, 0, CZ + 8]} />

      {/* ── South extension (z: CZ+10 to CZ+15) ── */}
      <ToolShed />
      <StoneWell />
      <HedgeRow x={CX - 6} z={CZ + 11} count={4} />
      <HedgeRow x={CX + 2} z={CZ + 11} count={3} />
      <Tree position={[CX - 12, 0, CZ + 13]} scale={1.1} />
      <Tree position={[CX + 12, 0, CZ + 13]} scale={0.95} />
      <Tree position={[CX - 4, 0, CZ + 15]} scale={1.0} />
      <Bush position={[CX + 4, 0, CZ + 15]} scale={1.2} flowerColor="#fbbf24" />
      <Bush position={[CX - 13, 0, CZ + 10]} scale={1.0} />
      <Bush position={[CX + 13, 0, CZ + 10]} scale={1.1} flowerColor="#f472b6" />
      <Bush position={[CX, 0, CZ + 14]} scale={1.3} flowerColor="#a78bfa" />
      <GardenBench position={[CX - 5, 0, CZ + 13]} rotationY={0} />
      <CardboardBox position={[CX + 13, 0, CZ + 14]} rotationY={0.5} />
      <CardboardBox position={[CX - 11, 0, CZ + 12]} rotationY={-0.3} />
      <MushroomCluster position={[CX - 3, 0, CZ + 13]} />
      <MushroomCluster position={[CX + 6, 0, CZ + 12]} />
      <Sunflower position={[CX - 10, 0, CZ + 12]} scale={1.1} />
      <Sunflower position={[CX - 9.4, 0, CZ + 12.6]} scale={0.9} />
      <Sunflower position={[CX + 10, 0, CZ + 11]} scale={1.0} />

      {/* Extra fill lights for extended area */}
      <pointLight position={[14, 4, CZ + 5]} intensity={1.2} distance={14} decay={2} color="#fff7d6" />
      <pointLight position={[-14, 4, CZ + 5]} intensity={1.2} distance={14} decay={2} color="#fff7d6" />
      <pointLight position={[CX, 5, CZ + 13]} intensity={2} distance={18} decay={2} color="#fff7d6" />
    </>
  );
}
