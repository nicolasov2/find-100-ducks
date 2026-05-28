// Solid structures of the expanded garden. Repeatable furniture (trees, bushes,
// hedges, etc.) now lives in GARDEN_ITEMS; only the bespoke shed + well remain
// here, anchored to the shared positions in layout.ts so their AABBs stay synced.

import { TOOL_SHED_POS, STONE_WELL_POS } from './layout';

const CX = 0;
const CZ = 22;

// Tool shed — visual; its footprint is collision-filtered via TOOL_SHED_BOUNDS.
function ToolShed(): React.JSX.Element {
  return (
    <group position={TOOL_SHED_POS}>
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

// Stone well — visual; filtered via STONE_WELL_BOUNDS.
function StoneWell(): React.JSX.Element {
  return (
    <group position={STONE_WELL_POS}>
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

export function GardenExtension(): React.JSX.Element {
  return (
    <>
      <ToolShed />
      <StoneWell />

      {/* Extra fill lights for extended area */}
      <pointLight position={[14, 4, CZ + 5]} intensity={1.2} distance={14} decay={2} color="#fff7d6" />
      <pointLight position={[-14, 4, CZ + 5]} intensity={1.2} distance={14} decay={2} color="#fff7d6" />
      <pointLight position={[CX, 5, CZ + 13]} intensity={2} distance={18} decay={2} color="#fff7d6" />
    </>
  );
}
