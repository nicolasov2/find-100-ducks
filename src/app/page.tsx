import Link from 'next/link';

export default function Home(): React.JSX.Element {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-zinc-950 px-6 text-zinc-50">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">
          Find 100 Ducks
        </h1>
        <p className="max-w-md text-sm text-zinc-400">
          Encuentra los 100 patitos escondidos. El reloj corre desde que entras
          a la sala.
        </p>
      </div>
      <Link
        href="/play"
        className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-medium text-zinc-950 transition hover:bg-yellow-300"
      >
        Jugar
      </Link>
    </main>
  );
}
