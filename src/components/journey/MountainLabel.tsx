export function MountainLabel({
  name,
  elevation,
  left,
  top,
}: {
  name: string;
  elevation?: string;
  left: number;
  top: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      <div className="glass-panel rounded-lg px-2.5 py-1.5 text-center opacity-80">
        <div className="text-[11px] font-medium leading-tight text-foreground/90">{name}</div>
        {elevation ? (
          <div className="text-[10px] leading-tight text-muted-foreground">{elevation}</div>
        ) : null}
      </div>
    </div>
  );
}
