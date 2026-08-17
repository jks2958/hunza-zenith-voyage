import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { destinations, mountainLabels, warmLights, type Destination } from "@/data/journey";
import { useWorldView } from "@/components/journey/useWorldView";
import { JourneyWorld } from "@/components/journey/JourneyWorld";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { JourneyStops } from "@/components/journey/JourneyStops";
import { DestinationMarker } from "@/components/journey/DestinationMarker";
import { JourneyRoute } from "@/components/journey/JourneyRoute";
import { MountainLabel } from "@/components/journey/MountainLabel";
import { MapControls } from "@/components/journey/MapControls";
import { DestinationDetails } from "@/components/journey/DestinationDetails";
import { StartJourneyButton } from "@/components/journey/StartJourneyButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NorthVerse 3D Journey — Explore Hunza Valley" },
      {
        name: "description",
        content:
          "An immersive, cinematic 3D map of Hunza Valley. Zoom, pan and explore seven Karakoram destinations from Baltit Fort to Khunjerab Pass.",
      },
      { property: "og:title", content: "NorthVerse 3D Journey — Explore Hunza Valley" },
      {
        property: "og:description",
        content:
          "Enter a cinematic 3D journey through Hunza Valley: Baltit Fort, Attabad Lake, Passu Cones and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journey,
});

function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const world = useWorldView(containerRef);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState<Destination | null>(null);

  const select = useCallback(
    (d: Destination) => {
      setActive(d);
      const mobile = world.size.w < 640;
      world.focus(d.x, d.y, mobile ? 1.6 : 1.95, mobile ? -140 : -40);
    },
    [world],
  );

  const routePoints = destinations.map((d) => world.project(d.x, d.y));

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 touch-none overflow-hidden bg-background"
      style={{ cursor: started ? "grab" : "default" }}
      {...(started ? world.bind : {})}
    >
      <JourneyWorld view={world.view} base={world.base} animate={world.animate}>
        {warmLights.map((l, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.88_0.14_78)] opacity-70 blur-[2px]"
            style={{
              left: `${l.x * 100}%`,
              top: `${l.y * 100}%`,
              boxShadow: "0 0 12px 5px oklch(0.85 0.15 75 / 0.45)",
            }}
          />
        ))}
      </JourneyWorld>

      {/* cinematic vignette + atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(115%_85%_at_50%_35%,transparent_35%,oklch(0.09_0.03_255/0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[oklch(0.1_0.03_255/0.75)] to-transparent" />

      <JourneyRoute points={routePoints} />

      {mountainLabels.map((m) => {
        const p = world.project(m.x, m.y);
        return (
          <MountainLabel
            key={m.id}
            name={m.name}
            elevation={m.elevation}
            left={p.left}
            top={p.top}
          />
        );
      })}

      {destinations.map((d) => {
        const p = world.project(d.x, d.y);
        return (
          <DestinationMarker
            key={d.id}
            destination={d}
            left={p.left}
            top={p.top}
            active={active?.id === d.id}
            onSelect={() => {
              if (world.didDrag()) return;
              select(d);
            }}
          />
        );
      })}

      <JourneyHeader />

      {started ? (
        <>
          <JourneyStops
            destinations={destinations}
            activeId={active?.id ?? null}
            onSelect={select}
          />
          <MapControls
            onReset={() => {
              setActive(null);
              world.reset();
            }}
            onZoomIn={() => world.zoomBy(1.45)}
            onZoomOut={() => world.zoomBy(1 / 1.45)}
          />
          {active ? (
            <DestinationDetails destination={active} onClose={() => setActive(null)} />
          ) : null}
        </>
      ) : (
        <StartJourneyButton
          onStart={() => {
            setStarted(true);
            world.zoomBy(1.15);
          }}
        />
      )}
    </main>
  );
}
