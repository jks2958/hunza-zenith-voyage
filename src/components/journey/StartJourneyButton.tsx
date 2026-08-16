import { Play } from "lucide-react";

export function StartJourneyButton({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center pb-14 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_25%,oklch(0.09_0.03_255/0.75)_100%)]" />
      <button
        type="button"
        onClick={onStart}
        className="animate-fade-in relative flex items-center gap-3 rounded-2xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-glow),0_18px_50px_-12px_oklch(0.09_0.03_255/0.9)] ring-1 ring-white/20 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.99]"
      >
        <span className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-primary/45 blur-2xl" />
        <Play className="h-4 w-4 fill-current" />
        Start Journey
      </button>
    </div>
  );
}
