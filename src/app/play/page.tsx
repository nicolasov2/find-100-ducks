import { GameCanvas } from '@/game/components/GameCanvas';

export default function PlayPage(): React.JSX.Element {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <GameCanvas />
    </main>
  );
}
