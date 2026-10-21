"use client";

import { useEffect, useState } from "react";

type WordRotatorProps = {
  words: readonly string[];
  interval?: number;
};

export function WordRotator({ words, interval = 2600 }: WordRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid align-bottom">
      {/* Reserve the width of the longest word to avoid layout shift. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      <span
        key={words[index]}
        aria-hidden="true"
        className={`col-start-1 row-start-1 whitespace-nowrap text-accent ${index > 0 ? "animate-word-in" : ""}`}
      >
        {words[index]}
      </span>
    </span>
  );
}
