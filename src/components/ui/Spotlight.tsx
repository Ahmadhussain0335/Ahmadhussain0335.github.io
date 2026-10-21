"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  /** Gentle 3D tilt towards the pointer (mouse only; disabled for reduced motion in CSS). */
  tilt?: boolean;
};

const MAX_TILT_DEG = 4;

/**
 * Card surface with a cursor-following highlight (`.spotlight` in globals.css).
 * The highlight paints above the card background and below its content.
 */
export function Spotlight({ children, className = "", as: Tag = "div", tilt = false }: SpotlightProps) {
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt && event.pointerType === "mouse") {
      el.style.setProperty("--rx", `${((py / rect.height) - 0.5) * -2 * MAX_TILT_DEG}deg`);
      el.style.setProperty("--ry", `${((px / rect.width) - 0.5) * 2 * MAX_TILT_DEG}deg`);
    }
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (!tilt) return;
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-tilt={tilt ? "" : undefined}
      className={`spotlight relative ${className}`}
    >
      {children}
    </Tag>
  );
}
