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

const WIDTH = 22;
const DEPTH = 20;
const FENCE_HEIGHT = 1.4;
const FENCE_THICK = 0.2;
const FLOOR_THICK = 0.2;

const CX = 0;
const CZ = 22;
const HW = WIDTH / 2;
const HD = DEPTH / 2;

const GRASS = '#4ade80';
const FENCE_COLOR = '#7c3a1c';
const PATH = '#a8a29e';

const ARCH_W = 2.5;
const ARCH_HALF_W = ARCH_W / 2;
const NORTH_SEG_LEN = (WIDTH - ARCH_W) / 2;

export function Garden(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Grass floor */}
        <mesh position={[CX, -FLOOR_THICK / 2, CZ]} receiveShadow>
          <boxGeometry args={[WIDTH, FLOOR_THICK, DEPTH]} />
          <meshStandardMaterial color={GRASS} roughness={0.95} />
        </mesh>
        {/* Stone path strip from north entry into the garden */}
        <mesh position={[CX, 0.005, CZ - HD + 4]} receiveShadow>
          <boxGeometry args={[1.6, 0.01, 8]} />
          <meshStandardMaterial color={PATH} roughness={0.9} />
        </mesh>
        {/* Fences — east, west, south solid; north has archway */}
        <mesh position={[CX - HW, FENCE_HEIGHT / 2, CZ]} castShadow receiveShadow>
          <boxGeometry args={[FENCE_THICK, FENCE_HEIGHT, DEPTH]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        <mesh position={[CX + HW, FENCE_HEIGHT / 2, CZ]} castShadow receiveShadow>
          <boxGeometry args={[FENCE_THICK, FENCE_HEIGHT, DEPTH]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        <mesh position={[CX, FENCE_HEIGHT / 2, CZ + HD]} castShadow receiveShadow>
          <boxGeometry args={[WIDTH, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        {/* North fence — split for archway */}
        <mesh position={[CX - ARCH_HALF_W - NORTH_SEG_LEN / 2, FENCE_HEIGHT / 2, CZ - HD]} castShadow>
          <boxGeometry args={[NORTH_SEG_LEN, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
        <mesh position={[CX + ARCH_HALF_W + NORTH_SEG_LEN / 2, FENCE_HEIGHT / 2, CZ - HD]} castShadow>
          <boxGeometry args={[NORTH_SEG_LEN, FENCE_HEIGHT, FENCE_THICK]} />
          <meshStandardMaterial color={FENCE_COLOR} />
        </mesh>
      </RigidBody>

      {/* Trees in corners and along edges */}
      <Tree position={[CX - HW + 1.5, 0, CZ + HD - 1.5]} scale={1.1} />
      <Tree position={[CX + HW - 1.5, 0, CZ + HD - 1.5]} scale={1.0} />
      <Tree position={[CX - HW + 1.5, 0, CZ + 4]} scale={0.9} />
      <Tree position={[CX + HW - 1.5, 0, CZ + 2]} scale={1.2} />
      <Tree position={[CX + HW - 4, 0, CZ - HD + 3]} scale={0.85} />
      <Tree position={[CX - HW + 4, 0, CZ - HD + 3]} scale={0.95} />

      {/* Bushes scattered, hiding spots galore */}
      <Bush position={[CX - 3, 0, CZ - HD + 5]} scale={1.1} flowerColor="#f472b6" />
      <Bush position={[CX + 3, 0, CZ - HD + 5]} scale={0.9} />
      <Bush position={[CX - 6, 0, CZ + 1]} flowerColor="#fbbf24" />
      <Bush position={[CX + 6, 0, CZ + 1]} scale={1.2} />
      <Bush position={[CX - 4, 0, CZ + 5]} scale={0.85} flowerColor="#fb7185" />
      <Bush position={[CX + 4, 0, CZ + 6]} flowerColor="#a78bfa" />
      <Bush position={[CX, 0, CZ + 7]} scale={1.3} flowerColor="#fbbf24" />
      <Bush position={[CX - 7, 0, CZ + HD - 3]} scale={0.95} />
      <Bush position={[CX + 7, 0, CZ + HD - 3]} flowerColor="#f472b6" />
      <Bush position={[CX - 1, 0, CZ + HD - 1]} scale={1.0} />

      {/* Sunflowers in clusters */}
      <Sunflower position={[CX - HW + 3, 0, CZ + 3]} scale={1.0} />
      <Sunflower position={[CX - HW + 3.6, 0, CZ + 3.5]} scale={0.9} />
      <Sunflower position={[CX + HW - 3, 0, CZ + 4.5]} scale={1.1} />
      <Sunflower position={[CX + HW - 3.6, 0, CZ + 5]} scale={0.85} />

      {/* Bench + bird bath at center */}
      <GardenBench position={[CX - 4, 0, CZ + 2]} rotationY={Math.PI / 2} />
      <GardenBench position={[CX + 4, 0, CZ + 2]} rotationY={-Math.PI / 2} />
      <BirdBath position={[CX, 0, CZ + 2]} />

      {/* Mushroom clusters near trees */}
      <MushroomCluster position={[CX - HW + 2.5, 0, CZ + HD - 3]} />
      <MushroomCluster position={[CX + HW - 2.5, 0, CZ + HD - 3]} />
      <MushroomCluster position={[CX - HW + 3, 0, CZ + 5]} />

      {/* Some house planters and classic plants for hiding */}
      <PlanterBox position={[CX - HW + 1, 0, CZ - HD + 8]} rotationY={Math.PI / 2} />
      <PlanterBox position={[CX + HW - 1, 0, CZ - HD + 8]} rotationY={Math.PI / 2} />
      <Plant position={[CX - 5, 0, CZ - HD + 6]} />
      <Plant position={[CX + 5, 0, CZ - HD + 6]} />

      {/* Cardboard boxes left in the yard */}
      <CardboardBox position={[CX + 7, 0, CZ + HD - 5]} rotationY={0.4} />
      <CardboardBox position={[CX - 7, 0, CZ + 5]} rotationY={-0.3} />

      {/* Sun */}
      <directionalLight
        position={[CX - 5, 12, CZ - 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-far={40}
        color="#fff7d6"
      />
      <ambientLight intensity={0.45} color="#cfe9ff" />
    </group>
  );
}
