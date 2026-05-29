'use client';

import { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { SPAWN_POOL_VILLAGE } from '@/game/rooms/village/spawnPool';

/** 2D overlay for the spawn editor: crosshair, counter, instructions, tools, lock prompt. */
export function EditorHud(): React.JSX.Element {
  const count = useEditorStore((s) => s.markers.length);
  const message = useEditorStore((s) => s.message);
  const clearAll = useEditorStore((s) => s.clearAll);
  const fill = useEditorStore((s) => s.fill);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const update = (): void => setLocked(document.pointerLockElement !== null);
    document.addEventListener('pointerlockchange', update);
    return () => document.removeEventListener('pointerlockchange', update);
  }, []);

  const autoFill = (): void => {
    if (count > 0 && !confirm('Reemplazar los puntos actuales por una base automática distribuida?')) return;
    fill(SPAWN_POOL_VILLAGE.map((sp) => sp.position));
  };

  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white mix-blend-difference">
        +
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-black/60 p-3 text-white backdrop-blur-sm">
        <div className="font-bold">🧙 Editor de spawns · <span className="text-yellow-300">{count}</span> puntos</div>
        <div className="mt-1 text-xs text-zinc-300">
          Mantené <b>clic</b> para pintar · <kbd>R</kbd>: borrar cercano · <kbd>Z</kbd>: deshacer · <kbd>C</kbd>: copiar + descargar
        </div>
        {message && <div className="mt-1 text-xs text-emerald-300">{message}</div>}
      </div>

      {!locked && (
        <button
          type="button"
          onClick={() => (document.querySelector('canvas') as HTMLElement | null)?.requestPointerLock()}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-white"
        >
          <div className="rounded-xl border border-white/10 bg-zinc-900/90 px-6 py-4 text-center">
            <p className="font-semibold">Click para empezar a marcar</p>
            <p className="mt-1 text-sm text-zinc-400">WASD moverse · mouse mirar · <b>mantené clic para pintar</b> · Esc salir</p>
            <p className="mt-2 text-xs text-zinc-500">Tip: usá <b>✨ Auto-rellenar</b> y después ajustá. Al terminar, <kbd>C</kbd> copia los puntos.</p>
          </div>
        </button>
      )}

      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <button
          type="button"
          onClick={autoFill}
          className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-200 hover:bg-emerald-500/30"
        >
          ✨ Auto-rellenar
        </button>
        <button
          type="button"
          onClick={() => { if (confirm('¿Borrar todos los puntos marcados?')) clearAll(); }}
          className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/30"
        >
          Borrar todo
        </button>
      </div>
    </>
  );
}
