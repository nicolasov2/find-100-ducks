'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

let introShown = false;

export function LoveNote(): React.JSX.Element {
  const status = useGameStore((s) => s.status);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (status !== 'playing' || introShown) return;
    introShown = true;
    setVisible(true);

    const t1 = setTimeout(() => setOpacity(1), 80);
    const t2 = setTimeout(() => setOpacity(0), 2800);
    const t3 = setTimeout(() => setVisible(false), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [status]);

  if (status !== 'playing') return <></>;

  return (
    <>
      {/* Intro overlay — aparece 3s al iniciar */}
      {visible && (
        <div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{ transition: 'opacity 0.7s ease', opacity }}
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-black/60 px-10 py-6 text-center backdrop-blur-sm">
            <span className="text-4xl">💕</span>
            <p className="bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-xl font-bold text-transparent tracking-wide">
              HECHO CON AMOR
            </p>
            <p className="bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-lg font-semibold text-transparent">
              PARA MI POTI
            </p>
          </div>
        </div>
      )}

      {/* Watermark permanente — siempre visible durante la partida */}
      <div className="pointer-events-none absolute bottom-3 right-4 z-10 select-none text-right opacity-25">
        <p className="font-mono text-[10px] text-rose-300 tracking-widest">
          💕 hecho con amor para mi poti
        </p>
      </div>
    </>
  );
}
