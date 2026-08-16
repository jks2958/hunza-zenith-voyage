import { useCallback, useEffect, useRef, useState } from "react";

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 4.5;

export type View = { x: number; y: number; zoom: number };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Pan/zoom over a square world layer of `base` px (base = max(vw, vh)),
 * transform applied as translate(x, y) scale(zoom) with origin 0 0.
 */
export function useWorldView(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const base = Math.max(size.w, size.h) || 1;
  const [view, setView] = useState<View>({ x: 0, y: 0, zoom: 1 });
  const [animate, setAnimate] = useState(true);
  const viewRef = useRef(view);
  viewRef.current = view;
  const sizeRef = useRef(size);
  sizeRef.current = size;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  const clampView = useCallback((v: View) => {
    const { w, h } = sizeRef.current;
    const b = Math.max(w, h) || 1;
    const span = b * v.zoom;
    const x = clamp(v.x, w - span, 0);
    const y = clamp(v.y, h - span, 0);
    return { x, y, zoom: v.zoom };
  }, []);

  // center the world when the container is first measured
  const initialised = useRef(false);
  useEffect(() => {
    if (initialised.current || !size.w) return;
    initialised.current = true;
    const b = Math.max(size.w, size.h);
    setAnimate(false);
    setView({ x: (size.w - b) / 2, y: (size.h - b) / 2, zoom: 1 });
  }, [size]);

  const reset = useCallback(() => {
    const { w, h } = sizeRef.current;
    const b = Math.max(w, h);
    setAnimate(true);
    setView(clampView({ x: (w - b) / 2, y: (h - b) / 2, zoom: 1 }));
  }, [clampView]);

  const zoomAt = useCallback(
    (nextZoom: number, px: number, py: number, smooth = false) => {
      setAnimate(smooth);
      setView((v) => {
        const z = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
        const k = z / v.zoom;
        return clampView({
          x: px - (px - v.x) * k,
          y: py - (py - v.y) * k,
          zoom: z,
        });
      });
    },
    [clampView],
  );

  const zoomBy = useCallback(
    (factor: number) => {
      const { w, h } = sizeRef.current;
      zoomAt(viewRef.current.zoom * factor, w / 2, h / 2, true);
    },
    [zoomAt],
  );

  /** bring a world point (0..1) to the viewport centre */
  const focus = useCallback(
    (wx: number, wy: number, zoom = 2.2, offsetY = 0) => {
      const { w, h } = sizeRef.current;
      const b = Math.max(w, h);
      const z = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
      setAnimate(true);
      setView(
        clampView({
          x: w / 2 - wx * b * z,
          y: h / 2 + offsetY - wy * b * z,
          zoom: z,
        }),
      );
    },
    [clampView],
  );

  // wheel + pinch (non-passive)
  const handlerRef = useRef<(e: WheelEvent) => void>(() => {});
  handlerRef.current = (e: WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
    const next = viewRef.current.zoom * Math.exp(-dy * 0.0018);
    zoomAt(next, e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handlerRef.current(e);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [containerRef]);

  // pointer drag + two-finger pinch
  const dragging = useRef(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; zoom: number } | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      dragging.current = true;
      moved.current = false;
      last.current = { x: e.clientX, y: e.clientY };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        zoom: viewRef.current.zoom,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const cx = (a.x + b.x) / 2 - rect.left;
      const cy = (a.y + b.y) / 2 - rect.top;
      zoomAt(pinch.current.zoom * (dist / pinch.current.dist), cx, cy);
      moved.current = true;
      return;
    }

    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    setAnimate(false);
    setView((v) => clampView({ ...v, x: v.x + dx, y: v.y + dy }));
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) dragging.current = false;
  };

  const project = useCallback(
    (wx: number, wy: number) => ({
      left: view.x + wx * base * view.zoom,
      top: view.y + wy * base * view.zoom,
    }),
    [view, base],
  );

  return {
    view,
    base,
    size,
    animate,
    project,
    reset,
    zoomBy,
    focus,
    didDrag: () => moved.current,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel: endPointer,
      onPointerLeave: endPointer,
    },
  };
}
