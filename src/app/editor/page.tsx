import { EditorCanvas } from '@/game/components/EditorCanvas';

export default function EditorPage(): React.JSX.Element {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <EditorCanvas />
    </main>
  );
}
