'use client';

interface Props {
  shotAnim: boolean;
  showHitMarker: boolean;
}

export function HUDCrosshair({ shotAnim, showHitMarker }: Props): React.JSX.Element {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="relative transition-transform duration-100"
        style={{ transform: shotAnim ? 'scale(1.5)' : 'scale(1)' }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: showHitMarker ? '#fbbf24' : 'rgba(255,255,255,0.9)' }}
        />
        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/70" style={{ marginTop: '4px' }} />
        <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/70" style={{ marginBottom: '-12px' }} />
        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/70" style={{ marginLeft: '-8px' }} />
        <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/70" style={{ marginRight: '-8px' }} />
        {showHitMarker && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping">
            <span className="text-lg font-bold text-yellow-400">✕</span>
          </div>
        )}
      </div>
    </div>
  );
}
