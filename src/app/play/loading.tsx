export default function PlayLoading(): React.JSX.Element {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-zinc-950">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-purple-950/60 to-zinc-950" />

      {/* Floating hearts */}
      {['2s', '4s', '6s', '8s', '10s'].map((delay, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-bounce text-2xl opacity-20"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 2) * 40}%`,
            animationDelay: delay,
            animationDuration: '3s',
          }}
        >
          💕
        </span>
      ))}

      {/* Main content */}
      <div className="z-10 flex flex-col items-center gap-6 px-8 text-center">
        <div className="animate-bounce text-6xl">🧙</div>

        <div className="flex flex-col gap-2">
          <h1 className="bg-gradient-to-br from-rose-300 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            HECHO CON AMOR
          </h1>
          <p className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            PARA MI POTI 💕
          </p>
        </div>

        <div className="mt-2 flex items-center gap-3 text-zinc-400">
          <div className="h-1 w-8 animate-pulse rounded-full bg-rose-500/60" />
          <span className="text-sm">Cargando el mundo...</span>
          <div className="h-1 w-8 animate-pulse rounded-full bg-rose-500/60" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </main>
  );
}
