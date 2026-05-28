import { Room1Walls } from './Room1Walls';
import { Table } from './furniture/Table';
import { Chair } from './furniture/Chair';
import { Sofa } from './furniture/Sofa';
import { Shelf } from './furniture/Shelf';
import { Lamp } from './furniture/Lamp';
import { Bed } from './furniture/Bed';
import { CardboardBox } from './furniture/CardboardBox';
import { BookStack } from './furniture/BookStack';
import { Plant } from './furniture/Plant';
import { FloorCushion } from './furniture/FloorCushion';
import { TVStand } from './furniture/TVStand';
import { CoatRack } from './furniture/CoatRack';
import { WallPainting } from './furniture/WallPainting';
import { SideTable } from './furniture/SideTable';
import { PlanterBox } from './furniture/PlanterBox';
import { Pouf } from './furniture/Pouf';
import { CeilingLight } from './furniture/CeilingLight';
import { WindowFrame } from './furniture/WindowFrame';
import { Rug } from '@/game/rooms/room3/furniture/Rug';

export function Room1(): React.JSX.Element {
  return (
    <group>
      <Room1Walls />

      {/* ── Rugs ── */}
      <Rug position={[0, 0, 0]} width={4.5} depth={3.5} />
      <Rug position={[-4.5, 0, 7]} width={5} depth={3.5} />
      <Rug position={[6, 0, -7]} width={3.5} depth={2.5} />

      {/* ── Ceiling lights ── */}
      <CeilingLight position={[0, 0, 0]} />
      <CeilingLight position={[-4, 0, 6.5]} intensity={3} color="#fff3cd" />
      <CeilingLight position={[6, 0, -7]} intensity={3} color="#fff3cd" />

      {/* ── Windows (north wall + west wall) ── */}
      <WindowFrame position={[-3.5, 1.5, -9.82]} />
      <WindowFrame position={[4.5, 1.5, -9.82]} />
      <WindowFrame position={[-9.82, 1.5, -4]} rotationY={Math.PI / 2} />
      <WindowFrame position={[-9.82, 1.5, 4]} rotationY={Math.PI / 2} />

      {/* ── Dining area ── */}
      <Table />
      <Chair position={[0, 0, -2]} rotationY={0} />
      <Chair position={[0, 0, 2]} rotationY={Math.PI} />
      <Chair position={[2.5, 0, 0]} rotationY={-Math.PI / 2} />
      <Chair position={[-2.5, 0, 0]} rotationY={Math.PI / 2} />

      {/* ── Living area ── */}
      <Sofa position={[-4, 0, 7]} />
      <TVStand position={[-4, 0, 4.5]} rotationY={Math.PI} />
      <SideTable position={[-7, 0, 7]} />
      <SideTable position={[-1, 0, 7.5]} />

      {/* ── Bedroom area ── */}
      <Bed position={[6, 0, -7]} />
      <SideTable position={[8.5, 0, -8.5]} />

      {/* ── Lamps ── */}
      <Lamp position={[8, 0, 8]} />
      <Lamp position={[-9, 0, 3]} />

      {/* ── Shelves ── */}
      <Shelf position={[-6, 0, -9.5]} />
      <Shelf position={[4, 0, -9.5]} />
      <Shelf position={[-9.5, 0, -4]} />

      {/* ── Boxes ── */}
      <CardboardBox position={[-8, 0, 5.5]} rotationY={0.3} />
      <CardboardBox position={[8.5, 0, -5.5]} rotationY={-0.4} />
      <CardboardBox position={[-2, 0, -8.5]} rotationY={0.15} />
      <CardboardBox position={[7, 0, 3]} rotationY={0.8} />
      <CardboardBox position={[-8.5, 0, -6]} rotationY={-0.2} />

      {/* ── Book stacks ── */}
      <BookStack position={[1.6, 0.9, -0.6]} />
      <BookStack position={[-1.7, 0.9, 0.6]} />
      <BookStack position={[-6, 1.55, -9.5]} />
      <BookStack position={[4, 2.55, -9.5]} />
      <BookStack position={[-7, 0.55, 7]} />
      <BookStack position={[8.5, 0.55, -8.5]} />

      {/* ── Plants ── */}
      <Plant position={[-9, 0, -9]} />
      <Plant position={[-8.5, 0, 8.8]} />
      <Plant position={[8.6, 0, -2]} />
      <Plant position={[3, 0, 9]} />
      <Plant position={[-4, 0, -6]} />

      {/* ── Cushions ── */}
      <FloorCushion position={[2, 0, 5]} rotationY={0.2} />
      <FloorCushion position={[-3, 0, 4]} rotationY={-0.4} color="#06b6d4" trim="#0e7490" />
      <FloorCushion position={[5, 0, 5.5]} rotationY={0.6} color="#ef4444" trim="#991b1b" />
      <FloorCushion position={[-6, 0, 5]} rotationY={0.1} color="#a855f7" trim="#7e22ce" />

      {/* ── Coat rack ── */}
      <CoatRack position={[9, 0, -9]} />
      <CoatRack position={[-9.5, 0, 0]} />

      {/* ── Wall paintings ── */}
      <WallPainting position={[-3, 2.2, -9.85]} colorIndex={0} width={1.0} height={0.7} />
      <WallPainting position={[7, 2.5, -9.85]} colorIndex={1} width={0.6} height={0.8} />
      <WallPainting position={[-9.85, 2.0, 5]} rotationY={Math.PI / 2} colorIndex={2} />
      <WallPainting position={[-9.85, 2.8, -5]} rotationY={Math.PI / 2} colorIndex={3} width={1.2} height={0.5} />
      <WallPainting position={[5, 2.3, 9.85]} rotationY={Math.PI} colorIndex={4} />

      {/* ── Planters ── */}
      <PlanterBox position={[-9, 0, 0]} rotationY={Math.PI / 2} />
      <PlanterBox position={[9, 0, 6]} rotationY={Math.PI / 2} />
      <PlanterBox position={[-3, 0, 9]} rotationY={0} />

      {/* ── Poufs ── */}
      <Pouf position={[1, 0, 6]} color="#7c3aed" />
      <Pouf position={[3, 0, 7]} color="#06b6d4" />
      <Pouf position={[-7, 0, -2]} color="#dc2626" />
    </group>
  );
}
