import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.36, 0, -0.31], max: [0.36, 0.96, 0.31] };

const BODY_COLOR = '#27272a';
const BURNER_COLOR = '#3f3f46';
const HANDLE_COLOR = '#71717a';

export interface OvenProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Oven({ position, rotationY = 0 }: OvenProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Body */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.9, 0.6]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Stovetop */}
        <mesh position={[0, 0.92, 0]} castShadow>
          <boxGeometry args={[0.72, 0.04, 0.62]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        {/* Burners (4) */}
        {([[-0.18, -0.15], [-0.18, 0.15], [0.18, -0.15], [0.18, 0.15]] as const).map(
          ([x, z], i) => (
            <mesh key={i} position={[x, 0.95, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.04, 0.06, 16]} />
              <meshStandardMaterial color={BURNER_COLOR} />
            </mesh>
          ),
        )}
        {/* Oven door */}
        <mesh position={[0, 0.35, 0.31]} castShadow>
          <boxGeometry args={[0.6, 0.5, 0.02]} />
          <meshStandardMaterial color="#1c1917" />
        </mesh>
        {/* Door handle */}
        <mesh position={[0, 0.62, 0.33]} castShadow>
          <boxGeometry args={[0.35, 0.03, 0.03]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
}
