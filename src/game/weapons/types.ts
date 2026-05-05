export type WeaponId =
  | 'laser-pistol'
  | 'laser-rifle'
  | 'laser-sniper'
  | 'plasma-spreader';

export interface WeaponStats {
  readonly id: WeaponId;
  readonly displayName: string;
  readonly description: string;
  readonly icon: string;
  readonly expRequired: number;
  readonly range: number;
  readonly fireRateMs: number;
  readonly beamColor: string;
  readonly beamRadius: number;
  readonly recoilStrength: number;
  readonly hasScope: boolean;
  readonly multiShot: number;
  readonly spreadAngleRad: number;
}
