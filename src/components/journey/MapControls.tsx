import { Minus, Plus, RotateCcw } from "lucide-react";

export function MapControls({
  onReset,
  onZoomIn,
  onZoomOut,
}: {
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  return (
    <div className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2.5 sm:right-6">
      <button
        type="button"
        onClick={onReset}
        aria-label="Recenter world"
        className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
      >
        <RotateCcw className="h-4 w-4" />
      </button>

      <div className="glass-panel flex flex-col overflow-hidden rounded-xl">
        <button
          type="button"
          onClick={onZoomIn}
          aria-label="Zoom in"
          className="flex h-10 w-10 items-center justify-center text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
        <div className="mx-2 h-px bg-white/10" />
        <button
          type="button"
          onClick={onZoomOut}
          aria-label="Zoom out"
          className="flex h-10 w-10 items-center justify-center text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <div
        className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl"
        aria-label="Compass, north is up"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <polygon points="12,3 15,12 12,10.5 9,12" fill="oklch(0.62 0.2 25)" />
          <polygon points="12,21 9,12 12,13.5 15,12" fill="oklch(0.85 0.01 250)" />
        </svg>
      </div>
    </div>
  );
}
