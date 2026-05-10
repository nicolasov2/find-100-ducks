import { Room3Walls } from './Room3Walls';
import { Desk } from './furniture/Desk';
import { TallBookcase } from './furniture/TallBookcase';
import { ReadingChair } from './furniture/ReadingChair';
import { Globe } from './furniture/Globe';
import { Rug } from './furniture/Rug';
import { Fireplace } from './furniture/Fireplace';
import { CoffeeTable } from './furniture/CoffeeTable';
import { WallClock } from './furniture/WallClock';
import { Chest } from './furniture/Chest';
import { Ladder } from './furniture/Ladder';
import { Lamp } from '@/game/rooms/room1/furniture/Lamp';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { BookStack } from '@/game/rooms/room1/furniture/BookStack';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';
import { FloorCushion } from '@/game/rooms/room1/furniture/FloorCushion';
import { SideTable } from '@/game/rooms/room1/furniture/SideTable';
import { WallPainting } from '@/game/rooms/room1/furniture/WallPainting';
import { Pouf } from '@/game/rooms/room1/furniture/Pouf';
import { PlanterBox } from '@/game/rooms/room1/furniture/PlanterBox';
import { RockingChair } from './furniture/RockingChair';
import { CeilingLight } from '@/game/rooms/room1/furniture/CeilingLight';

const CX = 28;
const CZ = 21;
const HW = 7;
const HD = 6;

