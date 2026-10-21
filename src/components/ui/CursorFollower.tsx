"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], summary, select';
const MAGNET_STRENGTH = 0.28;
const MAGNET_MAX = 12;

/**
 * Decorative cursor: a dot on the pointer and a ring that eases after it.
 * The native cursor stays visible. Only for mouse users without reduced motion.
 *
 * - Hovering links/buttons grows the ring; elements with `data-cursor-label`
 *   turn it into a labelled badge (e.g. "View" on project cards).
 * - Elements with `data-magnetic` lean towards the pointer.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let visible = false;
    let magnet: HTMLElement | null = null;

    const follow = () => {
      ringX += (x - ringX) * 0.2;
      ringY += (y - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      // Stop the loop once the ring has caught up, so an idle page does no work.
      frame = Math.abs(x - ringX) + Math.abs(y - ringY) > 0.2 ? requestAnimationFrame(follow) : 0;
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      magnet.style.setProperty("--mag-x", "0px");
      magnet.style.setProperty("--mag-y", "0px");
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        visible = true;
        ringX = x;
        ringY = y;
        root.classList.add("cursor-visible");
      }
      if (!frame) frame = requestAnimationFrame(follow);

      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]") ?? null;
      const interactive = target?.closest(INTERACTIVE) ?? null;
      root.classList.toggle("cursor-label", labelled !== null);
      root.classList.toggle("cursor-hover", labelled === null && interactive !== null);
      label.textContent = labelled?.dataset.cursorLabel ?? "";

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) releaseMagnet();
      if (nextMagnet) {
        magnet = nextMagnet;
        const rect = nextMagnet.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v));
        nextMagnet.style.setProperty("--mag-x", `${clamp((x - (rect.left + rect.width / 2)) * MAGNET_STRENGTH)}px`);
        nextMagnet.style.setProperty("--mag-y", `${clamp((y - (rect.top + rect.height / 2)) * MAGNET_STRENGTH)}px`);
      }
    };

    const onLeaveWindow = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      visible = false;
      root.classList.remove("cursor-visible", "cursor-hover", "cursor-label");
      releaseMagnet();
    };
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onLeaveWindow);
      cancelAnimationFrame(frame);
      releaseMagnet();
      root.classList.remove("cursor-visible", "cursor-hover", "cursor-label", "cursor-down");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring">
        <span ref={labelRef} />
      </div>
    </>
  );
}
