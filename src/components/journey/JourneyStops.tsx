import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Destination } from "@/data/journey";

function JourneyStop({
  destination,
  active,
  onSelect,
}: {
  destination: Destination;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "relative flex w-full items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left transition-all duration-300",
        active
          ? "border-primary/60 bg-primary shadow-[var(--shadow-glow)]"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.09]",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
          active
            ? "bg-white/20 text-primary-foreground"
            : "border border-white/15 bg-black/30 text-foreground/85",
        ].join(" ")}
      >
        {destination.index}
      </span>
      <span className="min-w-0">
        <span
          className={[
            "block truncate text-[13px] font-medium",
            active ? "text-primary-foreground" : "text-foreground",
          ].join(" ")}
        >
          {destination.name}
        </span>
        <span
          className={[
            "block truncate text-[11px]",
            active ? "text-primary-foreground/75" : "text-muted-foreground",
          ].join(" ")}
        >
          {destination.category}
        </span>
      </span>
    </button>
  );
}

export function JourneyStops({
  destinations,
  activeId,
  onSelect,
}: {
  destinations: Destination[];
  activeId: string | null;
  onSelect: (d: Destination) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute left-4 top-20 z-30 w-[170px] sm:left-6 sm:top-24 sm:w-[200px]">
      <div className="glass-panel animate-fade-in overflow-hidden rounded-2xl">
        <div className="px-3.5 pb-2 pt-3">
          <div className="font-display text-[14px] font-semibold text-foreground">Journey Stops</div>
          <div className="text-[11px] text-muted-foreground">{destinations.length} Places</div>
        </div>

        <div
          className={[
            "relative px-2.5 pb-1.5 transition-[max-height,opacity] duration-500",
            open ? "max-h-[62vh] overflow-y-auto opacity-100" : "max-h-[168px] overflow-hidden opacity-100",
            "sm:max-h-[58vh] sm:overflow-y-auto",
          ].join(" ")}
        >
          {/* vertical connecting line */}
          <span className="pointer-events-none absolute bottom-4 left-[24px] top-3 w-px bg-white/12" />
          <div className="relative flex flex-col gap-1.5">
            {destinations.map((d) => (
              <JourneyStop
                key={d.id}
                destination={d}
                active={activeId === d.id}
                onSelect={() => onSelect(d)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 py-2 text-[11px] text-muted-foreground transition hover:text-foreground sm:hidden"
        >
          {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {open ? "Collapse" : "All 7 stops"}
        </button>
      </div>
    </div>
  );
}
