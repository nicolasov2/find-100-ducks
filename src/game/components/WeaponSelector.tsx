'use client';

import { useSettingsStore } from '@/store/settingsStore';
import { WEAPONS, WEAPON_ORDER } from '@/game/weapons/registry';
import type { WeaponId } from '@/game/weapons/types';

export interface WeaponSelectorProps {
  onClose: () => void;
}

export function WeaponSelector({ onClose }: WeaponSelectorProps): React.JSX.Element {
  const totalExp = useSettingsStore((s) => s.totalExp);
  const unlockedWeapons = useSettingsStore((s) => s.unlockedWeapons);
  const selectedWeapon = useSettingsStore((s) => s.selectedWeapon);
  const setSelectedWeapon = useSettingsStore((s) => s.setSelectedWeapon);
  const unlockWeapon = useSettingsStore((s) => s.unlockWeapon);

  const handleSelect = (id: WeaponId): void => {
    if (!unlockedWeapons.includes(id)) {
      // Auto-unlock if EXP threshold met
      const weapon = WEAPONS[id];
      if (totalExp >= weapon.expRequired) {
        unlockWeapon(id);
      } else {
        return;
      }
    }
    setSelectedWeapon(id);
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Arsenal</h2>
          <p className="font-mono text-sm text-amber-300">⭐ {totalExp} EXP</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WEAPON_ORDER.map((id) => {
            const w = WEAPONS[id];
            const unlocked = unlockedWeapons.includes(id) || totalExp >= w.expRequired;
            const equipped = selectedWeapon === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelect(id)}
                disabled={!unlocked}
                className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition ${
                  equipped
                    ? 'border-amber-400 bg-amber-400/10'
                    : unlocked
                      ? 'border-white/15 bg-white/5 hover:bg-white/10'
                      : 'border-white/5 bg-black/30 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">
                    {w.icon} {w.displayName}
                  </span>
                  {equipped && <span className="text-xs text-amber-300">Equipada</span>}
                  {!unlocked && <span className="text-xs text-zinc-500">🔒 {w.expRequired} EXP</span>}
                </div>
                <p className="text-sm text-zinc-400">{w.description}</p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-zinc-500">
                  <span>📏 {w.range}m</span>
                  <span>⏱ {w.fireRateMs}ms</span>
                  {w.hasScope && <span>🔭 zoom</span>}
                  {w.multiShot > 1 && <span>✨ x{w.multiShot}</span>}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 self-center rounded-full bg-white/10 px-6 py-2 text-sm hover:bg-white/20"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
