import {
  Castle,
  Home,
  Waves,
  Mountain,
  Cable,
  MountainSnow,
  type LucideIcon,
} from "lucide-react";
import type { Destination } from "@/data/journey";

const map: Record<Destination["icon"], LucideIcon> = {
  fort: Castle,
  village: Home,
  lake: Waves,
  peak: Mountain,
  bridge: Cable,
  pass: MountainSnow,
};

export function DestinationIcon({
  icon,
  className,
}: {
  icon: Destination["icon"];
  className?: string;
}) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden />;
}
