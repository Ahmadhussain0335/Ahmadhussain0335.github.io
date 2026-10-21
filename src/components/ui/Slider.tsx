"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, PlayIcon } from "lucide-react";

type SliderProps = {
  /** Accessible name of the carousel, e.g. "Featured projects". */
  label: string;
  /** Short name per slide, used for dot buttons and slide labels. */
  slideLabels: string[];
  children: ReactNode;
  /** "feature": centred slides with neighbours peeking; "compact": several slides aligned left. */
  variant?: "feature" | "compact";
  /** Autoplay interval in ms; 0 disables autoplay. */
  autoplay?: number;
};

const DRAG_THRESHOLD = 6;

/**
 * Scroll-snap carousel. Slides are plain server-rendered HTML in a horizontal
 * scroller, so content stays crawlable and swipeable without JS; this component
 * adds buttons, dots, mouse drag, keyboard support and pausable autoplay.
 */
export function Slider({ label, slideLabels, children, variant = "feature", autoplay = 0 }: SliderProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [playing, setPlaying] = useState(autoplay > 0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  const slideElements = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? []),
    [],
  );

  const targetLeft = useCallback(
    (el: HTMLElement) => {
      const track = trackRef.current!;
      return variant === "feature" ? el.offsetLeft - (track.clientWidth - el.clientWidth) / 2 : el.offsetLeft;
    },
    [variant],
  );

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const el = slideElements()[(index + count) % count];
      if (!track || !el) return;
      track.scrollTo({ left: targetLeft(el), behavior: reduceMotion ? "auto" : "smooth" });
    },
    [count, reduceMotion, slideElements, targetLeft],
  );

  // Track which slide is current from the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = slideElements();
      let best = 0;
      let bestDistance = Infinity;
      els.forEach((el, i) => {
        const distance = Math.abs(targetLeft(el) - track.scrollLeft);
        if (distance < bestDistance) {
          best = i;
          bestDistance = distance;
        }
      });
      setActive(best);
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [slideElements, targetLeft]);

  // Environment signals that pause autoplay.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReduceMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    syncMotion();
    media.addEventListener("change", syncMotion);

    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  const running = autoplay > 0 && playing && !hovered && !focused && inView && pageVisible;

  // Restart the timer whenever the slide changes, so manual navigation gets a full interval.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => goTo(active + 1), autoplay);
    return () => window.clearTimeout(id);
  }, [running, active, autoplay, goTo]);

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  }

  // Mouse drag-to-scroll; touch and trackpads use native scrolling.
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current!;
    drag.current = { active: true, moved: false, startX: event.clientX, startScroll: track.scrollLeft };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state.active) return;
    const dx = event.clientX - state.startX;
    const track = trackRef.current!;
    if (!state.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      state.moved = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    }
    if (state.moved) track.scrollLeft = state.startScroll - dx;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    const track = trackRef.current!;
    if (!state.moved) return;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    const dx = event.clientX - state.startX;
    // A deliberate flick moves one slide in that direction; otherwise snap to the nearest.
    goTo(Math.abs(dx) > 60 ? active + (dx < 0 ? 1 : -1) : active);
  }

  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    // Swallow the click that ends a drag so links inside slides are not followed.
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }

  const isFeature = variant === "feature";
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Pause for keyboard focus only; a mouse click on a control should not stop the show.
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      className="relative"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {isFeature ? (
            <p className="font-mono text-sm tabular-nums text-subtle" aria-hidden="true">
              <span className="font-semibold text-foreground">{pad(active + 1)}</span> / {pad(count)}
            </p>
          ) : null}
          {autoplay > 0 ? (
            <span aria-hidden="true" className="relative hidden h-0.5 w-24 overflow-hidden rounded-full bg-border sm:block">
              <span
                key={active}
                className="slider-progress absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent"
                style={{ animationDuration: `${autoplay}ms`, animationPlayState: running ? "running" : "paused" }}
              />
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {autoplay > 0 && !reduceMotion ? (
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause automatic slide show" : "Play automatic slide show"}
              className="grid size-11 place-items-center rounded-full border border-border bg-card text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-strong hover:text-accent"
            >
              {playing ? <PauseIcon aria-hidden="true" className="size-4" /> : <PlayIcon aria-hidden="true" className="size-4" />}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={!isFeature && atStart}
            aria-label="Previous slide"
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-[color,border-color,transform,opacity] duration-200 hover:-translate-x-0.5 hover:border-strong hover:text-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(isFeature || !atEnd ? active + 1 : 0)}
            disabled={!isFeature && atEnd}
            aria-label="Next slide"
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-[color,border-color,transform,opacity] duration-200 hover:translate-x-0.5 hover:border-strong hover:text-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-live={running ? "off" : "polite"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`slider-track relative -my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain py-4 focus-visible:outline-offset-4 ${
          isFeature
            ? "slider-fade [--slide:88%] sm:[--slide:72%] lg:[--slide:58%]"
            : "[--slide:85%] sm:[--slide:calc(50%-12px)] lg:[--slide:calc(33.333%-16px)]"
        }`}
      >
        {isFeature ? <div aria-hidden="true" className="slider-spacer shrink-0" /> : null}
        {slides.map((slide, i) => (
          <div
            key={i}
            data-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${slideLabels[i] ?? ""}`}
            className={`flex shrink-0 basis-[var(--slide)] ${isFeature ? "slider-focus snap-center" : "snap-start"}`}
          >
            <div className="w-full">{slide}</div>
          </div>
        ))}
        {isFeature ? <div aria-hidden="true" className="slider-spacer shrink-0" /> : null}
      </div>

      {isFeature ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1" role="group" aria-label={`${label}: choose a slide`}>
          {slideLabels.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${name}`}
              aria-current={i === active ? "true" : undefined}
              className="group grid h-11 min-w-6 place-items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? "w-7 bg-accent" : "w-1.5 bg-strong group-hover:bg-stronger"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
