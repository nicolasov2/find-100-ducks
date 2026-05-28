import { Room2Walls } from './Room2Walls';
import { Counter } from './furniture/Counter';
import { Fridge } from './furniture/Fridge';
import { RoundTable } from './furniture/RoundTable';
import { Stool } from './furniture/Stool';
import { Oven } from './furniture/Oven';
import { CabinetWall } from './furniture/CabinetWall';
import { TrashCan } from './furniture/TrashCan';
import { Microwave } from './furniture/Microwave';
import { WineRack } from './furniture/WineRack';
import { FruitBowl } from './furniture/FruitBowl';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';
import { Chair } from '@/game/rooms/room1/furniture/Chair';
import { BookStack } from '@/game/rooms/room1/furniture/BookStack';
import { FloorCushion } from '@/game/rooms/room1/furniture/FloorCushion';
import { Shelf } from '@/game/rooms/room1/furniture/Shelf';
import { PotRack } from './furniture/PotRack';
import { Broom } from './furniture/Broom';
import { PlanterBox } from '@/game/rooms/room1/furniture/PlanterBox';
import { CeilingLight } from '@/game/rooms/room1/furniture/CeilingLight';
import { WallClock } from '@/game/rooms/room3/furniture/WallClock';
import { WindowFrame } from '@/game/rooms/room1/furniture/WindowFrame';

const CX = 28;
const CZ = 0;
const HW = 8;
const HD = 7;

export function Room2(): React.JSX.Element {
  return (
    <group>
      <Room2Walls />

      {/* ── Counter + appliances ── */}
      <Counter position={[CX - 1.5, 0, CZ - HD + 0.6]} />
      <Fridge position={[CX + HW - 0.8, 0, CZ - HD + 0.6]} rotationY={Math.PI} />
      <Oven position={[CX + 2.5, 0, CZ - HD + 0.6]} rotationY={Math.PI} />
      <CabinetWall position={[CX - 1.5, 2.3, CZ - HD + 0.3]} width={4} />
      <CabinetWall position={[CX + 3, 2.3, CZ - HD + 0.3]} width={2} />
      <Microwave position={[CX - 3, 1.0, CZ - HD + 0.6]} />
      <FruitBowl position={[CX + 0.5, 0.98, CZ - HD + 0.6]} />

      {/* ── Dining area ── */}
      <RoundTable position={[CX, 0, CZ + 2]} />
      <Chair position={[CX + 1.2, 0, CZ + 2]} rotationY={-Math.PI / 2} />
      <Chair position={[CX - 1.2, 0, CZ + 2]} rotationY={Math.PI / 2} />
      <Chair position={[CX, 0, CZ + 3.2]} rotationY={Math.PI} />
      <Chair position={[CX, 0, CZ + 0.8]} rotationY={0} />

      {/* ── Bar stools ── */}
      <Stool position={[CX - 2, 0, CZ - HD + 2]} />
      <Stool position={[CX - 0.5, 0, CZ - HD + 2]} />
      <Stool position={[CX + 1, 0, CZ - HD + 2]} />

      {/* ── Wine rack ── */}
      <WineRack position={[CX + HW - 0.5, 0, CZ - 2]} rotationY={-Math.PI / 2} />

      {/* ── Storage shelf on east wall ── */}
      <Shelf position={[CX + HW - 0.5, 0, CZ + 3]} />

      {/* ── Trash can ── */}
      <TrashCan position={[CX + HW - 0.5, 0, CZ + HD - 1]} />
      <TrashCan position={[CX - HW + 0.5, 0, CZ - 2]} />

      {/* ── Boxes ── */}
      <CardboardBox position={[CX - HW + 1, 0, CZ - 2]} rotationY={0.2} />
      <CardboardBox position={[CX - HW + 0.8, 0, CZ + 4]} rotationY={-0.3} />
      <CardboardBox position={[CX + 5, 0, CZ + 5.5]} rotationY={0.5} />

      {/* ── Plants ── */}
      <Plant position={[CX + HW - 0.8, 0, CZ + HD - 0.8]} />
      <Plant position={[CX - HW + 0.8, 0, CZ + HD - 0.8]} />
      <Plant position={[CX - HW + 0.8, 0, CZ - HD + 0.8]} />

      {/* ── Floor cushion ── */}
      <FloorCushion position={[CX - 5, 0, CZ + 4]} rotationY={0.3} color="#f59e0b" trim="#d97706" />

      {/* ── Book stacks on counter ── */}
      <BookStack position={[CX + 1.5, 0.98, CZ - HD + 0.6]} />

      {/* ── Pot rack hanging from ceiling ── */}
      <PotRack position={[CX, 2.7, CZ + 1]} />
      <PotRack position={[CX - 4, 2.7, CZ - 2]} />

      {/* ── Brooms in corners ── */}
      <Broom position={[CX + HW - 0.6, 0, CZ + HD - 0.6]} rotationY={-0.6} />
      <Broom position={[CX - HW + 0.6, 0, CZ - HD + 0.6]} rotationY={0.6} />

      {/* ── Herb planter near window ── */}
      <PlanterBox position={[CX + HW - 0.4, 1.0, CZ - HD + 0.6]} rotationY={0} />

      {/* ── Ceiling lights ── */}
      <CeilingLight position={[CX, 0, CZ + 2]} />
      <CeilingLight position={[CX - 1, 0, CZ - HD + 1.5]} color="#fff0d0" intensity={3} />

      {/* ── Wall clock + window ── */}
      <WallClock position={[CX - 3, 2.6, CZ - HD + 0.12]} />
      <WindowFrame position={[CX + HW - 0.12, 1.5, CZ + 3.5]} rotationY={-Math.PI / 2} />

      {/* ── Lighting ── */}
      <pointLight position={[CX, 3.5, CZ]} intensity={4} distance={12} decay={2} color="#fef3c7" />
      <pointLight position={[CX - 3, 3.5, CZ - 3]} intensity={3} distance={8} decay={2} color="#fef3c7" />
      <pointLight position={[CX + 4, 3.5, CZ + 3]} intensity={2} distance={8} decay={2} color="#fef3c7" />
    </group>
  );
}
