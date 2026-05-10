import { RigidBody } from '@react-three/rapier';
import { Tree } from './furniture/Tree';
import { Bush } from './furniture/Bush';
import { GardenBench } from './furniture/GardenBench';
import { BirdBath } from './furniture/BirdBath';
import { Sunflower } from './furniture/Sunflower';
import { MushroomCluster } from './furniture/MushroomCluster';
import { PlanterBox } from '@/game/rooms/room1/furniture/PlanterBox';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';
import { GardenExtension } from './GardenExtension';

// Width expanded east/west. CZ=22 & north wall at z=12 stay put (Hallway3 connection).
const WIDTH = 34;
const SOUTH_EXT = 16;    // south fence pushed 16m past CZ
const NORTH_EXT = 10;    // north extent unchanged (north wall = CZ - 10 = 12)
const TOTAL_DEPTH = NORTH_EXT + SOUTH_EXT;
const HW = WIDTH / 2;    // = 17
const FLOOR_CZ = 22 + (SOUTH_EXT - NORTH_EXT) / 2;  // floor center z = 25
const NORTH_Z = 12;
const SOUTH_Z = 38;

const FENCE_HEIGHT = 1.4;
const FENCE_THICK = 0.2;
const FLOOR_THICK = 0.2;
const CX = 0;
const CZ = 22;           // furniture anchor (unchanged)

const GRASS = '#4ade80';
const FENCE_COLOR = '#7c3a1c';
const PATH = '#a8a29e';

const ARCH_W = 2.5;
const ARCH_HALF_W = ARCH_W / 2;
const NORTH_SEG_LEN = (WIDTH - ARCH_W) / 2;  // = 15.75

export function Garden(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Grass floor — expanded footprint */}
        <mesh position={[CX, -FLOOR_THICK / 2, FLOOR_CZ]} receiveShadow>
          <boxGeometry args={[WIDTH, FLOOR_THICK, TOTAL_DEPTH]} />
          <meshStandardMaterial color={GRASS} roughness={0.95} />
        </mesh>
        {/* Stone path from north entry */}
        <mesh position={[CX, 0.005, CZ - NORTH_EXT + 4]} receiveShadow>
          <boxGeometry args={[1.6, 0.01, 8]} />
          <meshStandardMaterial color={PATH} roughness={0.9} />
        </mesh>
        {/* East fence */}
        <mesh position={[CX + HW, FENCE_HEIGHT / 2, FLOOR_CZ]} castShadow receiveShadow>
          <boxGeometry args={[FENCE_THICK, FENCE_HEIGHT, TOTAL_DEPTH]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        {/* West fence */}
        <mesh position={[CX - HW, FENCE_HEIGHT / 2, FLOOR_CZ]} castShadow receiveShadow>
          <boxGeometry args={[FENCE_THICK, FENCE_HEIGHT, TOTAL_DEPTH]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        {/* South fence */}
        <mesh position={[CX, FENCE_HEIGHT / 2, SOUTH_Z]} castShadow receiveShadow>
          <boxGeometry args={[WIDTH, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        {/* North fence — split for archway at x=0 */}
        <mesh position={[CX - ARCH_HALF_W - NORTH_SEG_LEN / 2, FENCE_HEIGHT / 2, NORTH_Z]} castShadow>
          <boxGeometry args={[NORTH_SEG_LEN, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        <mesh position={[CX + ARCH_HALF_W + NORTH_SEG_LEN / 2, FENCE_HEIGHT / 2, NORTH_Z]} castShadow>
          <boxGeometry args={[NORTH_SEG_LEN, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
      </RigidBody>

      {/* ── Trees ── */}
      <Tree position={[CX - 9.5, 0, CZ + 8]} scale={1.1} />
      <Tree position={[CX + 9.5, 0, CZ + 8]} scale={1.0} />
      <Tree position={[CX - 9, 0, CZ + 4]} scale={0.9} />
      <Tree position={[CX + 9, 0, CZ + 2]} scale={1.2} />
      <Tree position={[CX + 7, 0, CZ - 7]} scale={0.85} />
      <Tree position={[CX - 7, 0, CZ - 7]} scale={0.95} />

      {/* ── Bushes ── */}
      <Bush position={[CX - 3, 0, CZ - 5]} scale={1.1} flowerColor="#f472b6" />
      <Bush position={[CX + 3, 0, CZ - 5]} scale={0.9} />
      <Bush position={[CX - 6, 0, CZ + 1]} flowerColor="#fbbf24" />
      <Bush position={[CX + 6, 0, CZ + 1]} scale={1.2} />
      <Bush position={[CX - 4, 0, CZ + 5]} scale={0.85} flowerColor="#fb7185" />
      <Bush position={[CX + 4, 0, CZ + 6]} flowerColor="#a78bfa" />
      <Bush position={[CX, 0, CZ + 7]} scale={1.3} flowerColor="#fbbf24" />
      <Bush position={[CX - 7, 0, CZ + 7]} scale={0.95} />
      <Bush position={[CX + 7, 0, CZ + 7]} flowerColor="#f472b6" />
      <Bush position={[CX - 1, 0, CZ + 9]} scale={1.0} />

      {/* ── Sunflowers ── */}
      <Sunflower position={[CX - 5, 0, CZ + 3]} scale={1.0} />
      <Sunflower position={[CX - 5.6, 0, CZ + 3.5]} scale={0.9} />
      <Sunflower position={[CX + 5, 0, CZ + 4.5]} scale={1.1} />
      <Sunflower position={[CX + 5.6, 0, CZ + 5]} scale={0.85} />

      {/* ── Benches + bird bath ── */}
      <GardenBench position={[CX - 4, 0, CZ + 2]} rotationY={Math.PI / 2} />
      <GardenBench position={[CX + 4, 0, CZ + 2]} rotationY={-Math.PI / 2} />
      <BirdBath position={[CX, 0, CZ + 2]} />

      {/* ── Mushroom clusters ── */}
      <MushroomCluster position={[CX - 8.5, 0, CZ + 7]} />
      <MushroomCluster position={[CX + 8.5, 0, CZ + 7]} />
      <MushroomCluster position={[CX - 5, 0, CZ + 5]} />

      {/* ── Planters + plants ── */}
      <PlanterBox position={[CX - 9, 0, CZ - 2]} rotationY={Math.PI / 2} />
      <PlanterBox position={[CX + 9, 0, CZ - 2]} rotationY={Math.PI / 2} />
      <Plant position={[CX - 5, 0, CZ - 4]} />
      <Plant position={[CX + 5, 0, CZ - 4]} />

      {/* ── Boxes ── */}
      <CardboardBox position={[CX + 7, 0, CZ + 5]} rotationY={0.4} />
      <CardboardBox position={[CX - 7, 0, CZ + 5]} rotationY={-0.3} />

      {/* ── Extended east / west / south areas ── */}
      <GardenExtension />

      {/* ── Lights ── */}
      <pointLight position={[CX, 5, CZ]} intensity={3} distance={22} decay={2} color="#fff7d6" />
      <pointLight position={[CX - 6, 4, CZ + 5]} intensity={1.5} distance={12} decay={2} color="#fff7d6" />
      <pointLight position={[CX + 6, 4, CZ - 4]} intensity={1.5} distance={12} decay={2} color="#fff7d6" />
    </group>
  );
}
