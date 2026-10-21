"use client";

import { useEffect } from "react";

/**
 * Browsers with scroll-driven animations reveal `.reveal` elements in pure CSS.
 * Others (e.g. Firefox) get an IntersectionObserver fallback. Elements already
 * on screen are never hidden, so nothing flashes.
 */
export function RevealController() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of document.querySelectorAll<HTMLElement>(".reveal")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.classList.add("reveal-pending");
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