export function Room3(): React.JSX.Element {
  return (
    <group>
      <Room3Walls />

      {/* ── Bookcases ── */}
      <TallBookcase position={[CX - 4, 0, CZ + HD - 0.4]} />
      <TallBookcase position={[CX + 4, 0, CZ + HD - 0.4]} />
      <TallBookcase position={[CX - HW + 0.4, 0, CZ + 1]} rotationY={Math.PI / 2} />
      <TallBookcase position={[CX - HW + 0.4, 0, CZ - 3]} rotationY={Math.PI / 2} />

      {/* ── Ladder leaning against south bookcase ── */}
      <Ladder position={[CX - 2.5, 0, CZ + HD - 0.6]} />

      {/* ── Desk area ── */}
      <Desk position={[CX + 3, 0, CZ - 3]} rotationY={-Math.PI / 4} />
      <ReadingChair position={[CX + 4.2, 0, CZ - 1.8]} rotationY={Math.PI + Math.PI / 4} />
      <SideTable position={[CX + 5.5, 0, CZ - 4]} />

      {/* ── Fireplace area ── */}
      <Fireplace position={[CX + HW - 0.5, 0, CZ]} rotationY={-Math.PI / 2} />
      <ReadingChair position={[CX + 3, 0, CZ]} rotationY={Math.PI / 2} />
      <ReadingChair position={[CX + 3, 0, CZ + 2.5]} rotationY={Math.PI / 2} />
      <CoffeeTable position={[CX + 4.5, 0, CZ + 1.2]} />

      {/* ── Storage chests ── */}
      <Chest position={[CX - 3, 0, CZ - 5]} rotationY={0.1} />
      <Chest position={[CX + 2, 0, CZ + 4.5]} rotationY={-0.3} />

      {/* ── Globe ── */}
      <Globe position={[CX - 2, 0, CZ - 3.5]} />
      <Globe position={[CX + 5.5, 0.42, CZ + 1.2]} />

      {/* ── Rugs ── */}
      <Rug position={[CX, 0, CZ]} width={5} depth={4} />
      <Rug position={[CX + 3, 0, CZ - 3]} width={2.5} depth={2} rotationY={-Math.PI / 4} />

      {/* ── Wall clock + paintings ── */}
      <WallClock position={[CX, 2.5, CZ + HD - 0.12]} />
      <WallPainting position={[CX + HW - 0.12, 2.2, CZ - 3]} rotationY={-Math.PI / 2} colorIndex={3} />
      <WallPainting position={[CX - HW + 0.12, 2.8, CZ - 4]} rotationY={Math.PI / 2} colorIndex={1} width={0.5} height={0.7} />

      {/* ── Floor lamps ── */}
      <Lamp position={[CX - HW + 1.5, 0, CZ - HD + 1]} />
      <Lamp position={[CX + HW - 1.5, 0, CZ + HD - 1]} />

      {/* ── Plants ── */}
      <Plant position={[CX - HW + 0.8, 0, CZ - HD + 0.8]} />
      <Plant position={[CX + HW - 0.8, 0, CZ + HD - 0.8]} />
      <Plant position={[CX, 0, CZ - 5]} />
      <Plant position={[CX + 5, 0, CZ + 4.5]} />

      {/* ── Book stacks scattered ── */}
      <BookStack position={[CX - 1, 0.85, CZ - 3]} />
      <BookStack position={[CX + 2, 0, CZ + 3]} />
      <BookStack position={[CX - 3, 0, CZ + 4]} />
      <BookStack position={[CX + 4.5, 0.42, CZ + 1.2]} />
      <BookStack position={[CX - 5, 0, CZ - 2]} />

      {/* ── Boxes ── */}
      <CardboardBox position={[CX - 5, 0, CZ + 5]} rotationY={0.4} />
      <CardboardBox position={[CX + 6, 0, CZ - 5]} rotationY={-0.2} />

      {/* ── Cushions ── */}
      <FloorCushion position={[CX - 1, 0, CZ + 3]} rotationY={0.5} color="#7f1d1d" trim="#991b1b" />
      <FloorCushion position={[CX + 1, 0, CZ - 2]} rotationY={-0.3} color="#1e3a5f" trim="#1e40af" />

      {/* ── Rocking chairs ── */}
      <RockingChair position={[CX - 4, 0, CZ - 4]} rotationY={Math.PI / 4} />
      <RockingChair position={[CX + 5, 0, CZ - 3]} rotationY={-Math.PI / 5} />

      {/* ── Poufs ── */}
      <Pouf position={[CX - 2, 0, CZ + 5]} color="#7c3aed" />
      <Pouf position={[CX + 3, 0, CZ + 5.5]} color="#dc2626" />

      {/* ── Planter ── */}
      <PlanterBox position={[CX, 0, CZ - 5.5]} rotationY={0} />

      {/* ── Ceiling lights ── */}
      <CeilingLight position={[CX + 3, 0, CZ - 3]} color="#fff0d0" intensity={3} />
      <CeilingLight position={[CX - 3, 0, CZ + 2]} color="#fff0d0" intensity={3} />

      {/* ── Candles sobre la chimenea ── */}
      <group position={[CX + HW - 0.5, 1.12, CZ - 0.6]}>
        <mesh position={[-0.18, 0.06, 0]}><cylinderGeometry args={[0.025, 0.025, 0.12, 6]} /><meshStandardMaterial color="#fef3c7" /></mesh>
        <mesh position={[-0.18, 0.145, 0]}><sphereGeometry args={[0.016, 5, 4]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3} /></mesh>
        <mesh position={[0.18, 0.08, 0]}><cylinderGeometry args={[0.025, 0.025, 0.16, 6]} /><meshStandardMaterial color="#fef3c7" /></mesh>
        <mesh position={[0.18, 0.165, 0]}><sphereGeometry args={[0.016, 5, 4]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3} /></mesh>
      </group>

      {/* ── Lighting ── */}
      <pointLight position={[CX, 3.5, CZ]} intensity={4} distance={12} decay={2} color="#fef3c7" />
      <pointLight position={[CX - 3, 3.5, CZ - 2]} intensity={2} distance={8} decay={2} color="#fef3c7" />
      <pointLight position={[CX + 4, 3.5, CZ + 2]} intensity={2} distance={8} decay={2} color="#fef3c7" />
      <pointLight position={[CX + HW - 0.5, 1.6, CZ]} intensity={3} distance={5} decay={2} color="#ff7c00" />
    </group>
  );
}
