import { ArrowUpRight, MapPin, Mountain, Star, X } from "lucide-react";
import type { Destination } from "@/data/journey";
import { DestinationIcon } from "./icons";

export function DestinationDetails({
  destination,
  onClose,
}: {
  destination: Destination;
  onClose: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:justify-end sm:p-6">
      <div
        key={destination.id}
        className="glass-panel pointer-events-auto w-full max-w-[420px] animate-scale-in overflow-hidden rounded-2xl"
      >
        <div className="relative h-32 sm:h-40">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
            loading="lazy"
            width={768}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.03_255)] via-transparent to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-foreground/80 backdrop-blur transition hover:bg-black/70 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <DestinationIcon icon={destination.icon} className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <div>
              <div className="font-display text-[17px] font-semibold leading-tight text-foreground">
                {destination.name}
              </div>
              <div className="text-[11px] text-muted-foreground">
                Stop {destination.index} · {destination.category}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-3.5">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-foreground/85">
              <MapPin className="h-3 w-3 text-primary" /> {destination.location}
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-foreground/85">
              <Mountain className="h-3 w-3 text-primary" /> {destination.elevation}
            </span>
            <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 text-foreground/85">
              <Star className="h-3 w-3 fill-[oklch(0.85_0.15_75)] text-[oklch(0.85_0.15_75)]" />
              {destination.rating.toFixed(1)}
            </span>
          </div>

          <ul className="space-y-1.5">
            {destination.facts.map((fact) => (
              <li key={fact} className="flex gap-2 text-[12px] text-muted-foreground">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                {fact}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
          >
            View Destination
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
