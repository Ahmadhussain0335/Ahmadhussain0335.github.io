"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 grid size-11 sm:bottom-8 sm:right-8 sm:size-12 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-[0_8px_24px_-8px_rgba(15,23,42,0.25)] transition-[opacity,transform,color,border-color] duration-300 ease-out hover:border-strong hover:text-accent ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-90 opacity-0"
      }`}
    >
      <ArrowUpIcon aria-hidden="true" className="size-5" />
    </a>
  );
}
