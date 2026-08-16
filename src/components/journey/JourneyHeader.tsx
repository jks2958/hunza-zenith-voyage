import { Map } from "lucide-react";

export function JourneyHeader() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-4 sm:p-6">
      <div className="pointer-events-auto animate-fade-in">
        <div className="flex items-center gap-2.5">
          <h1 className="font-display text-xl font-semibold tracking-tight text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-2xl">
            NorthVerse 3D Journey
          </h1>
          <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]">
            3D
          </span>
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Explore Hunza Valley like never before
        </p>
      </div>

      <button
        type="button"
        className="pointer-events-auto glass-panel flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-foreground transition hover:bg-white/10"
      >
        <Map className="h-4 w-4 text-muted-foreground" aria-hidden />
        <span className="hidden sm:inline">Map View</span>
      </button>
    </div>
  );
}
