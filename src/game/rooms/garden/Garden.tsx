import { RigidBody } from '@react-three/rapier';
import { GardenItems } from './GardenItems';
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

      {/* ── Furniture (data-driven: GARDEN_ITEMS feeds both render and AABBs) ── */}
      <GardenItems />

      {/* ── Extended structures (tool shed, well) + extra lights ── */}
      <GardenExtension />

      {/* ── Stepping stones along main path ── */}
      {[-6, -4, -2, 0, 2, 4].map((dz) => (
        <mesh key={dz} position={[CX, 0.008, NORTH_Z + 4 + dz]} receiveShadow>
          <boxGeometry args={[0.65, 0.018, 0.65]} />
          <meshStandardMaterial color="#a8a29e" roughness={0.9} />
        </mesh>
      ))}

      {/* ── Garden lantern at entrance ── */}
      <group position={[CX + 1.8, 0, NORTH_Z + 0.6]}>
        <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.04, 0.04, 1.6, 6]} /><meshStandardMaterial color="#44403c" roughness={0.8} /></mesh>
        <mesh position={[0, 1.7, 0]}><boxGeometry args={[0.28, 0.28, 0.28]} /><meshStandardMaterial color="#fef9c3" transparent opacity={0.3} /></mesh>
        <pointLight position={[0, 1.7, 0]} intensity={2} distance={6} decay={2} color="#fff0a0" />
      </group>

      {/* ── Lights ── */}
      <pointLight position={[CX, 5, CZ]} intensity={3} distance={22} decay={2} color="#fff7d6" />
      <pointLight position={[CX - 6, 4, CZ + 5]} intensity={1.5} distance={12} decay={2} color="#fff7d6" />
      <pointLight position={[CX + 6, 4, CZ - 4]} intensity={1.5} distance={12} decay={2} color="#fff7d6" />
    </group>
  );
}
