import { StartButton } from './StartButton';

export default function Home(): React.JSX.Element {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 text-zinc-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-950 to-zinc-950" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-overlay" />

      <div className="z-10 flex flex-col items-center gap-12 text-center">
        {/* Title Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center space-x-2 text-6xl">
            <span className="animate-bounce">🧙</span>
            <h1 className="font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-amber-600">
              Find 100 Gnomes
            </h1>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🧙</span>
          </div>
          <p className="max-w-lg text-lg text-zinc-400">
            Explora las habitaciones, usa tu linterna y dispara a los 100 gnomos de goma escondidos lo más rápido que puedas.
          </p>
        </div>

        {/* Start / Options */}
        <StartButton />

        {/* Controls Hint */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-zinc-300">W</kbd>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-zinc-300">A</kbd>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-zinc-300">S</kbd>
              <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-zinc-300">D</kbd>
            </div>
            <span>Moverse</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-zinc-300">Shift</kbd>
            <span>Sprint</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-6 py-1 font-mono text-zinc-300">Espacio</kbd>
            <span>Saltar</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-zinc-300">Click</kbd>
            <span>Disparar láser</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-zinc-300">H</kbd>
            <span>Pista</span>
          </div>
        </div>
      </div>
    </main>
  );
}
