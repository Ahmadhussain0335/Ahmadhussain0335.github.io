"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, MaximizeIcon, XIcon } from "lucide-react";
import type { Screenshot } from "@/content/types";

type ScreenshotGalleryProps = {
  projectName: string;
  screenshots: Screenshot[];
  credit?: string;
};

/**
 * Horizontally scrolling app screens; each opens in a modal <dialog> with
 * previous/next navigation. Esc, backdrop click and the close button dismiss it.
 */
export function ScreenshotGallery({ projectName, screenshots, credit }: ScreenshotGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const count = screenshots.length;
  const landscape = screenshots[0] ? screenshots[0].width > screenshots[0].height : false;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((delta: number) => setIndex((i) => (i === null ? 0 : (i + delta + count) % count)), [count]);

  // Lock page scroll while the dialog is open.
  useEffect(() => {
    if (index === null) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [index]);

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  const current = index === null ? null : screenshots[index];

  return (
    <section aria-labelledby="screenshots-heading">
      <div className="flex items-end justify-between gap-4">
        <h2 id="screenshots-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          Screenshots
        </h2>
        {credit ? <p className="text-right text-xs text-subtle">{credit}</p> : null}
      </div>

      <ul className="slider-track -mx-1 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4">
        {screenshots.map((shot, i) => (
          <li key={shot.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-[0_24px_40px_-24px_rgba(15,23,42,0.5)]"
            >
              {/* Name = this prefix + the image alt, so the spoken label contains what is shown. */}
              <span className="sr-only">{`Enlarge screenshot ${i + 1} of ${count}: `}</span>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes={landscape ? "(min-width: 640px) 400px, 80vw" : "(min-width: 640px) 220px, 55vw"}
                className={landscape ? "h-56 w-auto sm:h-72" : "h-96 w-auto sm:h-[30rem]"}
              />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-foreground opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <MaximizeIcon aria-hidden="true" className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${projectName} screenshots`}
        onClose={() => setIndex(null)}
        onKeyDown={onDialogKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <figure className="flex max-h-[92dvh] w-[min(92vw,1100px)] flex-col items-center gap-4 p-4">
            <div className="flex w-full items-center justify-between text-sm text-white/80">
              <span className="font-mono tabular-nums">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close screenshots"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <XIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="flex w-full min-h-0 flex-1 items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-5" />
              </button>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="90vw"
                loading="eager"
                // Explicit box: the dialog has no definite height, so size from the viewport.
                style={{ height: "min(78dvh, 1100px)", width: "auto", maxWidth: "calc(100% - 7rem)" }}
                className="rounded-xl object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ArrowRightIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
            <figcaption className="max-w-2xl text-center text-sm text-white/80">{current.alt}</figcaption>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
