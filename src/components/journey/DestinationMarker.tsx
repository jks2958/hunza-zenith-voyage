import type { Destination } from "@/data/journey";
import { DestinationIcon } from "./icons";

export function DestinationMarker({
  destination,
  left,
  top,
  active,
  onSelect,
}: {
  destination: Destination;
  left: number;
  top: number;
  active: boolean;
  onSelect: () => void;
}) {
  const featured = destination.featured;

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ left, top }}
      className="group absolute z-20 -translate-x-1/2 -translate-y-full cursor-pointer focus:outline-none"
      aria-label={`${destination.name}, ${destination.category}`}
    >
      <div
        className={[
          "glass-panel flex items-center gap-2 rounded-xl transition-all duration-300",
          featured ? "px-3.5 py-2.5" : "px-3 py-2",
          active
            ? "scale-110 bg-primary/25 ring-1 ring-primary/70 shadow-[var(--shadow-glow)]"
            : "group-hover:scale-105 group-hover:bg-white/10",
        ].join(" ")}
      >
        <span
          className={[
            "flex items-center justify-center rounded-lg transition-colors",
            featured ? "h-7 w-7 bg-[var(--gradient-warm)]" : "h-6 w-6 bg-white/10",
            active && !featured ? "bg-primary" : "",
          ].join(" ")}
        >
          <DestinationIcon
            icon={destination.icon}
            className={featured ? "h-4 w-4 text-[oklch(0.18_0.05_60)]" : "h-3.5 w-3.5 text-foreground"}
          />
        </span>
        <span
          className={[
            "whitespace-nowrap font-medium text-foreground",
            featured ? "text-[15px]" : "text-[12.5px]",
          ].join(" ")}
        >
          {destination.name}
        </span>
      </div>

      {/* stem + ground light */}
      <span className="mx-auto block h-3.5 w-px bg-gradient-to-b from-white/45 to-transparent" />
      <span
        className={[
          "mx-auto block h-1.5 w-1.5 rounded-full transition-all duration-300",
          active
            ? "bg-primary shadow-[0_0_14px_4px_oklch(0.65_0.19_255/0.85)]"
            : featured
              ? "bg-[oklch(0.85_0.15_75)] shadow-[0_0_14px_4px_oklch(0.8_0.15_75/0.6)]"
              : "bg-[oklch(0.85_0.12_75)] shadow-[0_0_10px_2px_oklch(0.8_0.15_75/0.45)]",
        ].join(" ")}
      />
    </button>
  );
}
