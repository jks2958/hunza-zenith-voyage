import type { ReactNode } from "react";
import { worldImage } from "@/data/journey";
import type { View } from "./useWorldView";

export function JourneyWorld({
  view,
  base,
  animate,
  children,
}: {
  view: View;
  base: number;
  animate: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className="absolute left-0 top-0 origin-top-left will-change-transform"
      style={{
        width: base,
        height: base,
        transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})`,
        transition: animate ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
      }}
    >
      <img
        src={worldImage}
        alt="Cinematic isometric view of Hunza Valley and the Karakoram range"
        className="h-full w-full select-none object-cover"
        draggable={false}
        width={1600}
        height={1600}
      />
      {children}
    </div>
  );
}
