import { StartButton } from './StartButton';

const GNOMES = ['🧙', '🧙', '🧙', '🧙', '🧙'];
const HEARTS = [
  { left: '8%',  top: '15%', delay: '0s',   size: 'text-xl' },
  { left: '20%', top: '70%', delay: '1.2s', size: 'text-2xl' },
  { left: '78%', top: '20%', delay: '0.6s', size: 'text-lg' },
  { left: '88%', top: '65%', delay: '1.8s', size: 'text-xl' },
  { left: '50%', top: '82%', delay: '2.4s', size: 'text-lg' },
  { left: '35%', top: '12%', delay: '3s',   size: 'text-2xl' },
];

export default function Home(): React.JSX.Element {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 text-zinc-50">
      {/* Romantic gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-purple-950/40 to-zinc-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

      {/* Floating hearts decoration */}
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute animate-pulse ${h.size} opacity-20`}
          style={{ left: h.left, top: h.top, animationDelay: h.delay, animationDuration: '3s' }}
        >
          💕
        </span>
      ))}

      <div className="z-10 flex w-full max-w-lg flex-col items-center gap-8 text-center">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-5xl">
            <span className="animate-bounce">🧙</span>
            <h1 className="bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 bg-clip-text font-bold tracking-tighter text-transparent">
              Encuentra<br />los Gnomos
            </h1>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🧙</span>
          </div>
          <p className="mt-1 bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-lg font-semibold text-transparent">
            💕 Para mi Poti con amor
          </p>
        </div>

        {/* Start card */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <StartButton />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
          {[
            { keys: ['W','A','S','D'], label: 'Moverse' },
            { keys: ['Shift'],        label: 'Sprint' },
            { keys: ['Click'],        label: 'Disparar' },
            { keys: ['H'],            label: 'Pista' },
            { keys: ['Esc'],          label: 'Pausa' },
          ].map(({ keys, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                {keys.map((k) => (
                  <kbd key={k} className="rounded border border-zinc-700 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-zinc-300">
                    {k}
                  </kbd>
                ))}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Gnome parade */}
        <div className="flex gap-3 text-3xl">
          {GNOMES.map((g, i) => (
            <span
              key={i}
              className="animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1.2s' }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
