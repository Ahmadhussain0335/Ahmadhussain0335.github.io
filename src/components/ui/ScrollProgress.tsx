/** Reading progress bar driven by CSS `animation-timeline: scroll()`; stays hidden where unsupported. */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      style={{ transform: "scaleX(0)" }}
      className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent via-blue-500 to-sky-400"
    />
  );
}
